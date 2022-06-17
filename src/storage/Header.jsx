import '../App.css';
import icon from '../images/icon.png'

const Header = () => {
   return (
      <header class="header">
        <a href="/" class="header__logo link" >
            <img src={icon} alt="Лого" width={32} height={32}/>
            <h1 class="header__title">Spotify App</h1>
        </a>

        <nav class="header__nav">
            <a href="/" class="link">Подписка</a>
            <a href="/" class="link">Профиль</a>
        </nav>
      </header>
   )
}

export default Header;