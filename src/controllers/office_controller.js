
const officeModel = require('../models/office_model');

module.exports = {
  async index(req, res) {
    const offices = await officeModel.findAll();
    res.json({ sucesso: true, offices: offices });
  },

  async show(req, res) {

    const { id } = req.params;
    try {
      const office = await officeModel.findById(id);
      console.log(office);

      if (office.length > 0) {
        // Usuário encontrado
        res.json({ sucesso: true, office: office });
      } else {
        // Usuário não encontrado
        res.status(404).json({ sucesso: false, mensage: "Office not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro ao buscar o Cargo.' });
    }
  },
  async store(req, res) {

    const { Descricao } = req.body;

    if (!Descricao) {
      return res.status(400).json({ error: 'Descricao is required' });
    }
    const descricaoExists = await officeModel.findByDescription(Descricao);

    if (descricaoExists) { return res.status(400).json({ error: 'This Description already been taken!' }) }


    office = {
      'Descricao': Descricao
    }

    const response = await officeModel.create(office);
    return res.json(response);
  },

  async update(req, res) {
    const { id } = req.params;

    const { Descricao } = req.body;

    const descricaoExists = await officeModel.findByDescription(Descricao);

    if (descricaoExists && descricaoExists.IDUsuario !== parseInt(id)) {

      return res.status(400).json('This description is already in use');
    }
    const officeExists = await officeModel.findById(id);

    if (officeExists < 1) {
      return res.status(404).json({ error: 'Office not found!' });
    }

    office = {
      'Descricao': Descricao
    }
    const response = await officeModel.update(id, office);
    res.json(response);
  },

  async delete(req, res) {
    const { id } = req.params;
    const officeExists = await officeModel.findById(id);

    if (officeExists < 1) {
      return res.status(404).json({ error: 'Office not found' });
    }

    const response = await officeModel.delete(id);
    res.json(response);
  }
}
