const Window = (props) => {
   const closeWindow = (e) => {
      e.preventDefault();
      props.setOpenWindow(false)
   }

   return (
      <div class="window">
         <div class="window__body">
            <div class="window__content">
               <ul class="window__ul">
                  {props.tracklist.map(item => (
                     <li key={item.id} class='window__item'>{item.name}</li>
                  ))}
               </ul>
               <a href="/" class="window__close" onClick={(e) => { closeWindow(e) }}>X</a>
            </div>
         </div>
      </div>
   )
}

export default Window;