const express =  require('express');
const route = express.Router();
const areaController = require('../controllers/area_controller');

route.get('/',areaController.index);
route.get('/:id',areaController.show);
route.post('/',areaController.store);
route.put('/:id',areaController.update);
route.delete('/:id',areaController.delete);


module.exports = route;
