var val = 0;
exports.handlers = function(socket) {
  
  socket.on('place_bid', function(data) {
    console.log('New bid', data);
    if (data.value > val) {
      console.log('New bid', data);
      val = data.value;
      socket.emit('update-price', {
        newValue: '$' + data.value
      });
      socket.broadcast.emit('update-price', {
        newValue: data.value
      });
    } else {
      console.log('lower');
      socket.emit('update-price', {
        newValue: '$' + val + ' Sorry your bid was lower'
      });
    }
  });
}