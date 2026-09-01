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

    // Salvar avaliação de música (Sem precisar enviar a data manualmente)
    avaliar: (req, res) => {
        const { musica, artista, comentario, nota } = req.body; // Removido data_avaliacao daqui

        if (!musica || !artista || !comentario || !nota) {
            return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos!" });
        }

        // Removido o argumento data_avaliacao da chamada do model
        usuarioModel.avaliar(musica, artista, comentario, nota, (erro) => {
            if (erro) {
                console.error("Erro ao salvar avaliação:", erro);
                return res.status(500).json({ sucesso: false, mensagem: "Erro ao salvar avaliação.", detalhe: erro.message });
            }
            res.status(201).json({ sucesso: true, mensagem: "Avaliação salva com sucesso!" });
        });
    },

    // Listar avaliações (Formatando a data antes de enviar para o site)
    listarAvaliacoes: (req, res) => {
        usuarioModel.listarAvaliacoes((erro, resultados) => {
            if (erro) {
                console.error("Erro ao listar avaliações:", erro);
                return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar avaliações." });
            }

            // Formata a data de cada item retornado do banco
            const avaliacoesFormatadas = resultados.map(item => {
                return {
                    ...item,
                    // Converte o TIMESTAMP do banco em uma data PT-BR (DD/MM/AAAA DD:MM:SS)
                    data_avaliacao: new Date(item.data_avaliacao).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                };
            });

            // Envia os dados já formatados para o Front-end
            res.json({ sucesso: true, avaliacoes: avaliacoesFormatadas });
        });
    }

};

module.exports = UsuarioController;
