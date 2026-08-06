const bntCor = document.getElementById('btn-tema');

btnEnviar.addEventListener("click", async () => {
    const musica = musicaInput.value.trim();
    const artista = artistaInput.value.trim();
    const comentario = comentarioInput.value.trim();
   
    if (!musica || !artista || !comentario) {
      mensagem.innerText = "Preencha todos os campos.";
      mensagem.style.color = "red";
      return;
    }
   
    try {
      const envio = await fetch(`${API}/avaliacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          musica,
          artista,
          comentario
        })
      });
   
      const dados = await envio.json();
   
      mensagem.innerText = dados.mensagem;
      mensagem.style.color = "green";
   
      musicaInput.value = "";
      artistaInput.value = "";
      comentarioInput.value = "";
   
      carregarAvaliacoes();
    } catch (erro) {
      mensagem.innerText = "Erro ao enviar avaliação.";
      mensagem.style.color = "red";
      console.log("Erro ao enviar avaliação:", erro);
    }
  });

  bntCor.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme')

    if (document.body.classList.contains('dark-theme')) {
        bntCor.innerText = '☀️Claro';
    }else{
        bntCor.innerText = '🌙Escuro';
    }
});