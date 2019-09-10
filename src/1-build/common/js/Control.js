import { Styles, Markup, Align } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Gesture, GestureEvent } from 'ad-events'
import { Animation } from '@common/js/Animation.js'
import '@netflixadseng/wc-netflix-fonts'
import { MonetUtils } from 'ad-utils'


export class Control {
	static preMarkup() {
		console.log('Control.preMarkup()')
View.netflixFonts = document.createElement('netflix-fonts')
Markup.get('main').appendChild(View.netflixFonts)


	}

	static postMarkup() {
		console.log('Control.postMarkup()')
// listen for default exit
Gesture.add(View.endFrame, GestureEvent.CLICK, Control.handleClick)



		View.endFrame.hide()
		
Gesture.add(View.endFrame, GestureEvent.OVER, function() {
	View.endFrame.cta.mouseover()
})
Gesture.add(View.endFrame, GestureEvent.OUT, function() {
	View.endFrame.cta.mouseout()
})


	}


	static handleClick(event) {	

		Network.exit( 
			overridePlatformExit, 
			MonetUtils.getDataByKey('Exit_URL')
		); 
	}




	static handleMonetLoadComplete(element) {
		console.log('Control.handleMonetLoadComplete()')
		MonetUtils.setData(element)
			.then(data => {
				console.log('	-> All Netflix web components ready')
				// monet data is now assigned to MonetUtils
adData.hasFTM = MonetUtils.getDataByKey('FTM')
adData.hasTuneIn = MonetUtils.getDataByKey('Tune_In')

// Ratings Bug
adData.hasRatings = MonetUtils.getDataByKey('Ratings_Bug_20x20')

// if any Dynamic images must be loaded from monet
// but referenced outside a monet component (CanvasImage, UIImage), follow this pattern
//
// adData.ratingsSrc = ImageManager.addToLoad(MonetUtils.getDataByKey('Ratings_Bug_20x20'), { forCanvas: false })
//



// proceed with ad AFTER the setData() Promise has been fulfilled
ImageManager.load(function() {
	if (View.intro) View.intro.postMarkupStyling()
	View.endFrame.postMarkupStyling()
	Control.postMarkup()
	Animation.start()
})


			})
			.catch(err => {
				console.log(err)
				global.failAd()
			})
	}
	
	static handleIntroVideoComplete(event) {
		Animation.showEndFrame()

	}

	static handleIntroClick(event) {
		View.intro.hide()
		Animation.showEndFrame()
		View.intro.introVideoPlayer.pause()
		Control.handleClick()
	}
	

}
