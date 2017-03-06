var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var POST = 3000;


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket) {
  console.log('%s さんが接続しました。', socket.id);

  var channel = 'channel-a';

  socket.broadcast.emit('message', socket.id + 'さんが入室しました！', 'system');

  socket.join(channel);

  socket.on('message', function(msj) {
    io.sockets.in(channel).emit('message', msj, socket.id);
  });

  socket.on('disconnect', function(e) {
    console.log('%s さんが退室しました。', socket.id);
  });

  socket.on('change channel', function(newChannel) {
    socket.leave(channel);
    socket.join(newChannel);
    channel = newChannel;
    socket.emit('change channel', newChannel);
  });
});

http.listen(POST, function() {
  console.log('接続開始：ポート番号',POST);
});
