const express = require('express');
const route = express.Router();
const userInspectionController = require('../controllers/user_inspection_controller');



route.get('/', userInspectionController.index);
route.get('/:iduser/:idinspection', userInspectionController.show);
route.post('/', userInspectionController.store)
route.put('/:id', userInspectionController.update);
route.delete('/:id', userInspectionController.delete);
route.delete('/:id',userInspectionController.deletebyidinspecao)


module.exports = route;
