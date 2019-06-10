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
    const handler = window[`handle_${state.list[state.list.length-1]}`]; 
    if(handler) handler.call(state); 
}); 

window.handle_numbers = async (state) => {
    const numbers = await import('/script/numbers.js'); 
    numbers.init(); 
    
    const app = document.querySelector('.numbers'); 
    const feedback = app.querySelector('.feedback'); 
}