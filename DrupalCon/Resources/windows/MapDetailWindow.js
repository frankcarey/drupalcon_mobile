(function() {

  DrupalCon.ui.createMapDetailWindow = function(settings) {
    Drupal.setDefaults(settings, {
      title: 'title here',
      uid: '',
      name: '',
      tabGroup: undefined
    });

    var mapImageFileName = settings.image;

    var mapDetailWindow = Titanium.UI.createWindow({
      id: 'mapDetailWindow',
      title: settings.mapName,
      backgroundColor: '#FFF',
      tabGroup: settings.tabGroup
    });

    var scrollView = Titanium.UI.createScrollView({
      contentWidth:'auto',
      contentHeight:'auto',
      top:0,
      showVerticalScrollIndicator:true,
      showHorizontalScrollIndicator:true
    });
    var view = Ti.UI.createView({
      backgroundImage:mapImageFileName,
      borderRadius:10,
      width:480,
      height:240,
      top:0
    });
    var center1 = null;
    var scaled1 = false;

    var theZoomScale = 1.0;
    scrollView.addEventListener('scale', function(e){
      var currentScale = e.scale;
    });

    scrollView.addEventListener('doubletap', function(e){
      var t = Titanium.UI.create2DMatrix();

      if (!scaled1) {
        dpm('center: ' + scrollView.center);
        t = t.scale(theZoomScale);
        view.width = 1000;
        view.height = 750;
        scrollView.contentWidth = 1000;
        scrollView.contentHeight = 750;
        scaled1 = true;
      }
      else {
        view.width = 480;
        view.height = 240;
        scrollView.contentWidth = 480;
        scrollView.contentHeight = 240;
        scaled1 = false;
      }

//
//      if (currentScale > theZoomScale) {
//        Ti.API.info("Zoomed at: " + e.x + ", " + e.y + " zoom: " + currentScale);
//        scrollView.zoomScale = theZoomScale;
//      }
//      else {
//        Ti.API.info("Not zoomed at: " + e.x + ", " + e.y + " zoom: " + currentScale);
//        scrollView.scrollTo(e.x, e.y);
//        scrollView.zoomScale = 2;
//      }
    });

    scrollView.add(view);
    mapDetailWindow.add(scrollView);
    Drupal.createNoticeDialog('Double-Tap to Zoom.').show(3000);

    return mapDetailWindow;
  };
})();