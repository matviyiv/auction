$(function() {
  var userId = 'user-' + Math.floor((Math.random() * 100) + 1),
      socket = io.connect('http://localhost:8080'),
      auctRoom = $('.auction-room'),
      initHash = location.hash,
      container;

  if (initHash === '') {
    initHash = 'auction';
  }
  container = $('.' + initHash.replace('#/', '')).show();
  container.siblings().hide();
  $('.active').removeClass('active');
  $('a[href="'+ initHash +'"]').parent().addClass('active');

  $(window).on('hashchange', function() {
    var hash = location.hash,
        container = $('.' + hash.replace('#/', ''));
    
    $('.active').removeClass('active');
    $('a[href="'+ hash +'"]').parent().addClass('active');
    container.siblings().hide();
    container.show();
  });

  socket.on('update-price', function(data) {
    var priceContainer = auctRoom.find('.item-price');
    priceContainer.html(data.newValue);
  });

  auctRoom.find('.place-bid').on('click', function(e) {
    var bidInput = auctRoom.find('.bid-value'),
        msgContainer = auctRoom.find('.user-notification');
    socket.emit('place_bid', {
      user: userId,
      value: +bidInput.val(),
      itemId: bidInput.data('item')
    });
    msgContainer.html('Thank you for your bid.');
    e.preventDefault();

    setTimeout(clearUserMsg, 1000);
  });

  function clearUserMsg() {
    var bidInput = auctRoom.find('.bid-value'),
      msgContainer = auctRoom.find('.user-notification');

    msgContainer.empty();
    bidInput.val('');
  }

});