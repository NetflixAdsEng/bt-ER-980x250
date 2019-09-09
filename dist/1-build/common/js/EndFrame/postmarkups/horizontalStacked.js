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
import { titleTreatmentLayout, stackedBrandingLockup } from "./shared.js";

export default function horizontalStacked({
  // distance between elements in CTA-logo lockup
  brandingLockupOffset = 16,
  // distance from right edge and CTA-logo lockup
  brandingLockupRightPadding = 105,
  tuneInFontSize = 18,
  pedigreeCenterYAlign = {
    type: Align.CENTER,
    against: 55
  },
  ratingsPadding = 5
} = {}) {
  let T = View.endFrame;

  // title treatment
  titleTreatmentLayout(T);

  Align.set(T.pedigree, {
    x: {
      type: Align.CENTER,
      against: T.tt
    },
    y: pedigreeCenterYAlign
  });

  stackedBrandingLockup(T, {
    brandingLockupElemXAlign: Align.CENTER,
    brandingLockupAlign: {
      x: {
        type: Align.RIGHT,
        offset: -brandingLockupRightPadding
      },
      y: Align.CENTER
    },
    brandingLockupOffset,
    tuneInFontSize
  });

  // ratings bug
  if (adData.hasRatings) {
    Align.set(T.ratingsBug, {
      x: {
        type: Align.RIGHT,
        offset: -ratingsPadding
      },
      y: {
        type: Align.BOTTOM,
        offset: -ratingsPadding
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
