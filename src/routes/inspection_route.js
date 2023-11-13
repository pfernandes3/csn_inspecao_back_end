const express = require('express');
const route =  express.Router();
const inspectionController =  require('../controllers/inspection_controller')


route.get('/', inspectionController.index);
route.get('/:id',inspectionController.show)
route.get('/byidgerencia/:id',inspectionController.showByIDGerencia);
route.post('/',inspectionController.store);
route.put('/:id', inspectionController.update);
route.delete('/:id',inspectionController.delete);

module.exports = route;
