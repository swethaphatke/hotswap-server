var fs = require('fs');
var hotswap = require('hotswap');
var app = require('./server.js');

var server = app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
});


hotswap.configure({
        extensions: { '.js': ['js', 'jsx'], '.coffee': 'coffee' },
        watch: true,
        autoreload: true,
});

hotswap.on('swap', function () {
        server.close();
        server = app.listen(3000, function () {
                test = app;
                console.log('Example app listening on port 3000!');
        });
});

hotswap.on('change', function () {
        server.close();
        server = app.listen(3000, function () {
                test = app;
                console.log('Example app listening on port 3000!');
        });
});