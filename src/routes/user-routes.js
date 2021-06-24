const router = require('express').Router();
const UserController = require('../controller/user-controller.js');

router.post('/create', UserController.createUser);
router.get('/all', UserController.getAllUsers);
router.get('/:uuid', UserController.getUserById);
router.put('/:uuid', UserController.updateUser);
router.delete('/:uuid', UserController.deleteUser);

module.exports = router;