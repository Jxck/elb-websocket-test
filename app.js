var express = require('express')
  , io = require('socket.io')
  ;

var app = module.exports = express.createServer()
  , io = io.listen(app);

app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// io.configure(function() {
//   io.set('transports', ['xhr-polling']);
// });

io.sockets.on('connection', function(socket) {
  console.log('connect via', socket.transport);
  socket.on('msg send', function(msg) {
    socket..emit('msg push', msg + ' from ' + process.pid);
  });
});

app.listen(3000);

console.log('Express server listening on port %d in %s mode', app.address().port, app.settings.env);
