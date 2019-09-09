import { createSideBySidePostMarkups } from "./horizontalSideBySide.js";
import horizontalStacked from "./horizontalStacked.js";
import { Align } from "ad-view";
import { ObjectUtils } from "ad-utils";

const {
  leftPostMarkup,
  offCenterLeftPostMarkup,
  centerPostMarkup,
  offCenterRightPostMarkup,
  rightPostMarkup
} = createSideBySidePostMarkups({
  defaultArgs: {
    ctaLogoOffset: 14,
    tuneInFontSize: 18,
    tuneInLockupOffset: 8
  },
  yAlign: {
    type: Align.BOTTOM,
    offset: -26
  },
  layoutXAligns: {
    leftXAlign: {
      type: Align.LEFT,
      against: 70
    },
    offCenterLeftXAlign: {
      type: Align.LEFT,
      against: 200
    },
    centerXAlign: Align.CENTER,
    offCenterRightXAlign: {
      type: Align.RIGHT,
      offset: -205
    },
    rightXAlign: {
      type: Align.RIGHT,
      offset: -75
    }
  }
});

function stackedPostMarkup() {
  horizontalStacked({
    brandingLockupOffset: 16,
    brandingLockupRightPadding: 25,
    tuneInFontSize: 18
  });
}

export {
  leftPostMarkup,
  offCenterLeftPostMarkup,
  centerPostMarkup,
  offCenterRightPostMarkup,
  rightPostMarkup,
  stackedPostMarkup
};
