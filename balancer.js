var http = require('http')
  , httpProxy = require('http-proxy')
  ;

var addresses = [
    { host: 'localhost', port: 3000 }
  , { host: 'localhost', port: 3001 }
  , { host: 'localhost', port: 3002 }
];

function getTarget(index) {
  index = index || Math.floor(Math.random() * 3);
  var target = addresses[index];
  return { host: target.host, port: target.port };
}

var server = http.createServer(function(req, res) {
  // var proxy = new httpProxy.HttpProxy({ target: getTarget() });
  var proxy = new httpProxy.HttpProxy({ target: addresses[0] });
  proxy.proxyRequest(req, res);
});

server.on('upgrade', function(req, socket, head) {
  // var proxy = new httpProxy.HttpProxy({ target: getTarget() });
  var proxy = new httpProxy.HttpProxy({ target: addresses[1] });
  proxy.proxyWebSocketRequest(req, socket, head);
});

server.listen(4000);
