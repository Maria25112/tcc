const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");
 
// Capturando os elementos que vamos manipular
const caixaLogin = document.getElementById("caixaLogin");
const caixaCadastro = document.getElementById("caixaCadastro");
const linkIrCadastro = document.getElementById("linkIrCadastro");
const linkIrLogin = document.getElementById("linkIrLogin");
 
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
        body: JSON.stringify({ nome, email, senha })
    });
 
    const resultado = await resposta.json();
 
    document.getElementById("mensagemCadastro").innerText = resultado.mensagem;
});
 
formLogin.addEventListener("submit", async function(event) {
    event.preventDefault();
 
    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;
 
    const resposta = await fetch("http://localhost:3000/usuarios/login", {
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
        mensagemLogin.style.color = "green";
 
        //redireciona para pagina home do site
        window.location.href = "home.html";
    } else {
        mensagemLogin.style.color = "red";
    }
});
 
// Quando clicar em "Cadastre-se aqui"
linkIrCadastro.addEventListener("click", function(event) {
    event.preventDefault(); // Evita que a página recarregue ao clicar no link
    caixaLogin.style.display = "none";     // Esconde o login
    caixaCadastro.style.display = "block"; // Mostra o cadastro
});
 
// Quando clicar em "Faça login"
linkIrLogin.addEventListener("click", function(event) {
    event.preventDefault();
    caixaCadastro.style.display = "none";  // Esconde o cadastro
    caixaLogin.style.display = "block";    // Mostra o login
});
 