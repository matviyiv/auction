// TODO: move this to AuctionItemModel
var lastBid = 0;
exports.handlers = function(socket) {
  
  socket.on('place_bid', function(data) {

    if (data.value > lastBid) {
      console.log('New bid', data);
      lastBid = data.value;
      socket.emit('update-price', {
        newValue: data.value
      });
      socket.broadcast.emit('update-price', {
        newValue: data.value
      });
    } else {
      console.log('lower');
      socket.emit('update-price', {
        newValue: lastBid + ' Sorry your bid was lower'
      });
    }
  });
}