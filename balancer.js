var http = require('http')
  , httpProxy = require('http-proxy')
  ;

var addresses = [
  , { host: 'ec2-176-34-15-95.ap-northeast-1.compute.amazonaws.com', port: 3000 }
  , { host: 'ec2-54-248-1-8.ap-northeast-1.compute.amazonaws.com', port: 3000 }
  , { host: 'ec2-176-34-16-173.ap-northeast-1.compute.amazonaws.com', port: 3000 }
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
