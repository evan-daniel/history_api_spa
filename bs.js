'use strict';

const fs = require("fs"); 
const path = require('path'); 

const content_404 = fs.readFileSync(path.join(__dirname, '404.html'));

const browserSync = require("browser-sync").create();

browserSync.init({
    files: ["**/*"],
    server: {
        baseDir: "./"
    }
}, (err, bs) => {
    bs.addMiddleware("*", (req, res) => {
        res.write(content_404);
        res.end();
    });
});