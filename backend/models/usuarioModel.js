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
 
// salvar avaliacao
function salvarAvaliacao(musica, artista, comentario, callback) {
  const sql = `
    INSERT INTO avalicoes (musica, artista, comentario)
    VALUES (?, ?, ?)
  `;
 
  conexao.query(sql, [musica, artista, comentario], callback);
}


// Listar avaliacoes(oq e o id)
function listarAvaliacoes(callback) {
  const sql = `
    SELECT id, musica, artista, comentario, curtidas
    FROM avaliacoes
    ORDER BY data_avaliacao DESC
  `;
 
  conexao.query(sql, callback);
}

 
function curtirAvaliacao(id, callback) {
  const sql = `
    UPDATE avaliacoes
    SET curtidas = curtidas + 1
    WHERE id = ?
  `;
 
  conexao.query(sql, [id], callback);
}
 
module.exports = {
  salvarAvaliacao,
  listarAvaliacoes,
  salvarAvaliacao,
  listarAvaliacoes,
  curtirAvaliacao,
};

module.exports = usuarioModel