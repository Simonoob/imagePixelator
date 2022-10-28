import { useRef, useEffect } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import {
	computedPixelsAtom,
	selectionPointsAtom,
	DOMcanvasDimensionsAtom,
} from '../../state/atoms'
import useGLSLcanvas from './useGLSLcanvas'
import useSourceImage from './useSourceImage'

const CanvasWithWEBGL2 = () => {
	const computedPixels = useAtomValue(computedPixelsAtom)
	const selectionPoints = useAtomValue(selectionPointsAtom)
	const setDOMcanvasDimensions = useSetAtom(DOMcanvasDimensionsAtom)

	const glslCanvasObj = useGLSLcanvas()
	const DOMsourceImage = useSourceImage()
	const canvas = useRef<HTMLCanvasElement>(null)

	const resizeCanvas = async (): Promise<number | undefined> => {
		if (!canvas.current || !DOMsourceImage)
			return window.setTimeout(resizeCanvas, 30)
		canvas.current.style.width = DOMsourceImage.clientWidth + 'px'
		canvas.current.style.height = DOMsourceImage.clientHeight + 'px'

		canvas.current.width = DOMsourceImage.naturalWidth
		canvas.current.height = DOMsourceImage.naturalHeight

		setDOMcanvasDimensions({
			width: canvas.current.clientWidth,
			height: canvas.current.clientHeight,
		})
	}

	useEffect(() => {
		window.addEventListener('resize', resizeCanvas)

		return window.removeEventListener('resize', resizeCanvas)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!glslCanvasObj || !DOMsourceImage) {
			setDOMcanvasDimensions({ width: 0, height: 0 })
			return
		}
		resizeCanvas()
		glslCanvasObj.setTexture('u_texture', DOMsourceImage)
		const sourceImageDimensions = DOMsourceImage.getBoundingClientRect()
		glslCanvasObj.setUniform(
			'u_textureResolution',
			sourceImageDimensions.width,
			sourceImageDimensions.height,
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [DOMsourceImage, glslCanvasObj])

	useEffect(() => {
		if (!glslCanvasObj || !computedPixels) return

		glslCanvasObj.setUniform('u_blocks', computedPixels.x, computedPixels.y)
	}, [DOMsourceImage, computedPixels, glslCanvasObj])

	useEffect(() => {
		if (!glslCanvasObj) return
		glslCanvasObj.setUniform(
			'u_selectedPoint1',
			selectionPoints[0]?.x,
			selectionPoints[0]?.y,
		)
		glslCanvasObj.setUniform(
			'u_selectedPoint2',
			selectionPoints[1]?.x,
			selectionPoints[1]?.y,
		)
	}, [selectionPoints, glslCanvasObj])

	return <canvas id="targetCanvas" ref={canvas}></canvas>
}

export default CanvasWithWEBGL2
