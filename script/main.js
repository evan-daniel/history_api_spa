import * as router from '/script/router.js'; 
                
window.addEventListener('popstate', windowPopstate => {
    const state = windowPopstate.state; 



    document.querySelector('.content').innerHTML += state.content; 
}); 
