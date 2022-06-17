import '../App.css';
import home from '../images/home.svg';
import search from '../images/search.svg';
import playlist from '../images/playlist.svg';
import create from '../images/create.svg';
import fav from '../images/fav.svg';
import Fav from './Fav';
import { useState } from 'react';

const Nav = () => {
   let [openFav, setOpenFav] = useState(false);
   let [pending, setPending] = useState(false)

   const myFunction = () => {
      setPending(true);
      setOpenFav(true);
      setPending(false);
   }

   return (
      <nav class="aside">
         <ul class="tags">
            <li class="tag"> 
               <a href="/" class="aside__link active">
                  <img class="aside__icon" src={home} alt="main" />
                  <span class="aside__title">Главная</span>
               </a>
            </li>
            <li class="tag"> 
               <a href="/" class="aside__link active">
                  <img class="aside__icon" src={search} alt="serach" />
                  <span class="aside__title">Поиск</span>
               </a>
            </li>
            <li class="tag"> 
               <a href="/" class="aside__link active">
                  <img class="aside__icon" src={playlist} alt="playlist" />
                  <span class="aside__title">Моя медиатека</span>
               </a>
            </li>
         </ul>

         <ul class="tags">
            <li class="tag"> 
               <a href="/" class="aside__link active">
                  <img class="aside__icon" src={create} alt="create"/>
                  <span class="aside__title">Создать плейлист</span>
               </a>
            </li>
            <li class="tag"> 
               <a href="/" class="aside__link active">
                  <img class="aside__icon" src={fav} alt="favorite"/>
                  <span class="aside__title" onClick={!pending && (() => { myFunction() })}>Избранное</span>
               </a>
            </li>
         </ul>
         {/* пыталась сделать всплывающее окно с избранными плейлистами */}
         {openFav && <Fav tracklist setOpenFav={setOpenFav} />}
      </nav>
   )
}

export default Nav;