import { Styles, Markup, Align, Effects } from 'ad-view'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'
import { CanvasDrawer, CanvasTweener, CanvasRect, CanvasCircle, CanvasImage, CanvasTexture, CanvasBlendMode } from 'ad-canvas'

/* Following iris drawing borrowed from Roma campaign */
export default class CanvasIris {
	constructor(arg) {
		// MASTER DRAWER
		const T = new CanvasDrawer({
			target: arg.target,
			css: {
				width: arg.target.width,
				height: arg.target.height
			}
		})

		// THE IRIS BLUR
		const _size = Math.max(T.width, T.height)
		const _irisSource = new CanvasDrawer({
			css: {
				width: _size,
				height: _size
			}
		})

		const _center = {
			x: _irisSource.width / 2,
			y: _irisSource.height / 2
		}

		const _radialGradient = CanvasTexture.makeRadialGradient({
			target: _irisSource,
			xInner: _center.x,
			yInner: _center.y,
			radiusInner: 10,
			xOuter: _center.x,
			yOuter: _center.y,
			radiusOuter: 50,
			colors: [{ stopVal: 0, color: 'rgba(0, 0, 0, 1)' }, { stopVal: 1, color: 'rgba(0, 0, 0, 0)' }]
		})

		T.circle = new CanvasCircle({
			target: _irisSource,
			params: {
				radius: _irisSource.width / 2,
				x: _center.x,
				y: _center.y
			},
			fill: _radialGradient
		})
		_irisSource.update()

		// THE FINAL OUTPUT
		new CanvasRect({
			target: T,
			params: {
				width: T.width,
				height: T.height
			},
			fill: arg.irisColor
		})

		T.circle = new CanvasImage({
			target: T,
			source: _irisSource,
			blendMode: CanvasBlendMode.DEST_OUT,
			align: Align.CENTER,
			params: {
				scale: 0.01
			}
		})

		CanvasTweener.init(T)
		T.update()

		return T
	}
}
