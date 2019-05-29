import '/script/router.js'; 
import '/script/hotreload.js'; 
                
window.addEventListener('popstate', windowPopstate => {
    const state = windowPopstate.state; 

    document.querySelector('.content').innerHTML += state.content; 
}); 