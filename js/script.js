const albumCover = document.getElementById('albumCover');
const buscaArtista = document.getElementById('buscaArtistas');
/*const respostas = document.getElementById('respostas');*/

const fetchApi = async (album) => {
  const resposta = await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${album}`
  );
  return resposta.json();
};

const fetchTracks = async (albumId) => {
  const resposta = await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${albumId}/tracks`
  );
  return resposta.json();
};

const cardAlbum = async (album) => {
  const tracks = await fetchTracks(album.id);

  return `
    <div class="card">
      <img src="${album.cover_medium}" alt="${album.title}">
      <h3>${album.title}</h3>
    </div>
    <div class="faixas">
      ${tracks.data
        .map((faixa) => `<input type="text" class="faixa" value="${faixa.title}">`)
        .join("")}
    </div>
  `;
};

buscaArtista.addEventListener('input', async () => {
  const album = buscaArtista.value.toLowerCase().trim();

  if (!album) {
    albumCover.innerHTML = ""; // limpa se vazio
    return;
  }

  try {
    const resposta = await fetchApi(album);
    console.log(resposta);

    if (resposta.data.length > 0) {
      albumCover.innerHTML = await cardAlbum(resposta.data[0]);
    } else {
      albumCover.innerHTML = `<div id="mensagemerro"><p>Artista não encontrado</p></div>`;
    }
  } catch (error) {
    console.error(error);
    albumCover.innerHTML = `<div id="mensagemerro"><p>Erro ao buscar artista</p></div>`;
  }
});




