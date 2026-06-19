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
 
module.exports = UsuarioController;