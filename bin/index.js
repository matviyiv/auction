#!/usr/bin/env node
var app = require('../app'),
    socketRouter = require('../routes/socket'),
    server, io;

app.set('hostname', 'localhost');
app.set('port', 8080);

server = app.listen(app.get('port'), app.get('hostname'), function() {
  console.log('Express server started on port ' + server.address().address + ':' + server.address().port);
});

io = require('socket.io').listen(server);
io.on('connection', socketRouter.handlers);
