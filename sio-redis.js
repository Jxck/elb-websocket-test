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

var redis_host = 'ec2-54-248-6-157.ap-northeast-1.compute.amazonaws.com'
  , redis_port = 6379;
io.configure(function() {
  io.set('store', new SocketRedisStore({
    redisPub: redis.createClient(redis_port, redis_host),
    redisSub: redis.createClient(redis_port, redis_host),
    redisClient: redis.createClient(redis_port, redis_host)
  });
});

io.sockets.on('connection', function(socket) {
  console.log('connect via', socket.transport);
  socket.on('msg send', function(msg) {
    socket.emit('msg push', msg + ' from ' + process.pid);
  });
});

app.listen(port);

console.log('Express server listening on port %d in %s mode', app.address().port, app.settings.env);
