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

  panorama.on("gesturemovestart", function(e) {
    var item = e.currentTarget,
        target = e.target,
        container = e.container;

 
    item.setData("swipeStart", e.pageX);
 
    item.once("gesturemoveend", function(e) {
        var swipeStart = item.getData("swipeStart"),
            swipeEnd = e.pageX,
            isSwipeLeft = (swipeStart - swipeEnd) > MIN_SWIPE;
 
        if (isSwipeLeft) {
          panorama.transition({
            left : -25
          });
        }
 
    });
  });
  */

});
YUI().use('scrollview', "scrollview-paginator", function(Y) {
  var scrollView = new Y.ScrollView({
    srcNode: ".Panorama .Item",
    height: Y.DOM.winHeight() - 98
  });
  scrollView.plug(Y.Plugin.ScrollViewPaginator, {
    selector: ".Panorama .Item"
  });
  scrollView.render();
});
