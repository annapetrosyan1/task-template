const Fav = (props) => {
    const closeWindow = (e) => {
       e.preventDefault();
       props.setOpenWindow(false)
    }
 
    return (
       <div class="favorite">
          <div class="favorite__body">
             <div class="favorite__content">
                <h3 class="text">Список любимых треков пуст. Добавьте треки</h3>
                <a href="/" class="window__close" onClick={(e) => { closeWindow(e) }}>X</a>
             </div>
          </div>
       </div>
    )
}

export default Fav;