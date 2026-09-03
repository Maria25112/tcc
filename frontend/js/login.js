const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");
const caixaLogin = document.getElementById("caixaLogin");
const caixaCadastro = document.getElementById("caixaCadastro");
const linkIrCadastro = document.getElementById("linkIrCadastro");
const linkIrLogin = document.getElementById("linkIrLogin");

// Envio do formulário de cadastro de usuário
formCadastro.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeCadastro").value.trim();
    const email = document.getElementById("emailCadastro").value.trim();
    const senha = document.getElementById("senhaCadastro").value;
    const mensagemCadastro = document.getElementById("mensagemCadastro");

    try {
        const resposta = await fetch("http://localhost:3000/usuarios/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha })
        });

        const resultado = await resposta.json();
        mensagemCadastro.innerText = resultado.mensagem;

        if (resultado.sucesso) {
            mensagemCadastro.style.color = "green";
            formCadastro.reset();
        } else {
            mensagemCadastro.style.color = "red";
        }
    } catch (erro) {
        console.error("Erro no cadastro:", erro);
        mensagemCadastro.innerText = "Erro ao conectar com o servidor.";
        mensagemCadastro.style.color = "red";
    }
});

// Envio do formulário de login de usuário
formLogin.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value;
    const mensagemLogin = document.getElementById("mensagemLogin");

    try {
        const resposta = await fetch("http://localhost:3000/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        const resultado = await resposta.json();
        mensagemLogin.innerText = resultado.mensagem;

        if (resultado.sucesso) {
            mensagemLogin.style.color = "green";
            window.location.href = "home.html";
        } else {
            mensagemLogin.style.color = "red";
        }
    } catch (erro) {
        console.error("Erro no login:", erro);
        mensagemLogin.innerText = "Erro ao conectar com o servidor.";
        mensagemLogin.style.color = "red";
    }
});

// Alterna a exibição para a caixa de cadastro
linkIrCadastro.addEventListener("click", function(event) {
    event.preventDefault();
    caixaLogin.style.display = "none";
    caixaCadastro.style.display = "block";
});

// Alterna a exibição para a caixa de login
linkIrLogin.addEventListener("click", function(event) {
    event.preventDefault();
    caixaCadastro.style.display = "none";
    caixaLogin.style.display = "block";
});
