// Client
var socket = io.connect();
function dispay(message) {
  document.getElementById('console').innerText += message + '\n';
};
socket.on('connect', function() {
  dispay('connect via ' + socket.socket.transport.name);
  socket.emit('msg send', 'hello');
  socket.on('msg push', function (message) {
    dispay(message);
  });

  socket.on('disconnect', function(){
    dispay('connect');
  });
});

