const { check } = require('express-validator');

const userValidation = {
    register: [
        check('firstName', 'Nome é obrigatório').notEmpty(),
        check('lastName', 'Sobrenome é obrigatório').notEmpty(),
        check('email', 'Email inválido').isEmail(),
        check('password', 'Senha deve ter pelo menos 6 caracteres').isLength({ min: 6 }),
    ],
    login: [
        check('email', 'Email inválido').isEmail(),
        check('password', 'Senha é obrigatória').notEmpty(),
    ]
};

module.exports = userValidation;
