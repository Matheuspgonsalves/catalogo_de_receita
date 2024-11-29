const pool = require('../config/db');

const UserModel = {
    createUser: async (firstName, lastName, email, password) => {
        const [result] = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, NOW())',
            [firstName, lastName, email, password]
        );
        return result.insertId;
    },

    findUserByEmail: async (email) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0]; 
    },

    authenticateUser: async (email, password) => {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password]
        );
        return rows[0];
    },
};

module.exports = UserModel;
