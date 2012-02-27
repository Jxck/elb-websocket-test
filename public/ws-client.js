// Client
var ws = new WebSocket('ws://localhost:4000');
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
