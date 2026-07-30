const usuarioModel = require("../models/usuarioModel");
 
const UsuarioController = {
    cadastrar: (req, res) => {
        const { nome, email, senha } = req.body;
 
        if(!nome || !email || !senha){
            return res.json({ sucesso: false, mensagem: "Preencha todos os campos!"});
        }
 
        usuarioModel.cadastrar(nome, email, senha, (erro) => {
            if(erro){
                console.error("Erro detalhado no banco:", erro);
                return res.json({ sucesso: false, mensagem: "Erro ao cadastrar usuario", detalhe: erro.message });
            }
            res.json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso!" });
        });
    },
    login: (req, res) => {
        const { email, senha } = req.body;
 
        usuarioModel.login(email, senha, (erro, resultado) => {
            if(erro) {
                return res.json({ sucesso: false, mensagem: "Erro no servidor!"});
            }
           
            if (resultado && resultado.length > 0) {
                res.json({
                    sucesso: true,
                    mensagem: "Login realizado com sucesso!",
                    usuario: resultado[0]
                });
            } else {
                res.json({
                    sucesso: false,
                    mensagem: "Email ou senha incorretos"
                });
            }
        });
    }
};

function salvarAvaliacao(req, res){
    const { musica, artista, comentario } = req.body;

    if(!musica || !artista || !comentario){
        return res.status(400).json({
            erro: "Musica, artista e comentario são obrigatórios."
        });
    }

    diversidadeModel.salvarReflexao(nome, resposta, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao salvar reflexão."
            });
        }

        res.status(201).json({
            mensagem: "Reflexão salva com sucesso",
            id: resultado.insertId
        });
    });
}

function listarReflexoes(req, res){
    diversidadeModel.listarReflexoes((erro, resultados) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro a listar reflexões."
            });
        }
        res.json(resultados);
    })
}

function salvarResultado(req, res) {
    const { nome, pontuacao, total_perguntas } = req.body;

    if (!nome || pontuacao == undefined || total_perguntas === undefined) {
        return res.status(400).json({
            erro: "Nome, pontuação e total de perguntas são obrigatorias."
        });
    }

    diversidadeModel.salvarResultado(
        nome,
        pontuacao,
        total_perguntas,
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json({
                    erro: "Erro ao salvar resultado."
                });
            }
        res.status(201).json({
            mensagem: "Resultado salvo com sucesso!",
            id: resultado.insertId
            });
        }
    );
}

function salvarAvaliacao(req, res) {
    diversidadeModel.listarResultados((erro, resultados) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao listar resultados."
            });
        }
        res.json(resultados);
    });
}

function curtirReflexao(req, res){
    const { id } = req.params;
 
    diversidadeModel.curtirReflexao(id, (erro) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao curtir reflexão."
            });
        }
        res.json({
            mensagem: "Reflexão curtida com sucesso!"
         });
    });
}
 
module.exports = {
    salvarAvaliacao,
    listarReflexoes,
    salvarReflexao,
    listarReflexoes,
    curtirReflexao
}


module.exports = UsuarioController;