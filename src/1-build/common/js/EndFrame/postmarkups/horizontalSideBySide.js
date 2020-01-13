import { Styles, Markup, Align, Effects } from "ad-view";
import { ImageManager } from "ad-control";
import { Animation } from "@common/js/Animation.js";
import { Control } from "@common/js/Control.js";
import CanvasIris from "@common/js/CanvasIris.js";
import {
  UIComponent,
  UIBorder,
  UIButton,
  UIImage,
  TextFormat,
  UITextField,
  UISvg,
  UIGroup
} from "ad-ui";
import { ObjectUtils } from "ad-utils";
import { titleTreatmentLayout, sideBySideBrandingLockup } from "./shared.js";

export function createSideBySidePostMarkups({
  defaultArgs = {},
  yAlign = {
    type: Align.BOTTOM,
    offset: -26
  },
  layoutXAligns
}) {
  const postMarkups = {};
  const layoutOptions = [
    "left",
    "offCenterLeft",
    "center",
    "offCenterRight",
    "right"
  ];

  layoutOptions.forEach(layout => {
    const layoutXAlign = layoutXAligns[`${layout}XAlign`];
    if (!layoutXAlign) return;

    postMarkups[`${layout}PostMarkup`] = function sideBySidePostMarkup(T) {
      const args = ObjectUtils.defaults(
        {
          brandingLockupAlign: {
            x: layoutXAlign,
            y: yAlign
          }
        },
        defaultArgs,
        true
      );
      horizontalSideBySide(args);
    };
  });

  return postMarkups;
}

export default function horizontalSideBySide({
  brandingLockupAlign = {
    x: Align.CENTER,
    y: {
      type: Align.BOTTOM,
      offset: -26
    }
  },
  ctaLogoOffset = 14,
  tuneInFontSize = 18,
  tuneInLockupOffset = 8
} = {}) {
  let T = View.endFrame;

  // title treatment
  titleTreatmentLayout(T);

  Align.set(T.pedigree, {
    x: {
      type: Align.CENTER,
      against: T.tt
    },
    y: {
      type: Align.CENTER,
      against: 65
    }
  });

  // side-by-side branding
  // encompassing CTA, logo, and tune-in/FTM
  sideBySideBrandingLockup(T, {
    ctaLogoOffset,
    tuneInFontSize,
    tuneInLockupOffset,
    brandingLockupAlign
  });

  // ratings bug
  if (adData.hasRatings) {
    Align.set(T.ratingsBug, {
      x: {
        type: Align.RIGHT,
        offset: -5
      },
      y: {
        type: Align.BOTTOM,
        offset: -5
      }
    });
  } else {
    T.removeChild(T.ratingsBug);
  }

  if (T.iris) {
    // ensure iris canvas drawer in front of everything
    T.appendChild(T.iris.canvas);
  }
}
