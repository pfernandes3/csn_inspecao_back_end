const express = require('express');
const route = express.Router();
const itemInspectionController = require('../controllers/item_inspection_controller');


route.get('/',itemInspectionController.index);
route.get('/:id',itemInspectionController.show);
route.post('/',itemInspectionController.store);
route.put('/:id',itemInspectionController.update);
route.delete('/:id',itemInspectionController.delete);
route.delete('/:id',itemInspectionController.deletebyidinspecao)


module.exports = route;
