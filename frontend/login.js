const formlogin = document.getElementById("formLogin");
const formcadastro = document.getElementById("mensagemLogin");

formCadastro.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeCadastro").value;
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;

    const resposta = await fetch("http://localhost:3000/usuarios/cadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nome, email, senha})
    });
    const resultado = await resposta.json();

    document.getElementById(mensagemCadastro).innerText = resultado.mensagem;
});

formlogin.addEventListener("submit", async function(event){
    event.preventDefault();

    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhalLogin").value;

    const resposta = await fetch("http://localhost:3000/usuarios/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    });

    const resultado = await resposta.json();

    const mensagemLogin = document.getElementById("mensagemLogin");
    mensagemLogin.innerText = resultado.mensagem;

    if (resultado.sucesso) {
        mensagemLogin.style.color = "green"
 
        window.location.href = "home.html"
    } else {
        mensagemLogin.style.color = "red";
    }
});
