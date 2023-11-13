
const connection = require('../database/config');

module.exports = {
  async findAll() {
    try {
      var usersIspections = await
        connection('TB_UsuarioInspecao as ui')
          .innerJoin('TB_Usuario as u', 'ui.IDUsuario', '=', 'u.IDUsuario')
          .innerJoin('TB_Inspecao as i', 'ui.IDInspecao', '=', 'i.IDInspecao')
          .innerJoin('TB_Gerencia as g', 'u.IDGerencia', '=', 'g.IDGerencia')
          .innerJoin('TB_Cargo as c', 'u.IDCargo', '=', 'c.IDCargo')
          .innerJoin('TB_Gerencia as gg', 'i.IDGerencia', '=', 'gg.IDGerencia')
          .select(
            'i.IDInspecao as Codigo_Inspecao',
            'i.DataInicioInspecao as Data_de_Inicio_Inspecao',
            'i.DataFimInspecao as Data_de_Finalizacao_Inspecao',
            'i.PercentualRM as Percentual_RM',
            'i.DataRevisaoInspecao as Data_de_Revisao_Inspecao',
            'i.Status as Status_Inspecao',
            'i.isRevisado as Revisado',
            'gg.Descricao as Descricao_Gerencia_Inspecao',
            'u.NomeUsuario as Nome_Usuario',
            'u.Matricula as Matricula_Usuario',
            'c.Descricao as Cargo_Usuario',
          )
    } catch (error) {
      console.log(error);
    }

    return usersIspections;
  },

  async findById(idusuario, idinspecao) {

    console.log(idusuario + ' - ', idinspecao)
    try {
      var user = await connection('TB_UsuarioInspecao as ui')

        .innerJoin('TB_Usuario as u', 'ui.IDUsuario', '=', 'u.IDUsuario')
        .innerJoin('TB_Inspecao as i', 'ui.IDInspecao', '=', 'i.IDInspecao')
        .innerJoin('TB_Gerencia as g', 'u.IDGerencia', '=', 'g.IDGerencia')
        .innerJoin('TB_Cargo as c', 'u.IDCargo', '=', 'c.IDCargo')
        .innerJoin('TB_Gerencia as gg', 'i.IDGerencia', '=', 'gg.IDGerencia')
        .select(
          'i.IDInspecao as Codigo_Inspecao',
          'i.DataInicioInspecao as Data_de_Inicio_Inspecao',
          'i.DataFimInspecao as Data_de_Finalizacao_Inspecao',
          'i.PercentualRM as Percentual_RM',
          'i.DataRevisaoInspecao as Data_de_Revisao_Inspecao',
          'i.Status as Status_Inspecao',
          'i.isRevisado as Revisado',
          'gg.Descricao as Descricao_Gerencia_Inspecao',
          'u.NomeUsuario as Nome_Usuario',
          'u.Matricula as Matricula_Usuario',
          'c.Descricao as Cargo_Usuario',)
        .where('ui.IDUsuario', idusuario)
        .andWhere('ui.IDInspecao', idinspecao);

    } catch (error) {
      console.log(error);
    }
    console.log(user);
    return user;
  },

  async findByMatricula(matricula) {
    try {
      var user = await connection('TB_UsuarioInspecao').select('*').where('Matricula', matricula).first();
      return user;
    } catch (error) {
      console.log(error);
    }

  },


  async create(userinspection) {

    console.log(userinspection);
    try {
      var usuarioinspecao = await connection('TB_UsuarioInspecao').returning('*').insert(userinspection)
      return usuarioinspecao;
    } catch (error) {
      console.log(error)
    }

  },
  async update(id, userinspection) {

    console.log(userinspection)
    try {
      var user = await connection('TB_UsuarioInspecao').returning('*').where('IDUsuarioInspecao', id).update(userinspection);
      return { success: true, user };
    } catch (error) {
      console.log(error);
    }
  },

  async delete(id) {
    try {
      var user = await connection('TB_UsuarioInspecao').where('IDUsuarioInspecao', id).del()
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }
  ,
  async deletebyidinspecao(id) {
    try {
      var user = await
        connection('TB_UsuarioInspecao')
          .where('IDInspecao',id).del()
    } catch (error) {
      console.log(error);
    }
  }

}
