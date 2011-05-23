YUI().use('node', 'node-event-delegate', 'event-move', 'transition', function(Y) {
  var panorama = Y.one('.Panorama'),
    panoramaItems = Y.all('.Panorama .Item'),
    panoramaItemsCount = panoramaItems._nodes.length,
    winWidth = Y.DOM.winWidth(),
    itemWidth = winWidth * .8,
    MIN_SWIPE = 10;

  panorama.setStyle('width', itemWidth * panoramaItemsCount + 20);
  panoramaItems.setStyle('width', itemWidth);

  /*
  panoramaItems.setStyle('height', Y.DOM.winHeight() - 98);
  */

  panorama.on("gesturemovestart", function(e) {
    var item = e.currentTarget,
        target = e.target,
        container = e.container;

 
    item.setData("swipeStart", e.pageX);
 
    item.once("gesturemoveend", function(e) {
        var swipeStart = item.getData("swipeStart"),
            swipeEnd = e.pageX,
            isSwipeLeft = (swipeStart - swipeEnd) > MIN_SWIPE,
            isSwipeRight = (swipeEnd - swipeStart ) > MIN_SWIPE;
 
        if (isSwipeLeft) {
          panorama.setX(panorama.getX() - itemWidth);
        } else if (isSwipeRight) {
          panorama.setX(panorama.getX() + itemWidth);
        }
 
    });
  });

});
YUI().use('scrollview', function(Y) {
  var scrollView = new Y.ScrollView({
    srcNode: ".Panorama .Item",
    height: Y.DOM.winHeight() - 98
  });
  scrollView.render();
});
