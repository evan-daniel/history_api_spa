export const pages = [
    
    // Subdirectory with it's own landing page
    {
        path: '/landing', 
        static: {
            title: 'Landing', 
            description: 'This subdirectory has a landing page.', 
        }, 
        content: 'Sample landing subdirectory content.', 
        directories: [{
                path: '/landing-sample-one', 
                content: 'Landing sample one.', 
            }, {
                path: '/non-landing-subdirectory', 
                directories: [
                    {
                        path: '/non-landing-in-landing-sample-one', 
                        content: 'Non-landing in landing sample one.', 
                    }
                ]
            }
        ]
    }, 
    
    // Subdirectory without it's own landing page
    {
        path: '/non-landing-subdirectory', 
        directories: [
            {
                path: '/non-landing-subdirectory-sample-one', 
                content: 'Non-landing sample content the first.', 
            }, 
            {
                path: '/non-landing-subdirectory-sample-two', 
                content: 'Non-landing sample content the second.', 
            }, 
        ], 
    }, 

    // Article with no subdirectory
    {
        path: '/', 
        content: 'Sample content '
    }, 

]; 