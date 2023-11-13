const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');


router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/mat', userController.findByMat);
router.post('/login',userController.auth)
router.post('/', userController.store);
router.put('/:id',userController.update);
router.delete('/:id',userController.delete)

module.exports = router;
