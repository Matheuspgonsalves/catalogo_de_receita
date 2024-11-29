const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/UserController');

const router = express.Router();

router.post(
    '/cadastro',
    [
        check('firstName', 'Nome é obrigatório').notEmpty(),
        check('lastName', 'Sobrenome é obrigatório').notEmpty(),
        check('email', 'Email inválido').isEmail(),
        check('password', 'Senha deve ter pelo menos 6 caracteres').isLength({ min: 6 }),
    ],
    userController.createUser
);

router.post(
    '/login',
    [
        check('email', 'Email inválido').isEmail(),
        check('password', 'Senha é obrigatória').notEmpty(),
    ],
    userController.loginUser
);

module.exports = router;
