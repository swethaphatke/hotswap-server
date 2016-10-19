var express = require('express');
var zipper = require("zip-local");
var fs = require('fs');


var app = express();
app.use(express.static(__dirname));

//routes
app.get('/', function (req, res) {
  res.send('Server running sucessfully');
});

app.get('/version', function (req, res) {
  res.setHeader('Content-type', 'application/json');
  res.send('{"version": 0.7}');
});

app.get('/update/app.zip', function (req, res) {
  var file = __dirname + '/app.zip';//fully qualified path name of zip file

  zipper.sync.zip("./client").compress().save("app.zip");
  res.setHeader('Content-disposition', 'attachment; filename=app.zip');
  res.setHeader('Content-type', 'application/zip');

  var filestream = fs.createReadStream(file);//read from disk to memory of server(RAM)
  filestream.pipe(res);//via ram from disk to client

  fs.unlink("app.zip");//deletes file from server
});
module.change_code = 1;
module.exports = app;
// module.change_code = true;
