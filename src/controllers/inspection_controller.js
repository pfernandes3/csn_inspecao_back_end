const { format } = require('date-fns');
const inspectionModel = require('../models/inspection_model');
const userInspectionModel = require('../models/user_inspection_model')
const itemInspectionModel = require('../models/item_inspection_model')
const areaInspecaoModel = require('../models/area_inspection_model')
const { isDigit } = require('../utils/isdigit');
module.exports = {
  async index(req, res) {


    const inspections = await inspectionModel.findAll();

    const inspectionsFormatadas = inspections.map(inspections => ({
      ...inspections,
      DATA_FIM: inspections.DATA_FIM ? format(new Date(inspections.DATA_FIM), 'yyyy-MM-dd HH:mm:ss') : null,
      DATA_INICIO: inspections.DATA_INICIO ? format(new Date(inspections.DATA_INICIO), 'yyyy-MM-dd HH:mm:ss') : null,
      DATA_REVISAO: inspections.DATA_REVISAO ? format(new Date(inspections.DATA_REVISAO), 'yyyy-MM-dd HH:mm:ss') : null,
    }))

    res.json({ sucesso: true, inspections: inspectionsFormatadas });
  },

  async show(req, res) {

    const { id } = req.params;

    try {
      const inspection = await inspectionModel.findById(id);



      if (inspection.length > 0) {
        // Usuário encontrado
        res.json({ inspection });
      } else {
        // Usuário não encontrado
        res.status(404).json({ sucesso: false, mensage: "inspection not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro ao buscar a Inspecao.' });
    }
  },
  async showByIDGerencia(req, res) {

    const { id } = req.params;

    try {
      const inspection = await inspectionModel.findByIdGerencia(id);



      if (inspection.length > 0) {
        // Usuário encontrado
        res.json({ inspection });
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

    const { DataInicioInspecao, DataFimInspecao, PercentualRM, DataRevisaoInspecao, Status, IDGerencia, isRevisado, ItemInspecao, UsuarioInspecao, AreaInspecao } = req.body;

    if (!DataInicioInspecao || !PercentualRM) {
      return res.status(400).json({ error: 'DataInicioInspecao or PercentualRM is required' });
    }
    console.log('Cheguei pelomenos aqui');

    inspection = {
      'DataFimInspecao': DataFimInspecao,
      'DataInicioInspecao': DataInicioInspecao,
      'DataRevisaoInspecao': DataRevisaoInspecao,
      'IDGerencia': IDGerencia,
      'PercentualRM': PercentualRM,
      'Status': Status,
      'isRevisado': isRevisado
    }
    const items = ItemInspecao;
    const usuariosInspecao = UsuarioInspecao;
    const areasInspecao = AreaInspecao;

    
    const response = await inspectionModel.create(inspection);
    items.forEach(element => {
      element.IDInspecao = response[0]['IDInspecao'];
    });
    usuariosInspecao.forEach(element => {
      element.IDInspecao = response[0]['IDInspecao']
    })

    areasInspecao.forEach(element => {
      element.IDInspecao = response[0]['IDInspecao'];
    })

    console.log(usuariosInspecao);
    const response3 = await userInspectionModel.create(usuariosInspecao);
    const response4 = await areaInspecaoModel.create(areasInspecao);
    const response2 = await itemInspectionModel.create(items)

    return res.json({ success: true, inspection: response, items: response2, usuarioinspecao: response3, areainspecao: response4 });
  },

  async update(req, res) {
    const { id } = req.params;
    console.log('Cheguei aqui')
    const { DataInicioInspecao, DataFimInspecao, PercentualRM, DataRevisaoInspecao, Status, IDGerencia, isRevisado = 0, ItemInspecao, UsuarioInspecao, AreaInspecao } = req.body;
   
    if (!isDigit(id)) {
      return res.status(400).json({ error: 'This is not a number' });
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
    console.log('Ate Criar a inspeção eu cheguei');
     const response = await inspectionModel.update(id, inspection, AreaInspecao, UsuarioInspecao, ItemInspecao);

    console.log('Passei do response');
    console.log(response);
    res.json(response);
  },

  async delete(req, res) {


    const { id } = req.params;
    console.log(typeof id);
    if (!isDigit(id)) {
      return res.status(404).json({ error: 'This is not a number' })
    }


    //Verifica se o retorno da busca, 


    //Faz delete de dados relacionados a inspeção passada
    await itemInspectionModel.deletebyidinspecao(id);
    await userInspectionModel.deletebyidinspecao(id);
    await areaInspecaoModel.deletebyidinspecao(id);

    //Faz deleção da inspeção
    const response = await inspectionModel.delete(id);
    res.json(response);
  }
}
