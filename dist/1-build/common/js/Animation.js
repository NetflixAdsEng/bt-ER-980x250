import { Styles, Markup, Align, Effects } from "ad-view";
import { Device } from "ad-external";

export class Animation {
  static start() {
    console.log("Animation.start()");
    // show the main container
    TweenLite.delayedCall(0.1, () => {
      global.removePreloader();
    });
    TweenLite.set(View.main, { opacity: 1 });

    // netflix-ribbon animation at end of zoom always last this long
    const RIBBON_ANIM_TIME = 0.6;

    const ribbonStart = (window.Creative && Creative.zoomDuration) || 1.7;
    const initZoomDuration = ribbonStart + RIBBON_ANIM_TIME;
    const initZoomStart = 0;
    const initZoomScale = Math.min(
      (window.Creative && Creative.zoomAmount) || 5,
      30
    );
    const subScale = 1 + (initZoomScale - 1) * 0.03;
    const timeOffset = initZoomDuration * 0.3;

    if (adData.useSupercut && Device.type === "desktop") {
      if (View.endFrame.iris) {
        TweenLite.set(View.endFrame.iris.canvas, { opacity: 0 });
      }
      View.endFrame.show();
      // have Netflix logo already fully in
      View.endFrame.netflixLogo.progress(1);

      TweenLite.to(View.endFrame, initZoomDuration, {
        delay: initZoomStart,
        scale: subScale,
        ease: Linear.easeNone
      });
      TweenLite.to(View.endFrame.subLayer, initZoomDuration - timeOffset, {
        delay: initZoomStart + timeOffset,
        scale: initZoomScale - subScale,
        ease: Expo.easeIn
      });

      TweenLite.delayedCall(ribbonStart, () => {
        if (adData.useRibbon) {
          View.ribbon.play();
          return;
        }
        Animation.playIntro();
        TweenLite.to(
          View.endFrame.subLayer,
          Creative.zoomFadeOut || RIBBON_ANIM_TIME,
          {
            opacity: 0,
            onComplete: Animation.hideEndFrame
          }
        );
      });
    } else {
      if (adData.useRibbon) {
        View.ribbon.play();
        return;
      }
      Animation.playIntro();
    }
  }

  // IMPORTANT!!! Call this function when your animation is complete!
  static complete() {
    console.log("Animation.complete()");
  }

  static playIntro() {
    if (View.intro) {
      const videoEl = View.intro.introVideoPlayer.querySelector("video");
      const firstLogoCheckpt = 2.5;
      Styles.setCss(View.intro.netflixLogo, { opacity: 1 });
      View.intro.introVideoPlayer.play();

      TweenLite.delayedCall(firstLogoCheckpt, function() {
        View.intro.netflixLogo.reverse();

        // delaying querying video duration since not available till some media loaded
        const videoDuration = videoEl.duration || 8;
        TweenLite.delayedCall(videoDuration - 2 - firstLogoCheckpt, function() {
          View.intro.netflixLogo.play();
        });
        TweenLite.to(View.intro.netflixLogo, 0.25, {
          delay: videoDuration - firstLogoCheckpt,
          alpha: 0
        });
      });
    } else {
      Animation.showEndFrame();
    }
  }

  static hideEndFrame() {
    TweenLite.set(View.endFrame.subLayer, { opacity: 0, visibility: "hidden" });
  }

  static showEndFrame() {
    console.log("Animation.showEndFrame()");
    adData.onEndframe = true;
    if (adData.useSupercut) {
      // reset endframe after ribbon and supercut
      View.endFrame.netflixLogo.progress(0);
      if (View.endFrame.iris) {
        TweenLite.set(View.endFrame.iris.canvas, { opacity: 1 });
      }
      TweenLite.set([View.endFrame, View.endFrame.subLayer], { scale: 1 });
    }

    if (View.intro) View.intro.hide();

    // for C2.0 Builder ads
    if (View.endFrame.subLayer) {
      TweenLite.set(View.endFrame.subLayer, {
        opacity: 1,
        visibility: "visible"
      });
    }

    View.endFrame.show();

    const creative = new Creative();
    if (creative.init) {
      creative.init();
    }

    if (!adData.useRibbon || adData.useSupercut) {
      creative.play();
    }
  }

  static playCreative() {
    console.log("Animation.playCreative()");
    const creative = new Creative();
    creative.play();
  }
}
