import *  as template from '/template.js'; 

// State.path keeps track of current path
const state = {}; 

// Runs on each http request (load the appropriate content and replace history state)
state.path = pathState(window.location.pathname) ? window.location.pathname : '/'; 
history.replaceState(state, '', state.path); 

// Event listener for navigation clicks (load the appropriate content and replace history state)
document.addEventListener('click', function() {
    event.composedPath().forEach( element => {
        if(element.tagName === 'A' && element.href) {
            const elementUrl = new URL(element.href);
            if(elementUrl.origin === window.location.origin) {
                event.preventDefault(); 
                const anchorPath = element.href.slice(window.location.origin.length); 

                if (state.path !== anchorPath) {
                    state.path = pathState(anchorPath) ? anchorPath : '/'; 
                    history.pushState(state, '', state.path); 
                }
            } 
        }
    }); 
}, true); 

// Event listener for browser back/forwards (load the appropriate content and replace history state)
window.addEventListener('popstate', function() {
    if(state.path !== window.location.pathname && pathState(window.location.pathname)) {
        state.path = window.location.pathname; 
        history.replaceState(state, '', state.path); 
    }
}); 

function pathState(path) {
    console.log(path); 
    Object.entries(template.pages).forEach(page => {
        console.log(page[0]); 
        console.log(page[1]); 
    }); 
}