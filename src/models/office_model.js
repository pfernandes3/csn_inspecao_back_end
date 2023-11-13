const connection = require('../database/config');

module.exports = {
  async findAll() {
    try {
      var offices = await connection('TB_Cargo as c').select('c.*');
    } catch (error) {
      console.log(error);
    }

    return offices;
  },

  async findById(id) {
    try {
      var offices = await connection('TB_Cargo').select('*').where('IDCargo', id);

    } catch (error) {
      console.log(error);
    }
    return offices;
  },

  async findByDescription(description) {
    try {
      var office = await connection('TB_Cargo').select('*').where('Descricao', description).first();
      return office;
    } catch (error) {
      console.log(error);
    }

  },


  async create(office) {

    try {
      var office = await connection('TB_Cargo').returning(['*']).insert(office);
      console.log(office);
      return office;
    } catch (error) {
      console.log(error);
    }

  },
  async update(id, office) {
    try {
      var user = await connection('TB_Cargo').returning('*').where('IDCargo', id).update(office);
      return { success: true, office };
    } catch (error) {
      console.log(error);
    }
  },

  async delete(id) {
    try {
      var user = await connection('TB_Cargo')
                       .where('IDCargo', id)
                       .del()
      return {success:true};
    } catch (error) {
      console.log(error);
    }
  }

}
