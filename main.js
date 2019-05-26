import * as router from '/router.js'; 
                
window.addEventListener('popstate', windowPopstate => {
    const state = windowPopstate.state; 



    document.querySelector('.content').innerHTML = state.content; 
}); 
