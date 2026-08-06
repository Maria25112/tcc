const API = "http://localhost:3000";
 
const musicaInput = document.getElementById("musica");
const artistaInput = document.getElementById("artista");
const comentarioInput = document.getElementById("comentario ");
const btnEnviar = document.getElementById("btn-enviar");
const mensagem = document.getElementById("mensagem");
const avaliacoesContainer = document.getElementById("home-container");
 
// LISTAR AVALIAÇÕES
async function carregarAvaliacoes() {
  try {
    const resposta = await fetch(`${API}/avaliacoes`);
    const avaliacoes = await resposta.json();
 
    avaliacoesContainer.innerHTML = "";
 
    avaliacoes.forEach((avaliacao) => {
      avaliacoesContainer.innerHTML += `
        <div class="card-avaliacao">
          <div>
            <h3>${avaliacao.musica}</h3>
            <h3>${avaliacao.artistaInput}</h3>
            <p>${avaliacao.resposta}</p>
          </div>
 
          <button class="btn btn-curtir" onclick="curtirAvaliacao(${avaliacao.id})">
            ❤️ Curtir <span>${avaliacao.curtidas || 0}</span>
          </button>
        </div>
      `;
    });
  } catch (erro) {
    console.log("Erro ao carregar avaliações:", erro);
  }
}
 
// CURTIR REFLEXÃO
async function curtirAvaliacao(id) {
  try {
    await fetch(`${API}/avaliacoes/${id}/curtir`, {
      method: "PUT"
    });
 
    carregarReflexoes();
  } catch (erro) {
    console.log("Erro ao curtir avaliação:", erro);
  }
}
 
carregarAvaliacoes();
 