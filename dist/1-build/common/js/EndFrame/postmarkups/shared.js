import { Styles, Clamp, Align } from "ad-view";
import { ImageManager } from "ad-control";
import { Animation } from "@common/js/Animation.js";
import { Control } from "@common/js/Control.js";
import CanvasIris from "@common/js/CanvasIris.js";
import { UIComponent, UIImage, TextFormat, UITextField, UIGroup } from "ad-ui";
import { ObjectUtils } from "ad-utils";

export function titleTreatmentLayout(T) {
  Align.set(T.tt, Align.CENTER);
}

function formatTextElToBrandingLockup(
  textEl,
  brandingLockup,
  { textFontSize, textLockupOffset, textAlign = "center" } = {}
) {
  Styles.setCss(textEl, {
    color: "#fff",
    textAlign,
    fontSize: textFontSize,
    letterSpacing: 1
  });

  // resize text element to current branding lockup's width
  textEl.style.width = `${brandingLockup.offsetWidth}px`;
  // set text element height equal to inner span's height
  textEl.style.height = `${textEl.querySelector("span").offsetHeight}px`;

  Align.set(textEl, {
    x: { type: Align.CENTER, against: brandingLockup },
    y: {
      type: Align.TOP,
      outer: true,
      against: brandingLockup,
      offset: -textLockupOffset
    }
  });
}

export function sideBySideBrandingLockup(
  T,
  { ctaLogoOffset, tuneInFontSize, tuneInLockupOffset, brandingLockupAlign }
) {
  // cta
  T.cta.resize();

  // switch typical CTA-logo orientation for RTL treatments
  const leftEl = adData.isRTL ? T.cta : T.netflixLogo;
  const rightEl = adData.isRTL ? T.netflixLogo : T.cta;

  // logo
  Align.set(leftEl, {
    x: {
      type: Align.LEFT,
      outer: true,
      against: rightEl,
      offset: -ctaLogoOffset
    }
  });

  // lockup to position CTA and logo together
  T.brandingLockup = new UIGroup({
    target: T,
    children: [leftEl, rightEl]
  });

  // add tune-in/ftm to lockup if exists
  if (adData.hasTuneIn || adData.hasFTM) {
    const children = [T.brandingLockup];
    const textEl = adData.hasTuneIn ? T.tuneIn : T.ftm;

    if (adData.hasTuneIn) {
      T.removeChild(T.ftm);
    } else {
      T.removeChild(T.tuneIn);
    }

    formatTextElToBrandingLockup(textEl, T.brandingLockup, {
      textFontSize: adData.hasTuneIn ? tuneInFontSize : tuneInFontSize - 2,
      textLockupOffset: tuneInLockupOffset
    });

    children.push(textEl);

    T.brandingLockup = new UIGroup({
      target: T,
      children
    });
  }

  Align.set(T.brandingLockup, brandingLockupAlign);
}

export function stackedBrandingLockup(
  T,
  {
    // offset between elements in branding lockup
    brandingLockupOffset,
    // describe how to align branding lockup elems against each other
    brandingLockupElemXAlign,
    // Align value for entire branding lockup
    brandingLockupAlign,
    tuneInFontSize
  }
) {
  // positioning CTA atop logo
  T.cta.resize();

  // switch typical CTA-logo orientation for RTL treatments
  const topEl = adData.isRTL ? T.netflixLogo : T.cta;
  const bottomEl = adData.isRTL ? T.cta : T.netflixLogo;

  Align.set(topEl, {
    against: bottomEl,
    x: brandingLockupElemXAlign,
    y: {
      type: Align.TOP,
      outer: true,
      offset: -brandingLockupOffset
    }
  });

  const xAlignMatch = /((?:left)|(?:center)|(?:right))/i.exec(
    brandingLockupElemXAlign
  );
  const textAlign = xAlignMatch && xAlignMatch[1].toLowerCase();

  // lockup to position branding elems together
  const children = [T.cta, T.netflixLogo];

  if (adData.hasTuneIn || adData.hasFTM) {
    const textEl = adData.hasTuneIn ? T.tuneIn : T.ftm;

    if (adData.hasTuneIn) {
      T.removeChild(T.ftm);
    } else {
      T.removeChild(T.tuneIn);
    }

    formatTextElToBrandingLockup(textEl, topEl, {
      textAlign,
      textFontSize: adData.hasTuneIn ? tuneInFontSize : tuneInFontSize - 2,
      textLockupOffset: brandingLockupOffset - 4
    });

    children.push(textEl);
  }

  T.brandingLockup = new UIGroup({
    target: T,
    children,
    align: brandingLockupAlign
  });
}
