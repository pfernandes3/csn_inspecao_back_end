const itemInspectionModel = require('../models/item_inspection_model');

const { isDigit } = require('../utils/isdigit');
module.exports = {
  async index(req, res) {


    const items = await inspectionModel.findAll();
    res.json({ sucesso: true, items: items });
  },

  async show(req, res) {

    const { id } = req.params;

    try {
      const inspection = await inspectionModel.findById(id);
      console.log(inspection.DataFimInspecao);

    
      if (inspection.length > 0) {
        // Usuário encontrado
        res.json({ sucesso: true, inspection: inspection });
      } else {
        // Usuário não encontrado
        res.status(404).json({ sucesso: false, mensage: "inspection not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro ao buscar a Inspecao.' });
    }
  },
  async store(req, res) {

    const { Descricao, LocalInspecao, TAG, REF, CR, SB, MD, DE, AC, NivelRisco, RegistroInicial, RegistroFinal, IDInspecao } = req.body;

    if (!Descricao || !LocalInspecao || !TAG || !REF || !NivelRisco || !RegistroInicial || !IDInspecao ) {
      return res.status(400).json({ error: 'DataInicioInspecao or PercentualRM is required' });
    }

   
    itemInspection = {
      'AC': AC,
      'CR': CR,
      'DE': DE,
      'Descricao': Descricao,
      'IDInspecao': IDInspecao,
      'LocalInspecao': LocalInspecao,
      'MD': MD,
      'NivelRisco': NivelRisco,
      'REF': REF,
      'RegistroFinal': RegistroInicial,
      'RegistroInicial': RegistroInicial,
      'SB': SB,
      'TAG': TAG
    }

    const response = await itemInspectionModel.create(itemInspection);
    return res.json(response);
  },

  async update(req, res) {
    const { id } = req.params;

    const {  DataInicioInspecao, DataFimInspecao, PercentualRM, DataRevisaoInspecao, Status, IDGerencia, isRevisado } = req.body;


    if (!isDigit(id)) {
      return res.status(400).json({ error: 'This is not a number' });
    }

    const inspectionExists = await inspectionModel.findById(id);

    if (inspectionExists < 1) {
      return res.status(404).json({ error: 'inspection not found!' });
    }

  
    inspection = {
      'DataFimInspecao': DataFimInspecao,
      'DataInicioInspecao': DataInicioInspecao,
      'DataRevisaoInspecao': DataRevisaoInspecao,
      'IDGerencia': IDGerencia,
      'PercentualRM': PercentualRM,
      'Status': Status,
      'isRevisado': isRevisado
    }
    const response = await inspectionModel.update(id, inspection);
    res.json(response);
  },

  async delete(req, res) {
    const { id } = req.params;
    const inspectionExists = await inspectionModel.findById(id);
    console.log(inspectionExists.length);
    if (inspectionExists < 1) {
      return res.status(404).json({ error: 'inspection not found' });
    }

    const response = await inspectionModel.delete(id);
    res.json(response);
  }
,
  async deletebyidinspecao(req, res){
    const { id } = req.params;
    const response = await itemInspectionModel.deletebyidinspecao(id);
    res.json(response);
  }
}
