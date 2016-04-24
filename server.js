var express = require('express');
var app = express();
var fs = require('fs');

var EasyZip = require('easy-zip').EasyZip;

app.use(express.static(__dirname));
app.get('/', function (req, res) {
  // res.sendfile(__dirname + '/index.html');
  res.send('Hello World! Vinay');
});

app.get('/version', function (req, res) {
  res.setHeader('Content-type', 'application/json');
  res.send('{"version": 2}');
});

app.get('/update/app.zip', function (req, res) {

  var zip5 = new EasyZip();
  zip5.zipFolder('client', function () {
    zip5.writeToFile('app.zip');
    var file = __dirname + '/app.zip';

    res.setHeader('Content-disposition', 'attachment; filename=app.zip');
    res.setHeader('Content-type', 'application/zip');

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
  });

});

module.exports = app;
module.change_code = true; 