import '@netflixadseng/wc-netflix-brand-logo'
import '@netflixadseng/wc-netflix-cta'
import '@netflixadseng/wc-netflix-text'
import '@netflixadseng/wc-netflix-img'
import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { offCenterRightPostMarkup, rightPostMarkup, leftPostMarkup, stackedPostMarkup, centerPostMarkup, offCenterLeftPostMarkup } from './EndFrame/postMarkups'
import { mainInit, stackedInit } from './EndFrame/inits'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import '@netflixadseng/wc-netflix-flushed-ribbon'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'


export function Main() {
	var T = Markup.get('main')
	Styles.setCss(T, {
		position: 'absolute',
		width: adParams.adWidth,
		height: adParams.adHeight,
		opacity: 0,
		left: '0px',
		top: '0px',
		overflow: 'hidden',
		userSelect: 'none'
	})
	Styles.setCss(T, { backgroundColor:'#000000' });


	return T
}

// ==============================================================================================================
export function Intro(arg) {
	const base = {
		id: 'intro-container',
		css: {
			width: 'inherit',
			height: 'inherit'
		}
	}
	const T = new UIComponent(ObjectUtils.defaults(arg, base, true))


// video
T.introVideoPlayer = document.createElement('netflix-video')
T.introVideoPlayer.id = 'intro-video'
T.introVideoPlayer.setAttribute('width', adParams.adWidth)
T.introVideoPlayer.setAttribute('height', adParams.adHeight)
T.introVideoPlayer.setAttribute('close-color-1', adData.colors.red)
T.introVideoPlayer.setAttribute('close-color-2', adData.colors.white)
T.introVideoPlayer.setAttribute('data-dynamic-key', 'Supercut')
T.introVideoPlayer.setAttribute('muted', '')
//T.introVideoPlayer.setAttribute('autoplay', '')
T.introVideoPlayer.addEventListener('video-click', Control.handleIntroClick)
T.introVideoPlayer.addEventListener('video-complete', Control.handleIntroVideoComplete)
T.introVideoPlayer.addEventListener('video-close', Animation.showEndFrame)
T.appendChild(T.introVideoPlayer)

// brand logo
T.netflixLogo = document.createElement('netflix-brand-logo')
T.netflixLogo.setAttribute('width', 90)
T.appendChild(T.netflixLogo)

T.postMarkupStyling = function() {
	TweenLite.set(View.intro.netflixLogo, { opacity: 0 })
	Align.set(View.intro.netflixLogo, {
		x: {
			type: Align.LEFT,
			offset: 10
		},
		y: {
			type: Align.BOTTOM,
			offset: -10
		}
	})
}
		
		


	return T
}

// ==============================================================================================================
export function EndFrame(arg) {
const base = {
	id: 'end-frame-container',
	css: {
		width: 'inherit',
		height: 'inherit'
	}
}

const _uiObj = ObjectUtils.defaults(arg, base, true)

const T = new UIComponent(_uiObj)
T.subLayer = new UIComponent(_uiObj)

T.subLayer.appendChild(T)



let init = arg.layout === 'STACKED' && stackedInit ? stackedInit : mainInit
init(T)

let postMarkup
switch (arg.layout) {
	case 'SIDE_BY_SIDE_LEFT':
		postMarkup = leftPostMarkup
		break
	case 'SIDE_BY_SIDE_OFF_CENTER_LEFT':
		postMarkup = offCenterLeftPostMarkup
		break
	case 'SIDE_BY_SIDE_CENTER':
		postMarkup = centerPostMarkup
		break
	case 'SIDE_BY_SIDE_OFF_CENTER_RIGHT':
		postMarkup = offCenterRightPostMarkup
		break
	case 'SIDE_BY_SIDE_RIGHT':
	default:
		postMarkup = rightPostMarkup
		break
	case 'STACKED':
		postMarkup = stackedPostMarkup
		break
}
T.postMarkupStyling = postMarkup



	return T
}

// ==============================================================================================================
export function NetflixRibbon() {
	var T = document.createElement('netflix-flushed-ribbon')
	T.setAttribute('width', adParams.adWidth)
	T.setAttribute('height', adParams.adHeight)
	T.style.position = 'absolute'
	View.main.appendChild(T)
	return T
}

export function MainBorder() {
	new UIBorder({
		target: View.main,
		size: 1,
		color: '#000000'
	})
}


