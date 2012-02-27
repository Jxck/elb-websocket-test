var express = require('express')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 4000 });
  ;

var app = module.exports = express.createServer();

app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

wss.on('connection', function(ws) {
  console.log('connected');
  ws.on('message', function(msg) {
    ws.send(msg + ' from ' + process.pid);
  });
});

app.listen(3000);

console.log('Express server listening on port %d in %s mode', app.address().port, app.settings.env);
