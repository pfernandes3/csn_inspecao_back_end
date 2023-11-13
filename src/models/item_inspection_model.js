const connection = require('../database/config');

module.exports = {
  async findAll() {
    try {
      var inspections = await connection('TB_ItemInspecao')
        .select('*');
    } catch (error) {
      console.log(error);
    }
    console.log(inspections);
    return inspections;
  },

  async findById(id) {
    try {
      var inspection = await connection('TB_ItemInspecao').select('*').where('IDInspecao', id);
    } catch (error) {
      console.log(error);
    }
    return inspection;
  },

  async findByDescription(description) {
    try {
      var inspection = await connection('TB_ItemInspecao').select('*').where('Descricao', description);
      return inspection;
    } catch (error) {
      console.log(error);
    }

  },


  async create(items) {

    try {
      var items = await connection('TB_ItemInspecao').returning(['*']).insert(items);
      return items;
    } catch (error) {
      console.log(error);
    }

  },
  async update(id, inspection) {
    try {
      var itemInspection = await connection('TB_ItemInspecao').returning('*').where('IDInspecao', id).update(inspection);
      return { success: true, itemInspection };
    } catch (error) {
      console.log(error);
    }
  },

  async delete(id) {
    try {
      var itemInspection = await connection('TB_ItemInspecao')
        .where('IDInspecao', id)
        .del()
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  },

  async deletebyidinspecao(id) {
    try {
      console.log('Vim aqui');
      var itemInspecation = await
        connection('TB_ItemInspecao')
        .where('IDInspecao',id)
        .del();
    } catch (error) { 
      console.log(error);

    }
  }

}
