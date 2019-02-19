import { routerBinding } from './router.js'; 
import * as template from './template.js'; 

const handleRedirect = (path) => {
    path = path.toLowerCase(); 
    const paths = path.split('/'); 
    const collections = Object.keys(template.articles); 
    let isMatch = false;
    
    if(paths.length === 2 || ( paths.length === 3 && paths[2] === '' )) {
        collections.forEach( (collection) => {
            if(paths[1] === collection) {
                isMatch = true; 
                return;                 
            }
        });    
    } else if(paths.length === 3 || ( paths.length === 4 && paths[3] === '' )) {
        collections.forEach( (collection) => {
            if(paths[1] === collection) {
                Object.keys(template.articles[collection]).forEach( (articleKey) => {
                    if(paths[2] === template.articles[collection][articleKey].path) {
                        isMatch = true; 
                    }
                }); 
                return; 
            }
        }); 
    }
    
    gtag('config', 'UA-83547950-4', {'page_path': isMatch ? path : '/'});
    return isMatch; 
}; 
                
window.addEventListener('DOMContentLoaded', () => {
    routerBinding(handleRedirect); 
}); 