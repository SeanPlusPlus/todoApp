var express = require('express');
var app = express();

app.get('/api', function (req, res) {
  res.send({
    message: 'Hello World!',
  });
});

app.listen(3333, function () {
  console.log('Example app listening on port 3333!')
});
