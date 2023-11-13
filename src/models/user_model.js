
const connection = require('../database/config');

module.exports = {
  async findAll() {
    try {
      var users = await connection('TB_Usuario as u').select('u.*');
    } catch (error) {
      console.log(error);
    }

    return users;
  },

  async findById(id) {
    try {
      var user = await connection('TB_Usuario').select('*').where('IDUsuario', id);

    } catch (error) {
      console.log(error);
    }
    return user;
  },

  async findByMatricula(matricula) {
    try {
      
      var user = await connection('TB_Usuario').select('*').where('Matricula', matricula).first();

      return user;
    } catch (error) {
      console.log(error);
    }

  },

  async findByMatriculaAndPassword(matricula, senha) {
    
    try {
      var user = await connection('TB_Usuario').select('*')
        .where('Matricula', matricula)
        .andWhere('Senha', senha)
        .first()

        console.log(user);
      return user;
    } catch (error) {

    }
  },
  async create(user) {

    try {
      var user = await connection('TB_Usuario').returning(['*']).insert(user);
      console.log(response);
      return user;
    } catch (error) {
      console.log(error);
    }

  },
  async update(id, user) {
    try {
      var user = await connection('TB_Usuario').returning('*').where('IDUsuario', id).update(user);
      return { success: true, user };
    } catch (error) {
      console.log(error);
    }
  },

  async delete(id) {
    try {
      var user = await connection('TB_Usuario').where('IDUsuario', id).del()
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }

}
