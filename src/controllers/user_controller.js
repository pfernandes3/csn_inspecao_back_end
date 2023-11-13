const { isDigit } = require('../utils/isdigit');
const userModel = require('../models/user_model');

module.exports = {
  async index(req, res) {
    const users = await userModel.findAll();
    res.json({ sucesso: true, usuarios: users });
  },

  async show(req, res) {

    const { id } = req.params;
    try {
      const user = await userModel.findById(id);
      console.log(user);

      if (user.length > 0) {
        // Usuário encontrado
        res.json({ sucesso: true, usuario: user });
      } else {
        // Usuário não encontrado
        res.status(404).json({ sucesso: false, mensage: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro ao buscar o usuário.' });
    }
  },
  async findByMat(req, res) {

    const { Matricula } = req.body;

    console.log('Matricula: ', Matricula);
    try {
      const user = await userModel.findByMatricula(Matricula);
      console.log(user);

      if (user) {
        // Usuário encontrado
        res.json({ sucesso: true, usuario: user });
      } else {
        // Usuário não encontrado
        res.status(404).json({ sucesso: false, mensage: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro ao buscar o usuário.' });
    }
  }
  ,

  async auth(req,res){
    console.log('entrei aqui')
    const {Matricula, Senha} = req.body
    console.log(Matricula, Senha)
    if(!Matricula || !Senha){
     return res.status(400).json({sucesso: false, message: 'Bad Request'})
    }

    var response = await userModel.findByMatriculaAndPassword(Matricula, Senha);
    
    if(response){
      res.json({sucess:true, user: response});
    }else{
      res.json({sucess:false, message: 'User not found'})
    }
    
    
  },
  async store(req, res) {

    const { NomeUsuario, Matricula, Senha, isAtivo, IDCargo, IDGerencia } = req.body;

    if (!Matricula || !Senha || !IDCargo || !IDGerencia) {
      return res.status(400).json({ error: 'Data is required' });
    }
    const matriculaExists = await userModel.findByMatricula(Matricula);

    if (matriculaExists) { return res.status(400).json({ error: 'This Matricula already been taken!' }) }


    user = {
      'NomeUsuario': NomeUsuario,
      'Matricula': Matricula,
      'Senha': Senha,
      'isAtivo': isAtivo,
      'IDCargo': IDCargo,
      'IDGerencia': IDGerencia
    }

    const response = await userModel.create(user);
    return res.json(response);
  },

  async update(req, res) {
    const { id } = req.params;

    const { NomeUsuario, Matricula, Senha, isAtivo, IDCargo, IDGerencia } = req.body;

    const matriculaExists = await userModel.findByMatricula(Matricula);

    if(!isDigit(id)){
      return res.status(400).json({error: 'This is not a number'})
    }
    if (matriculaExists && matriculaExists.IDUsuario !== parseInt(id)) {

      return res.status(400).json('This registration is already in use');
    }
    const userExists = await userModel.findById(id);

    if (userExists < 1) {
      return res.status(404).json({ error: 'User not found!' });
    }
    user = {
      'NomeUsuario': NomeUsuario,
      'Matricula': Matricula,
      'Senha': Senha,
      'isAtivo': isAtivo,
      'IDCargo': IDCargo,
      'IDGerencia': IDGerencia
    }
    const response = await userModel.update(id, user);
    res.json(response);
  },

  async delete(req, res) {
    const { id } = req.params;
    const userExists = await userModel.findById(id);

    if (userExists < 1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const response = await userModel.delete(id);
    res.json(response);
  }
}
