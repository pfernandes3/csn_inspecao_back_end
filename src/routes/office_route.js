const express = require("express");
const route = express.Router();
const officeController = require('../controllers/office_controller');


route.get('/', officeController.index);
route.get('/:id',officeController.show);
route.post('/',officeController.store);
route.put('/:id',officeController.update);
route.delete('/:id',officeController.delete); 


module.exports = route;
