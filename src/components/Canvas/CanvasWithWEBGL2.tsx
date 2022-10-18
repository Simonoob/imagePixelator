import { useRef, useEffect, MouseEventHandler } from 'react'
import { useAtomValue } from 'jotai'
import { computedPixelsAtom } from '../../state/atoms'
import useGLSLcanvas from './useGLSLcanvas'
import useSourceImage from './useSourceImage'

const CanvasWithWEBGL2 = () => {
	const computedPixels = useAtomValue(computedPixelsAtom)

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
	}

	useEffect(() => {
		window.addEventListener('resize', resizeCanvas)

		return window.removeEventListener('resize', resizeCanvas)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!glslCanvasObj || !DOMsourceImage) return
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

    const setSelectedPixel: MouseEventHandler<HTMLCanvasElement> = (event) => {
        if(!computedPixels || !canvas.current) return
        const {width: canvasWidth, height: canvasHeight, left, top} = canvas.current.getBoundingClientRect()
        const clickCoordinatesXcanvas= {
            x: event.clientX - left,
            y: canvasHeight - (event.clientY - top)
        }
        const selectedPixel = {
            x: Math.round((clickCoordinatesXcanvas.x*computedPixels.x)/canvasWidth),
            y: Math.round((clickCoordinatesXcanvas.y*computedPixels.y)/canvasHeight)
        }
        console.log(selectedPixel)
    }

	return <canvas id="targetCanvas" ref={canvas} onClick={setSelectedPixel}></canvas>
}

export default CanvasWithWEBGL2
