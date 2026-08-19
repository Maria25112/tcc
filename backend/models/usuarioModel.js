const conexao = require("../database/conexao");

const usuarioModel = {

    // Cadastrar novo usuário
    cadastrar: (nome, email, senha, callback) => {
        const sql = "INSERT INTO usuario (nome_usuario, email, senha) VALUES (?, ?, ?)";
        conexao.query(sql, [nome, email, senha], callback);
    },

    // Login de usuário
    login: (email, senha, callback) => {
        const sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
        conexao.query(sql, [email, senha], callback);
    },

    // Salvar avaliação de música
    avaliar: (musica, artista, comentario, nota, callback) => {
        const sql = "INSERT INTO avaliacoes (musica, artista, comentario, nota) VALUES (?, ?, ?, ?)";
        conexao.query(sql, [musica, artista, comentario, nota], callback);
    },

    // Listar todas as avaliações
    listarAvaliacoes: (callback) => {
        const sql = "SELECT id, musica, artista, comentario, nota, data_avaliacao FROM avaliacoes ORDER BY data_avaliacao DESC";
        conexao.query(sql, callback);
    }

};

module.exports = usuarioModel;