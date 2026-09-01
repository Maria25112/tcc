const usuarioModel = require("../models/usuarioModel");

const UsuarioController = {

    // Cadastrar novo usuário
    cadastrar: (req, res) => {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos!" });
        }

        usuarioModel.cadastrar(nome, email, senha, (erro) => {
            if (erro) {
                console.error("Erro ao cadastrar usuário:", erro);
                return res.status(500).json({ sucesso: false, mensagem: "Erro ao cadastrar usuário.", detalhe: erro.message });
            }
            res.status(201).json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso!" });
        });
    },

    // Login de usuário
    login: (req, res) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos!" });
        }

        usuarioModel.login(email, senha, (erro, resultado) => {
            if (erro) {
                console.error("Erro no login:", erro);
                return res.status(500).json({ sucesso: false, mensagem: "Erro no servidor!" });
            }

            if (resultado && resultado.length > 0) {
                res.json({
                    sucesso: true,
                    mensagem: "Login realizado com sucesso!",
                    usuario: resultado[0]
                });
            } else {
                res.status(401).json({
                    sucesso: false,
                    mensagem: "Email ou senha incorretos."
                });
            }
        });
    },

    // Salvar avaliação de música
    avaliar: (req, res) => {
        const { musica, artista, comentario, nota, data_avaliacao } = req.body;

        if (!musica || !artista || !comentario || !nota || !data_avaliacao) {
            return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos!" });
        }

        usuarioModel.avaliar(musica, artista, comentario, nota, data_avaliacao, (erro) => {
            if (erro) {
                console.error("Erro ao salvar avaliação:", erro);
                return res.status(500).json({ sucesso: false, mensagem: "Erro ao salvar avaliação.", detalhe: erro.message });
            }
            res.status(201).json({ sucesso: true, mensagem: "Avaliação salva com sucesso!" });
        });
    },

    // Listar avaliações
    listarAvaliacoes: (req, res) => {
        usuarioModel.listarAvaliacoes((erro, resultados) => {
            if (erro) {
                console.error("Erro ao listar avaliações:", erro);
                return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar avaliações." });
            }
            res.json({ sucesso: true, avaliacoes: resultados });
        });
    }

};

module.exports = UsuarioController;
