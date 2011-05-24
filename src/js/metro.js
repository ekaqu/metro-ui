YUI().use('node','event-flick', 'transition', function(Y) {
  var panorama = Y.one('.Panorama'),
    items = panorama.all('.Item'),
    itemWidth = Number(items.item(0).getComputedStyle('width').replace('px', '')),
    moveLeft = { 
      left: { 
        duration: 0.5, 
        easing: 'ease-in', 
        value: function(item) {
          var x = Number(item.getStyle('left').replace('px', '')),
            newX = Number(x - itemWidth) + "px"; 
          return newX;
        }
      },
    },
    moveRight = {
      left: {
          duration: 0.5,
          easing: 'ease-in',
          value: function(item) {
          var x = Number(item.getStyle('left').replace('px', '')),
              newX = Number(x + itemWidth) + "px"; 
            return newX;
          }
      },
    }

  var swapItem = function(left) {
    if(left) {
      Y.log('swype left');
      items.transition(moveLeft);
    } else {
      Y.log('swype right');
      items.transition(moveRight);
    }
  };
  panorama.on('flick', function(e) {
    var distance = e.flick.distance;
    swapItem(distance < 0);
  }, { minDistance: 80, minVelocity: 0.2, preventDefault: false, axis: 'x' });

  items.setStyles({ 'position': 'relative', 'left': '0' });
});
