var fs = require('fs'),
    http = require('http'),
    httpProxy = require('http-proxy'),

logger = function() {    
  // This will only run once
  var logFile = fs.createWriteStream('./requests.log');

  return function (request, response, next) { 
    // This will run on each request.
    logFile.write(JSON.stringify(request.headers, true, 2));
    next();
  }
}

httpProxy.createServer(
  logger(), // <-- Here is all the magic
  {
    hostnameOnly: true,
    router: {
      'localhost:3001': '127.0.0.1:8001', // server on localhost:8001
      // 'example2.com': '127.0.0.1:8002'  // server 2 on localhost:8002
  }
}).listen(8000);