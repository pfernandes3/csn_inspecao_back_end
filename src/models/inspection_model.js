const connection = require('../database/config');
var _ = require('lodash');

const usuarioInspecaoModel = require('../models/user_inspection_model')
module.exports = {
  async findAll() {
    try {

      //var users =  await connection.raw('SELECT * FROM TB_Inspecao i INNER JOIN TB_Item_Inspecao it ON i.IDInspecao = it.IDInspecao');

      var inspections = await connection
        .raw(`SELECT i.IDInspecao,
                                           i.DataInicioInspecao AS DATA_INICIO,
                                           i.DataFimInspecao AS DATA_FIM,
                                           i.PercentualRM as PERCENTUAL_RM,
                                           i.DataRevisaoInspecao as DATA_REVISAO,
                                           i.IDGerencia as CODIGO_GERENCIA,
                                           CASE
                                              WHEN i.IsRevisado = 1 THEN 'SIM'
                                              ELSE 'NAO'
                                           END AS REVISADO,
                                           g.Descricao AS GERENCIA,
                                           a.Descricao AS AREA,
                                           u.NomeUsuario AS NOME_USUARIO,
                                           u.Matricula AS MATRICULA_USUARIO,
                                           c.Descricao AS CARGO_USUARIO,
                                           ii.Descricao AS DESCRICAO_ITEM
                                    FROM TB_Inspecao i INNER JOIN TB_Gerencia g ON i.IDGerencia = g.IDGerencia
                                         INNER JOIN TB_AreaInspecao ai ON ai.IDInspecao = i.IDInspecao
                                         INNER JOIN TB_Area a ON a.IDArea = ai.IDArea
                                         INNER JOIN TB_UsuarioInspecao ui ON ui.IDInspecao = i.IDInspecao
                                         INNER JOIN TB_Usuario u ON u.IDUsuario = ui.IDUsuario
                                         INNER JOIN TB_Cargo c ON c.IDCargo =  u.IDCargo
                                         INNER JOIN TB_ItemInspecao ii ON ii.IDInspecao = i.IDInspecao`)





      return (inspections);
    } catch (error) {
      console.log(error);
    }
    

  },

  async findById(id) {
  
    try {
      var inspection = await connection
        .raw(`SELECT i.IDInspecao as IDInspecaoo,
        i.isRevisado as isRevisado,
        i.DataFimInspecao as DataFimInspecao,
        i.PercentualRM as PercentualRM,
        i.DataInicioInspecao,
        i.IDGerencia,
        i.Status,
        a.IDArea,
      ie.*,e.IDUsuario, e.Senha, e.Matricula, e.NomeUsuario FROM TB_Inspecao  i INNER JOIN TB_UsuarioInspecao u ON i.IDInspecao = u.IDInspecao 
                  INNER JOIN TB_Usuario e ON u.IDUsuario = e.IDUsuario
                  INNER JOIN TB_ItemInspecao ie ON i.IDInspecao = ie.IDInspecao
                  INNER JOIN TB_AreaInspecao a ON i.IDInspecao = a.IDInspecao
                WHERE u.IDUsuario = ${id}`)
     
      return inspection;
    } catch (error) {
      console.log(error);
    }
    return inspection;
  },
  async findByIdGerencia(id) {
  
    try {
      var inspection = await connection
        .raw(`SELECT i.IDInspecao as IDInspecaoo,
        i.isRevisado as isRevisado,
        i.DataFimInspecao as DataFimInspecao,
        i.PercentualRM as PercentualRM,
        i.DataInicioInspecao,
        i.IDGerencia,
        i.Status,
        a.IDArea,
      ie.*,e.IDUsuario, e.Senha, e.Matricula, e.NomeUsuario FROM TB_Inspecao  i INNER JOIN TB_UsuarioInspecao u ON i.IDInspecao = u.IDInspecao 
                  INNER JOIN TB_Usuario e ON u.IDUsuario = e.IDUsuario
                  INNER JOIN TB_ItemInspecao ie ON i.IDInspecao = ie.IDInspecao
                  INNER JOIN TB_AreaInspecao a ON i.IDInspecao = a.IDInspecao
                WHERE i.IDGerencia = ${id}`)
     
      return inspection;
    } catch (error) {
      console.log(error);
    }
    return inspection;
  },

  async findByDescription(description) {
    try {
      var inspection = await connection('TB_Inspecao').select('*').where('Descricao', description).first();
      return inspection;
    } catch (error) {
      console.log(error);
    }

  },
  async create(inspection) {
    
    try {
      var inspection = await connection('TB_Inspecao').returning('*').insert(inspection);
      return inspection;
    } catch (error) {
      console.log(error);
    }

  },
  async update(id, inspectioon, newAreaInspecao, newUserInspecao, newItemInspecao) {
    console.log('Nao cheguei aqui');
    try {
      return await connection.transaction(async (trx) => {
        console.log('Entrei dentro da Transaction');

        //Exclui registros vinculados a inspeção 
        await trx('TB_AreaInspecao').where('IDInspecao', id).del();
        await trx('TB_UsuarioInspecao').where('IDInspecao', id).del();
        await trx('TB_ItemInspecao').where('IDInspecao', id).del();

        //Faz as novas associações
        const newItemInspecaoAssociacoes = await newItemInspecao.map(ItemInspecao => ({
          Descricao: ItemInspecao['Descricao'],
          LocalInspecao: ItemInspecao['LocalInspecao'],
          TAG: ItemInspecao['TAG'],
          REF: ItemInspecao['REF'],
          CR: ItemInspecao['CR'],
          SB: ItemInspecao['SB'],
          MD: ItemInspecao['MD'],
          DE: ItemInspecao['DE'],
          AC: ItemInspecao['AC'],
          IDInspecao: id,
          NivelRisco: ItemInspecao['NivelRisco'],
          RegistroInicial: ItemInspecao['RegistroInicial'],
          RegistroFinal: ItemInspecao['RegistroFinal']
        }))
        const newAreaInspecaoAssociacoes = await newAreaInspecao.map(Area => ({ IDInspecao: id, IDArea: Area['IDArea'] }));
        const newUsuarioInspecaoAssociacoes = await newUserInspecao.map(IDUsuario => ({ IDInspecao: id, IDUsuario: IDUsuario['IDUsuario'] }));

        //Insere os registros atualizados
        var areaInspecao = await trx('TB_AreaInspecao').insert(newAreaInspecaoAssociacoes).returning('*');
        var usuarioInspecao = await trx('TB_UsuarioInspecao').insert(newUsuarioInspecaoAssociacoes).returning('*');
        var itemInspecao = await trx('TB_ItemInspecao').insert(newItemInspecaoAssociacoes).returning('*')

        //Realiza o update da inspecao
        var inspection = await trx('TB_Inspecao').where('IDInspecao', id).update(inspectioon).returning('*');
        return { sucess: 'true', inspection, itemInspecao, usuarioInspecao, areaInspecao }
      })
    } catch (error) {
      console.log(error);
    } finally {
    }
  },

  async delete(id) {
    console.log('Cheguei ate aqui pra deletar')
    try {
      
      await connection('TB_Inspecao')
        .where('IDInspecao', id)
        .del()

      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }

}
