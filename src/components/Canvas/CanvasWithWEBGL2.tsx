import { useRef, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { blocksAtom } from '../../state/atoms'
import useGLSLcanvas from './useGLSLcanvas'
import useSourceImage from './useSourceImage'

const CanvasWithWEBGL2 = () => {
	const blocks = useAtomValue(blocksAtom)
	const glslCanvasObj = useGLSLcanvas()
	const DOMsourceImage = useSourceImage()
	const canvas = useRef<HTMLCanvasElement>(null)

	const resizeCanvas = async (): Promise<number | undefined> => {
		if (!canvas.current || !DOMsourceImage)
			return window.setTimeout(resizeCanvas, 30)
		canvas.current.style.width = DOMsourceImage.clientWidth + 'px'
		canvas.current.style.height = DOMsourceImage.clientHeight + 'px'

		canvas.current.width =
			DOMsourceImage.clientWidth * window.devicePixelRatio
		canvas.current.height =
			DOMsourceImage.clientHeight * window.devicePixelRatio
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
		if (!glslCanvasObj) return

		const computedBlocks = {
			x: blocks,
			y: blocks,
		}

		if (!DOMsourceImage) return
		//force block to be squared
		const sourceImageDimensions = {
			width: DOMsourceImage.getBoundingClientRect().width,
			height: DOMsourceImage.getBoundingClientRect().height,
		}
		const canvasRatio =
			sourceImageDimensions.width / sourceImageDimensions.height

		if (isNaN(canvasRatio))
			return console.error('something went wrong computing aspect ratio')

		canvasRatio > 1.0
			? (computedBlocks.x *= canvasRatio)
			: (computedBlocks.y /= canvasRatio)
		glslCanvasObj.setUniform('u_blocks', computedBlocks.x, computedBlocks.y)
	}, [DOMsourceImage, blocks, glslCanvasObj])

	return <canvas id="targetCanvas" ref={canvas}></canvas>
}

export default CanvasWithWEBGL2
