const connection = require('../database/config');

module.exports = {
  async findAll() {
    try {
      var areasinspections = await connection('TB_AreaInspecao')
                        .select('*');
    } catch (error) {
      console.log(error);
    }

    return areasinspections;
  },

  async findById(id) {
    try {
      var areasinspections = await connection('TB_AreaInspecao').select('*').where('IDAreaInspecao', id);

    } catch (error) {
      console.log(error);
    }
    return areasinspections;
  },

  async findByDescription(description) {
    try {
      var area = await connection('TB_AreaInspecao').select('*').where('Descricao', description).first();
      return area;
    } catch (error) {
      console.log(error);
    }

  },


  async create(area) {

    try {
      var area = await connection('TB_AreaInspecao').returning(['*']).insert(area);
      console.log(area);
      return area;
    } catch (error) {
      console.log(error);
    }

  },
  async update(id, area) {
    try {
      var user = await connection('TB_AreaInspecao').returning('*').where('IDAreaInspecao', id).update(area);
      return { success: true, area };
    } catch (error) {
      console.log(error);
    }
  },

  async delete(id) {
    try {
      var user = await connection('TB_AreaInspecao')
                       .where('IDAreaInspecao', id)
                       .del()
      return {success:true};
    } catch (error) {
      console.log(error);
    }
  },

  async deletebyidinspecao(id){
    try {
      var areainspection = await connection('TB_AreaInspecao')
                                 .where('IDInspecao',id)
                                 .del();
    } catch (error) {
      console.log(error);
    }
  }

}
