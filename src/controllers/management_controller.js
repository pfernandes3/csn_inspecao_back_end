
const managementModel = require('../models/management_model');
const { isDigit } =  require('../utils/isdigit');
module.exports = {
  async index(req, res) {
    const managements = await managementModel.findAll();
    res.json({ sucesso: true, managements: managements });
  },

  async show(req, res) {

    const { id } = req.params;
    try {
      const management = await managementModel.findById(id);
      console.log(management);

      if (management.length > 0) {
        // Usuário encontrado
        res.json({ sucesso: true, management: management });
      } else {
        // Usuário não encontrado
        res.status(404).json({ sucesso: false, mensage: "management not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro ao buscar o Cargo.' });
    }
  },
  async store(req, res) {

    const { Descricao, IDGerenciaGeral } = req.body;

    if (!Descricao) {
      return res.status(400).json({ error: 'Descricao is required' });
    }
    const descricaoExists = await managementModel.findByDescription(Descricao);

    if (descricaoExists) { return res.status(400).json({ error: 'This Description already been taken!' }) }


    management = {
      'Descricao': Descricao,
      'IDGerenciaGeral': IDGerenciaGeral
    }

    const response = await managementModel.create(management);
    return res.json(response);
  },

  async update(req, res) {
    const { id } = req.params;

    const { Descricao, IDGerenciaGeral } = req.body;

    const descricaoExists = await managementModel.findByDescription(Descricao);

    if(!isDigit(id)){
      return res.status(400).json({error: 'This is not a number'});
    }

    if (descricaoExists && descricaoExists.IDGerencia !== parseInt(id)) {

      return res.status(400).json('This description is already in use');
    }
    const managementExists = await managementModel.findById(id);

    if (managementExists < 1) {
      return res.status(404).json({ error: 'management not found!' });
    }

    management = {
      'Descricao': Descricao,
      'IDGerenciaGeral': IDGerenciaGeral
    }
    const response = await managementModel.update(id, management);
    res.json(response);
  },

  async delete(req, res) {
    const { id } = req.params;
    const managementExists = await managementModel.findById(id);
    console.log(managementExists.length);

    if (managementExists < 1) {
      return res.status(404).json({ error: 'management not found' });
    }

    const response = await managementModel.delete(id);
    res.json(response);
  }
}
