var express = require('express')
  , io = require('socket.io')
  , redis = require('redis')
  , port = process.argv[2] || 3000
  ;

var app = module.exports = express.createServer()
  , SocketRedisStore = io.RedisStore
  , io = io.listen(app)
  ;

app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'elb websocket test' }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

io.configure(function() {
  io.set('store', new SocketRedisStore());
});

io.sockets.on('connection', function(socket) {
  console.log('connect via', socket.transport);
  socket.on('msg send', function(msg) {
    socket.emit('msg push', msg + ' from ' + process.pid);
  });
});

app.listen(port);

console.log('Express server listening on port %d in %s mode', app.address().port, app.settings.env);
