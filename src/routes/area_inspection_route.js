const express = require('express');
const route = express.Router();
const areaInspectionController = require('../controllers/area_inspection_controller');

route.get('/',areaInspectionController.index);
route.get('/:id',areaInspectionController.show);
route.post('/',areaInspectionController.store);
route.put('/',areaInspectionController.update);
route.delete('/:id', areaInspectionController.deletebyidinspecao);

module.exports = route;
