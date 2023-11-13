const express = require('express');
const route =  express.Router();
const managementController =  require('../controllers/management_controller')

route.get('/', managementController.index);
route.get('/:id',managementController.show);
route.post('/',managementController.store);
route.put('/:id',managementController.update);
route.delete('/:id',managementController.delete);

module.exports = route;
