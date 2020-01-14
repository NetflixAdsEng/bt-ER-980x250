import { ImageManager } from "ad-control";
import { MonetUtils } from "ad-utils";

export default function AdData() {
  var self = this;

  /**
		EXTRACT JSON DATA
		Prepare dynamic data here.
	 */

  /**
		DYNAMIC IMAGES
		Dynamically loaded images need to be in their own directory, like "dynamic_images/".

		Then, you need to add your dynamic image-paths to the load-queue, so that when
		the secondary preload happens, these assets will get loaded. For example:

		self.theImageName = ImageManager.addToLoad(adParams.imagesPath + 'sample.jpg');
	 */

  self.fonts = {
    primary: "template_font"
  };

  self.colors = {
    white: "#F5F5F1",
    grey: "#221F1F",
    red: "#E50914",
    black: "#000000"
  };

  // Store svg markup for use in all UISvg instances, reduces duplicate code across builds.  See UISvg.
  self.svg = {};

  // if ribbon toggle not defined in treatment JSON, default to using ribbon
  const ribbonToggle = MonetUtils.getDataByKey("Toggle_Ribbon");
  self.useRibbon = ribbonToggle === false ? false : true;

  self.useSupercut = MonetUtils.getDataByKey("Toggle_Supercut");
  self.isRTL = MonetUtils.getDataByKey("Toggle_Right-To-Left_Language");
  self.hasTT = !!MonetUtils.getDataByKey("Title_Treatment");
  self.retinaTT = !!MonetUtils.getDataByKey("Double_Density_Title_Treatment");

  // indicates whether ad is on endframe state
  self.onEndFrame = false;
}
