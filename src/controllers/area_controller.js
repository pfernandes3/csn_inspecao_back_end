
const areaModel = require('../models/area_model');
const { isDigit } = require('../utils/isdigit');

module.exports = {
  async index(req, res) {
    const areas = await areaModel.findAll();
    res.json({ sucesso: true, areas: areas });
  },

  async show(req, res) {

    const { id } = req.params;
    console.log(id);
    try {
      const area = await areaModel.findById(id);
      console.log(area);

      if (area.length > 0) {
        // Usuário encontrado
        res.json({ sucesso: true, area: area });
      } else {
        // Usuário não encontrado
        res.status(404).json({ sucesso: false, mensage: "area not found" });
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
    const descricaoExists = await areaModel.findByDescription(Descricao);

    if (descricaoExists) { return res.status(400).json({ error: 'This Description already been taken!' }) }


    area = {
      'Descricao': Descricao
    }

    const response = await areaModel.create(area);
    return res.json(response);
  },

  async update(req, res) {
    const { id } = req.params;

    const { Descricao } = req.body;

    const descricaoExists = await areaModel.findByDescription(Descricao);
    if (!isDigit(id)) { return res.status(400).json({ error: 'This is not a number' }) }
    
    if (descricaoExists && descricaoExists.IDUsuario !== parseInt(id)) {

      return res.status(400).json('This description is already in use');
    }
    const areaExists = await areaModel.findById(id);

    if (areaExists < 1) {
      return res.status(404).json({ error: 'area not found!' });
    }

    area = {
      'Descricao': Descricao
    }
    const response = await areaModel.update(id, area);
    res.json(response);
  },

  async delete(req, res) {
    const { id } = req.params;
    const areaExists = await areaModel.findById(id);

    if (areaExists < 1) {
      return res.status(404).json({ error: 'area not found' });
    }

    const response = await areaModel.delete(id);
    res.json(response);
  }
}
