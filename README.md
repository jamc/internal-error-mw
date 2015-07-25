# Internal Error Middleware

A internal server error middleware for express.

## Usage

```javascript
var express = require('express');
var app = express();
var internalErrorMW = require('internal-error-mw');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(internalErrorMW);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```