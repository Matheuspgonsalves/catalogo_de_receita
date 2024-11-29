const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: 'Cadastro realizado com sucesso!',
            user: {
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar o usuário.' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao realizar o login.' });
    }
};

module.exports = {
    createUser,
    loginUser,
};
