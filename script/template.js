export const pages = {
    path: '', 
    content: `<a href="/numbers">numbers</a> 
<a>and</a> 
<a href="/mathematics">mathematics</a>
<a>sign in/up to save games</a>
<a>game history</a>`, 
    directories: [
        {
            path: 'numbers', 
            content: `<canvas></canvas>
<div class="feedback">This is sample content.</div>`, 
        }, {
            path: 'mathematics', 
            content: 'Mathematics, here: eventually.'
        }
    ]
}; 