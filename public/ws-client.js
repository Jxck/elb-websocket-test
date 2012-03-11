// Client
var host = location.host.split(':')[0]
  , port = 4000
  ;
var ws = new WebSocket('ws://' + host + ':' + port);
function dispay(message) {
  document.getElementById('console').innerText += message + '\n';
};
ws.onopen = function() {
  dispay('connect via ' + 'websocket(ws)');
  ws.send('hello');
  ws.onmessage = function(ev) {
    dispay(ev.data);
  };

  ws.onclose = function() {
    dispay('disconnect');
  };
};
