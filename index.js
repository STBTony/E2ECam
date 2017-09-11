var express = require("express");
var app = new express();
var http = require  ('http').Server(app);
var io = require("socket.io")(http);

var port = process.env.PORT || 8081;


app.use(express.static(__dirname + '/public'));

app.get('/',function(req, res) {
    res.redirect('index.html');
});

io.on('connection',function (socket) {
    socket.on('stream',function (packet) {
        console.log('streaming packet @ ' + new Date().toISOString());
        socket.broadcast.emit('stream', packet);
    });
});

http.listen(port,function() {
    console.log(port);
});
