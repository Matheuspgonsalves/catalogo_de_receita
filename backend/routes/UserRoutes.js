const express = require('express');
const userController = require('../controllers/UserController');
const userValidation = require('../middlewares/UserValidation');

const router = express.Router();

router.post(
    '/cadastro',
    userValidation.register,
    userController.createUser
);

router.post(
    '/login',
    userValidation.login,
    userController.loginUser
);

module.exports = router;
