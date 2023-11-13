const { isDigit } = require('../utils/isdigit');
const userInspectionModel = require('../models/user_inspection_model');

module.exports = {
  async index(req, res) {
    const users = await userInspectionModel.findAll();
    res.json({ sucesso: true, usuarios: users });
  },

  async show(req, res) {

    const { iduser, idinspection } = req.params;
    try {
      const userispection = await userInspectionModel.findById(iduser, idinspection);
      console.log(userispection);

      if (userispection.length > 0) {
        // Usuário encontrado
        res.json({ sucesso: true, usuario: userispection });
      } else {
        // Usuário não encontrado
        res.status(404).json({ sucesso: false, mensage: "User or Inspection not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro ao buscar o usuário.' });
    }
  }

  ,
  async store(req, res) {

    const { IDUsuario, IDInspecao } = req.body;

    if (!IDUsuario) {
      return res.status(400).json({ error: 'IDUsuario and IDInspecao is required' });
    }





    userinspection = {
      'IDUsuario': IDUsuario,
      'IDInspecao': IDInspecao
    }

    const response = await userInspectionModel.create(userinspection);
    return res.json(response);
  },

  async update(req, res) {
    const { id } = req.params;

    const { IDUsuario, IDInspecao} = req.body;

    console.log(id);
    if (!isDigit(id)) {
      return res.status(400).json({ error: 'This is not a number' })
    }
    
    userinspection = {
      'IDUsuario': IDUsuario,
      'IDInspecao': IDInspecao
    }
    console.log(userinspection)
    const response = await userInspectionModel.update(id, userinspection);
    res.json(response);
  },

  async delete(req, res) {
    const { id } = req.params;
    /*const userExists = await userInspectionModel.findById(id);

    if (userExists < 1) {
      return res.status(404).json({ error: 'User not found' });
    }*/

    const response = await userInspectionModel.delete(id);
    res.json(response);
  },
  async deletebyidinspecao(req, res) {
    const { id } = req.params;
    /*const userExists = await userInspectionModel.findById(id);

    if (userExists < 1) {
      return res.status(404).json({ error: 'User not found' });
    }*/

    const response = await userInspectionModel.deletebyidinspecao(id);
    res.json(response);
  }
}
