export let routerBinding = (handleRedirect) => {
    const state = {}; 

    // Browser load
    (function() {
        state.path = handleRedirect(window.location.pathname) ? window.location.pathname : '/'; 
        history.replaceState(state, '', state.path); 
    })(); 
    
    // Anchors
    document.addEventListener('click', function() {
        event.composedPath().forEach( element => {
            if(element.tagName === 'A' && element.href) {
                event.preventDefault(); 
                
                const anchorPath = element.href.slice(window.location.origin.length); 

                if (state.path !== anchorPath) {
                    state.path = handleRedirect(anchorPath) ? anchorPath : '/'; 
                    history.pushState(state, '', state.path); 
                }
            }
        }); 
    }, true); 
    
    // Browser back/forwards
    window.addEventListener('popstate', function() {
        if(state.path !== window.location.pathname && handleRedirect(window.location.pathname)) {
            state.path = window.location.pathname; 
            history.replaceState(state, '', state.path); 
        }
    }); 
}; 