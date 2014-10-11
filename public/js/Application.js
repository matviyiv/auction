$(function() {
  var userId = 'user-' + Math.floor((Math.random() * 100) + 1),
      socket = io.connect('http://localhost:8080'),
      auctRoom = $('.auction-room'),
      navigation = $('.navigation'),
      container;

  // handle navigation
  changeActiveTab();
  $(window).on('hashchange', changeActiveTab);

  socket.on('update-price', function(data) {
    var priceContainer = auctRoom.find('.item-price');
    priceContainer.html('$' + data.newValue);
  });

  auctRoom.find('.place-bid').on('click', function(e) {
    var bidInput = auctRoom.find('.bid-value'),
        msgContainer = auctRoom.find('.user-notification');

    // notify everyone about new bid
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

  function changeActiveTab() {
    var hash = location.hash || '#/auction',
        container = $('.' + hash.replace('#/', ''));
    
    navigation.find('.active').removeClass('active');
    navigation.find('a[href="'+ hash +'"]').parent().addClass('active');
    container.siblings().hide();
    container.show();
  }

});