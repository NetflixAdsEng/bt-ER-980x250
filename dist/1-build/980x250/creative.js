// how long zoom animates for (in seconds)
var ZOOM_DURATION = 1.7;

// how much to scale the keyart intro frame
var ZOOM_AMOUNT = 5;

// time for intro frame to fade out once zoom finishes
var ZOOM_FADE_OUT = 0.5;

// how long fade-in takes (in seconds)
var FADE_DURATION = 1.5;

var Creative = function() {
  this.init = function() {
    console.log("Creative.init()");
    TweenLite.set(View.endFrame, { alpha: 0 });
  };

  this.play = function() {
    console.log("Creative.play()");
    var delay = 0;
    TweenLite.fromTo(
      View.endFrame,
      FADE_DURATION,
      { alpha: 0 },
      { alpha: 1, delay: delay }
    );

    TweenLite.delayedCall(delay, function() {
      View.endFrame.netflixLogo.play();
    });
  };
};

// attaching to Creative class since container looks there for intro zoom properties
Creative.zoomDuration = ZOOM_DURATION;
Creative.zoomAmount = ZOOM_AMOUNT;
Creative.zoomFadeOut = ZOOM_FADE_OUT;
