var fs = require('fs');//file system
var hotswap = require('hotswap');
var app = require('./server.js');

var server = app.listen(3000, function () {
        console.log('App listening on port 3000!');
}); //server starts

hotswap.configure({
        extensions: { '.js': ['js']},
        watch: true,
        autoreload: true,
});

hotswap.on('change', function () {
        server.close();
        server = app.listen(3000, function () {
                test = app;
                console.log('App listening on port 3000!');
        });
});
