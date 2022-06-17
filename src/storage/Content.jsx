import { useEffect, useState } from 'react';
import { getNewReleases, getTracks } from '../script';
import Window from './Window';
import '../App.css';

const Content = () => {
   let [albums, setNewReleases] = useState([]);
   let [tracklist, setTracklist] = useState([]);
   let [pending, setPending] = useState(false)
   let [openWindow, setOpenWindow] = useState(false);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(async () => {
      let result = await getNewReleases();
      let data = result.albums.items;
      setNewReleases(data);
   }, []);

   const setTracks = async (id) => {
      setPending(true);
      let result = await getTracks(id);
      setTracklist(result);
      setOpenWindow(true);
      setPending(false);
   }

   return (
      <main class="content">
         <h2 class="content__title">Новые треки</h2>
            <div class="content__items">
               {albums.map(item => (
                  <div class="content__item" key={item.id}>
                     <img alt="cover" class="playlist__image"  src={item.images[1].url} onClick={!pending && (() => { setTracks(item.id) })} />
                     <h3 class="playlist__name">{item.name}</h3>
                     <p className="playlist__desc">Количество треков: {item.total_tracks}</p>
                     <p className="playlist__desc">Дата релиза: {item.release_date}</p>
                  </div>
               ))}
            </div>

         {openWindow && <Window tracklist={tracklist} setOpenWindow={setOpenWindow} />}
      </main>
   )
}

export default Content;