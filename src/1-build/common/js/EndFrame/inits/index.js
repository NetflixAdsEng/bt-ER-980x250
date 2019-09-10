import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import CanvasIris from '@common/js/CanvasIris.js'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'
import baseInit from './baseInit.js'

export { mainInit, stackedInit }

function stackedInit(T) {
	mainInit(T)
}

function mainInit(T) {
	baseInit(T, { logoWidth: 112, ctaWidth: 116, ctaMaxWidth: 130, ctaHeight: 30 })
}
