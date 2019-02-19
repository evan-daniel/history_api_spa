export let routerBinding = (handleRedirect) => {
    (function() {
        let href = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');  
        handleRedirect(window.location.pathname) ? href += window.location.pathname : href += '/'; 
        history.replaceState(null, '', href); 
    })(); 
    
    document.addEventListener('click', function() {
        if(event.target.tagName === 'A' && event.target.href) {
            event.preventDefault(); 
            let baseHref = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
            if(handleRedirect(event.target.href.slice(baseHref.length))) {
                history.pushState(null, '', event.target.href); 
            }
            else history.pushState(null, '', baseHref); 
        }
    }); 
    
    window.addEventListener('popstate', function() {
        if(handleRedirect(window.location.pathname)) history.replaceState(null, '', window.location.href); 
    }); 
}; 