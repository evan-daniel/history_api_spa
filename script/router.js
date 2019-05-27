import *  as template from '/script/template.js'; 

// State.path keeps track of current path
let state = {}; 
const sendPopstate = () => {
    const popstate = new Event('popstate'); 
    popstate.state = state; 
    window.dispatchEvent(popstate); 
}; 

// Runs on each http request
window.addEventListener('DOMContentLoaded', () => {
    state = confirmPath(window.location.pathname); 
    history.replaceState(state, '', state.path); 
    sendPopstate(); 
}); 

// Event listener for navigation clicks
document.addEventListener('click', function() {

    // Check each element event fires to
    event.composedPath().forEach( element => {
        if(element.tagName === 'A' && element.href) {
            const elementUrl = new URL(element.href);

            // We only care about in-site navigation
            if(elementUrl.origin === window.location.origin) {
                event.preventDefault(); 
                const anchorPath = element.href.slice(window.location.origin.length); 

                // So long as we're not on the page we're directing to… 
                const checkState = confirmPath(anchorPath); 
                if(state.path === checkState.path) return; 
                
                state = checkState; 
                history.pushState(state, '', state.path); 
                sendPopstate(); 
            } 
        }
    }); 
}, true); 

// Event listener for browser back/forwards
window.addEventListener('popstate', function() {
    if(state.path !== window.location.pathname) {
        state.path = window.location.pathname; 
        history.replaceState(state, '', state.path); 
    }
}); 

function confirmPath(path) {

    // Static items
    if(path.charAt(path.length-1) === '/') path = path.slice(0, -1); 
    let pathItems = path.split('/'); 

    // Recursive
    function checkDirectories(page) {

        // All pages expected to have path
        if(page.path === undefined) throw `Template page has no path: ${pathItems}`; 
        
        // Only interested in matches
        if(page.path === pathItems[0]) {
            
            // Whittled it down correctly
            if(pathItems.length === 1 && page.content) return {path: path, static: page.static, content: page.content}; 
            
            // Maybe there are subdirectories to check
            if(page.directories) {
                pathItems.shift(); 
                for(let i = 0; i < page.directories.length; i++) {
                    const subdirectoryPage = checkDirectories(page.directories[i]); 
                    if(subdirectoryPage.path !== '/') return {path: path, static: subdirectoryPage.static, content: subdirectoryPage.content}; 
                }
            }
        } 

        // If the page wasn't found, just go to index
        return {path: '/', static: template.pages.static, content: template.pages.content}; 

    }
    return checkDirectories(template.pages); 
}