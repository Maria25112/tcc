const API = "http://localhost:3000";

const avaliacoesContainer = document.getElementById("home-container");

// Gera as estrelas com base na nota
function gerarEstrelas(nota) {
    return "⭐".repeat(nota) + "☆".repeat(5 - nota);
}

// LISTAR AVALIAÇÕES
async function carregarAvaliacoes() {
    try {
        const resposta = await fetch(`${API}/usuarios/avaliacoes`);
        const dados = await resposta.json();

        avaliacoesContainer.innerHTML = "";

        if (!dados.sucesso || dados.avaliacoes.length === 0) {
            avaliacoesContainer.innerHTML = "<p>Nenhuma avaliação encontrada ainda.</p>";
            return;
        }

        dados.avaliacoes.forEach((avaliacao) => {
            avaliacoesContainer.innerHTML += `
                <div class="card-avaliacao">
                    <h3>${avaliacao.musica}</h3>
                    <p><strong>Artista:</strong> ${avaliacao.artista}</p>
                    <p>${avaliacao.comentario}</p>
                    <p>${gerarEstrelas(avaliacao.nota)}</p>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro ao carregar avaliações:", erro);
        avaliacoesContainer.innerHTML = "<p>Erro ao carregar avaliações. Verifique se o servidor está rodando.</p>";
    }
}

carregarAvaliacoes()
