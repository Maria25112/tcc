const conexao = require("../database/conexao");

const usuarioModel = {
    cadastrar: (nome, email, senha, callback) => {
        const sql = "INSERT INTO usuario (nome_usuario, email, senha) VALUES (?,?,?)"
        conexao.query(sql, [nome, email, senha], callback)
    },

    login: (email, senha, callback) => {
        const sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?"
        conexao.query(sql, [email, senha], callback);
    }
};

module.exports = usuarioModel;