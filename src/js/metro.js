YUI().use('node','event-flick', 'transition', 'scrollview', function(Y) {
  var panorama = Y.one('.Panorama'),
    title = panorama.one('.Title'),
    titleWidth = Number(title.getComputedStyle('width').replace('px','')),
    items = panorama.all('.Item'),
    itemsCount = items._nodes.length,
    itemWidth = Number(items.item(0).getComputedStyle('width').replace('px', ''));

  var mover = function(cfb) {
    var direction = cfb.direction,
      title = cfb.title;
    return {
      left: {
        duration: 0.5,
        easing: 'ease-in-out',
        value: function(item) {
          var x = Number(item.getStyle('left').replace('px', '')),
              newX;
          if(title) {
            newX = (direction === "left")? Number(x - titleWidth / itemsCount) + "px" : Number(x + titleWidth / itemsCount) + "px"; 
          } else {
            newX = (direction === "left")? Number(x - itemWidth) + "px" : Number(x + itemWidth) + "px"; 
          }
          Y.log(x);
          Y.log(newX);
            return newX;
        }
      }
    }
  }
  var moveLeft = mover({direction: "left"}),
    moveRight = mover({direction: "right"}),
    moveTitleLeft = mover({direction: "left", title: true}),
    moveTitleRight = mover({direction: "right", title: true});

  var swapItem = function(left) {
    if(left) {
      Y.log('swype left');
      items.transition(moveLeft);
      title.transition(moveTitleLeft);
    } else {
      Y.log('swype right');
      items.transition(moveRight);
      title.transition(moveTitleRight);
    }
  };
  panorama.on('flick', function(e) {
    var distance = e.flick.distance;
    swapItem(distance < 0);
  }, { minDistance: 80, minVelocity: 0.2, preventDefault: false /* if set to true crashes on android */, axis: 'x' });

  items.setStyles({ 'position': 'relative', 'left': '0' });
  title.setStyles({ 'position': 'relative', 'left': '0' });

  items.each(function(item) {
    new Y.ScrollView({
      srcNode: item,
      height: 200
    }).render();
  });
});
