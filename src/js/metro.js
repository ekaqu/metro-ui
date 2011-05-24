YUI().use('node','event-flick', 'transition', function(Y) {
  var panorama = Y.one('.Panorama'),
    items = panorama.all('.Item'),
    itemWidth = Number(items.item(0).getComputedStyle('width').replace('px', ''));

  var mover = function(direction) {
    return {
      left: {
        duration: 0.5,
        easing: 'ease-in-out',
        value: function(item) {
          var x = Number(item.getStyle('left').replace('px', '')),
              newX = (direction === "left")? Number(x - itemWidth) + "px" : Number(x + itemWidth) + "px"; 
          Y.log(x);
          Y.log(newX);
            return newX;
        }
      }
    }
  }
  var moveLeft = mover("left"),
    moveRight = mover("right");

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
  }, { minDistance: 80, minVelocity: 0.2, preventDefault: false /* if set to true crashes on android */, axis: 'x' });

  items.setStyles({ 'position': 'relative', 'left': '0' });
});
