const connection = require('../database/config');

module.exports = {
  async findAll() {
    try {
      var managements = await connection('TB_Gerencia as g')
        .select(
          'g.*')
    } catch (error) {
      console.log(error);
    }

    return managements;
  },

  async findById(id) {
    try {
      var managements = await
        connection('TB_Gerencia as g')
          .leftJoin('TB_Gerencia as gg', 'g.IDGerenciaGeral', '=', 'gg.IDGerencia')
          .select(
            'g.Descricao as Descricao_Gerencia',
            'gg.Descricao as Descricao_Gerencial_Geral')
          .where('g.IDGerencia', id);


    } catch (error) {
      console.log(error);
    }
    return managements;
  },

  async findByDescription(description) {
    try {
      var area = await connection('TB_Gerencia').select('*').where('Descricao', description).first();
      return area;
    } catch (error) {
      console.log(error);
    }

  },


  async create(area) {

    try {
      var area = await connection('TB_Gerencia').returning(['*']).insert(area);
      console.log(area);
      return area;
    } catch (error) {
      console.log(error);
    }

  },
  async update(id, area) {
    try {
      var user = await connection('TB_Gerencia').returning('*').where('IDGerencia', id).update(area);
      return { success: true, area };
    } catch (error) {
      console.log(error);
    }
  },

  async delete(id) {
    try {
      var user = await connection('TB_Gerencia')
        .where('IDGerencia', id)
        .del()
      return { success: true };
    } catch (error) {
      console.log('teste')
      if (error.code === '23503') {
        console.error('Error: Este registro está sendo referenciado por outro registro')
      } else {
        throw error;
      }

    }
  }

}
