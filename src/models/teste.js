const connection = require('../database/config');


module.exports = {
  async findAll() {
    try {
      //var users =  await connection.raw('SELECT * FROM TB_Inspecao i INNER JOIN TB_Item_Inspecao it ON i.IDInspecao = it.IDInspecao');
      var users = await connection('TB_Usuario').select('*'); // Verificar se tem a possibilidade do JSON ter um retorno visualmente melhor 
    } catch (err) {
      console.log(err);   
    }

    return {
      users

    };

  },

  async updateInspection(idInspection, inspection) {
    try {
      var response = await connection('TB_Usuario').where('Matricula', idInspection).update(inspection);
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  async createInspection(inspection) {
    try {

      var response = await connection('TB_Inspecao')
        .insert(inspection);
      return response; // esta retornando um array [] vazio. Favor conferir
    } catch (err) {
      console.log(err)
    }

  },
  async findById(idInspection) {

    try {
      var ret = await connection('TB_Inspecao')
        .innerJoin('TB_Item_Inspecao', 'TB_Inspecao.IDInspecao', '=', 'TB_Item_Inspecao.IDInspecao')
        .innerJoin('TB_Usuario', 'TB_Inspecao.MatriculaUsuario', '=', 'TB_Usuario.Matricula')
        .select('*').where('TB_Inspecao.IDInspecao', idInspection); // Verificar se tem a possibilidade do JSON ter um retorno visualmente melhor 
    } catch (err) {
      console.log(err)
    }

    return { ret };

  },

  async deleteInspection(ID) {
    try {
      var delItemInspecao = await connection('TB_Item_Inspecao').where('IDInspecao', ID).del();
      var response = await connection('TB_Inspecao').where('IDInspecao', ID).del();
      console.log(response);
      return response;

    } catch (err) {
      console.log(err);
    }
  }
}
