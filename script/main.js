import '/script/router.js'; 
import '/script/hotreload.js'; 
                
window.addEventListener('popstate', windowPopstate => {
    const state = windowPopstate.state; 
    console.log(state); 
    const app = document.querySelector('#app'); 
    app.className = ''; 
    state.list.forEach(pathElement => app.classList.add(pathElement)); 
    console.log(app); 

    document.querySelector('#app').innerHTML = state.content; 
}); 