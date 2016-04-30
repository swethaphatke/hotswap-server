var express = require('express');
var app = express();
var fs = require('fs');

var zipper = require("zip-local");

app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.send('Hello World! Vinay');
});

app.get('/version', function (req, res) {
  res.setHeader('Content-type', 'application/json');
  res.send('{"version": 1.13}');
});

app.get('/update/app.zip', function (req, res) {
  var file = __dirname + '/app.zip';

  zipper.sync.zip("./client").compress().save("app.zip");
  res.setHeader('Content-disposition', 'attachment; filename=app.zip');
  res.setHeader('Content-type', 'application/zip');

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);

  fs.unlink("app.zip");
});

module.exports = app;
module.change_code = true; 