const client_id = '23af14549f384b6b87c24b7de737d30b';
const client_secret = '04eabed74c6a4ba0acd59d337669292a';

const errorMessage = (error) => {
   document.querySelector('.window').classList.add('open');
   document.querySelector('.window__list').insertAdjacentHTML('beforeend', `<li class='window__item'>${error.message}</li>`)

}

//fetch запрос
const fetchTemplate = async (url) => {
   let token = await getToken();
   const result = await fetch(`https://api.spotify.com/v1/` + url, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      }
   })
   if (result.ok) {
      const data = await result.json();
      return data
   }
   
   switch(result.status){
      case "401":
         throw new Error
               ("Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user.");
      case "403":
         throw new Error
                  ("Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here.");
      case "404":
         throw new Error("There's no data. Try to reload page.");
      default: 
         throw new Error("Something went wrong");
   }
}

//получаем токен
const getToken = async () => {
   const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
   });

   const data = await result.json();
   return data.access_token;
}

//получаем релизы
const getNewReleases = async () => {

   try {
      const limit = 12;
      const url = `browse/new-releases?limit=${limit}`;

      return await fetchTemplate(url);
   }

   catch (e) {
      errorMessage(e);
   }
}

//получаем треки
const getTracks = async (id) => {

   try {
      const url = `albums/${id}/tracks`;

      let data = await fetchTemplate(url);
      return data.items;
   }

   catch (e) {
      errorMessage(e);
   }
}

//генерим новые релизы
const createNewReleases = async () => {

   let data = await getNewReleases();
   let playlists = document.querySelector('.content__new > .content__playlists');

   for (let i = 0; i < data.albums.items.length; i++) {
      playlists.insertAdjacentHTML('beforeend', `
         <div class="content__item">
            <img src='${data.albums.items[i].images[1].url}' data-id='${data.albums.items[i].id}' class="playlist-image">
            <div class="playlist-play">
               <img src="./images/play.svg" alt="" class="play">
            </div>     
            <h3 class="playlist-title">${data.albums.items[i].name}</h3>
            <p class="playlist-description">Количество треков: ${data.albums.items[i].total_tracks}</p>
            <p class="playlist-description">Дата релиза: ${data.albums.items[i].release_date}</p>
         </div>`
      )
   }
}

document.querySelector('.content__playlists').addEventListener('click', async (event) => {
   if (event.target.className === 'playlist-image') {
      let id = event.target.dataset.id
      let tracktlist = await getTracks(id)
      document.querySelector('.window').classList.add('open')
      for (let i = 0; i < tracktlist.length; i++) {
         document.querySelector('.window__list').insertAdjacentHTML('beforeend', `<li class='window__item'>${tracktlist[i].name}</li>`)
      }
   }
})

document.querySelector('.window__close').addEventListener('click', (e) => {
   e.preventDefault()
   document.querySelector('.window').classList.remove('open')
   document.querySelectorAll('.window__item').forEach(e => e.remove())

})

createNewReleases()