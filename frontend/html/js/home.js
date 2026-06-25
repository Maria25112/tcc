const API = "http://localhost:3000";
 
const nomeInput = document.getElementById("nome");
const respostaInput = document.getElementById("resposta");
const btnEnviar = document.getElementById("btn-enviar");
const mensagem = document.getElementById("mensagem");
const avaliacoesContainer = document.getElementById("home-container");
 
// LISTAR REFLEXÕES
async function carregarAvaliacoes() {
  try {
    const resposta = await fetch(`${API}/reflexoes`);
    const reflexoes = await resposta.json();
 
    avaliacoesContainer.innerHTML = "";
 
    reflexoes.forEach((reflexao) => {
      reflexoesContainer.innerHTML += `
        <div class="card-reflexao">
          <div>
            <h3>${reflexao.nome}</h3>
            <p>${reflexao.resposta}</p>
          </div>
 
          <button class="btn btn-curtir" onclick="curtirReflexao(${reflexao.id})">
            ❤️ Curtir <span>${reflexao.curtidas || 0}</span>
          </button>
        </div>
      `;
    });
  } catch (erro) {
    console.log("Erro ao carregar reflexões:", erro);
  }
}
 
// SALVAR REFLEXÃO
btnEnviar.addEventListener("click", async () => {
  const nome = nomeInput.value.trim();
  const resposta = respostaInput.value.trim();
 
  if (!nome || !resposta) {
    mensagem.innerText = "Preencha todos os campos.";
    mensagem.style.color = "red";
    return;
  }
 
  try {
    const envio = await fetch(`${API}/reflexoes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        resposta
      })
    });
 
    const dados = await envio.json();
 
    mensagem.innerText = dados.mensagem;
    mensagem.style.color = "green";
 
    nomeInput.value = "";
    respostaInput.value = "";
 
    carregarReflexoes();
  } catch (erro) {
    mensagem.innerText = "Erro ao enviar reflexão.";
    mensagem.style.color = "red";
    console.log("Erro ao enviar reflexão:", erro);
  }
});
 
// CURTIR REFLEXÃO
async function curtirReflexao(id) {
  try {
    await fetch(`${API}/reflexoes/${id}/curtir`, {
      method: "PUT"
    });
 
    carregarReflexoes();
  } catch (erro) {
    console.log("Erro ao curtir reflexão:", erro);
  }
}
 
carregarReflexoes();
 