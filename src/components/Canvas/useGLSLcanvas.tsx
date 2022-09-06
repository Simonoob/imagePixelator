import { useEffect, useState } from 'react'
import { Canvas, ICanvasOptions } from 'glsl-canvas-js/dist/cjs/glsl'
import fragmentShader from './shaders/fragment.glsl'

const useGLSLcanvas = (): Canvas | undefined => {
	const [canvasObj, setCanvasObj] = useState<Canvas | undefined>(undefined)

	useEffect(() => {
		const DOMcanvas: HTMLCanvasElement | null =
			document.querySelector('#targetCanvas')

		if (!DOMcanvas) return

		const options: ICanvasOptions = {
			fragmentString: fragmentShader,
			antialias: true,
			preserveDrawingBuffer: true,
		}

		setCanvasObj(new Canvas(DOMcanvas, options))
	}, [])

	return canvasObj
}

export default useGLSLcanvas
