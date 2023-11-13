const connection = require('../database/config');

module.exports = {
  async findAll() {
    try {
      var areas = await connection('TB_Area')
                        .select('*');
    } catch (error) {
      console.log(error);
    }

    return areas;
  },

  async findById(id) {
    try {
      var areas = await connection('TB_Area').select('*').where('IDArea', id);

    } catch (error) {
      console.log(error);
    }
    return areas;
  },

  async findByDescription(description) {
    try {
      var area = await connection('TB_Area').select('*').where('Descricao', description).first();
      return area;
    } catch (error) {
      console.log(error);
    }

  },


  async create(area) {

    try {
      var area = await connection('TB_Area').returning(['*']).insert(area);
      console.log(area);
      return area;
    } catch (error) {
      console.log(error);
    }

  },
  async update(id, area) {
    try {
      var user = await connection('TB_Area').returning('*').where('IDArea', id).update(area);
      return { success: true, area };
    } catch (error) {
      console.log(error);
    }
  },

  async delete(id) {
    try {
      var user = await connection('TB_Area')
                       .where('IDArea', id)
                       .del()
      return {success:true};
    } catch (error) {
      console.log(error);
    }
  }

}
