const containerVideos = document.querySelector('.videos__container');


async function searchAndShowVideos() {
  try{
  const api = await fetch('http://localhost:3000/videos');
  const videos = await api.json();
    videos.forEach((video)=> {
      if (video.categoria == '') {
        throw new Error('Vídeo não tem categoria')
      }
      containerVideos.innerHTML += `
        <li class="videos__item">
          <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
          <div class="descricao-video">
            <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
            <h3 class="titulo-video">${video.titulo}</h3>
            <p class="titulo-canal">${video.descricao}</p>
            <p class="categoria" hidden>${video.categoria}</p>
          </div>
        </li>
    `;
  })
} catch(error) {
  containerVideos.innerHTML = `
    <p>Houve um erro ao carregar os videos: ${error}
  `
}}
searchAndShowVideos();

const searchBar = document.querySelector('.pesquisar__input');
searchBar.addEventListener('input', searchFilter);

function searchFilter() {
  const videos = document.querySelectorAll('.videos__item');

  if(searchBar.value != '') {
    for(let video of videos) {
      let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
      let filterValue = searchBar.value.toLowerCase();
      if (!titulo.includes(filterValue)) {
        video.style.display = 'none';
      } else {
        video.style.display = 'block';
      }
    }
  } else {
    videos.style.display = 'block'
  }
}

const categoryBtn = document.querySelectorAll('.superior__item');

categoryBtn.forEach((button) => {
  let categoryName = button.getAttribute("name");
  button.addEventListener('click', () => filterByCategory(categoryName))
})

function filterByCategory(filter) {
  const videos = document.querySelectorAll('.videos__item');
  for(let video of videos) {
      let categoria = video.querySelector(".categoria").textContent.toLowerCase();
      let filterValue = filter.toLowerCase();

      if (!categoria.includes(filterValue) && filterValue != 'tudo') {
        video.style.display = 'none';
      } else {
        video.style.display = 'block';
      }
  }
}