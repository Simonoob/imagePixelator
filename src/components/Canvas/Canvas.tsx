/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react'
import { useAtom } from 'jotai'
import { sourceImageAtom } from '../../state/atoms'
import styles from './Canvas.module.scss'

const Canvas = () => {
	const [selectedFile] = useAtom(sourceImageAtom)
	const canvas = useRef<HTMLCanvasElement>(null)
	const image = useRef<HTMLImageElement>(null)

	const handleImageLoaded = async (): Promise<number | undefined> => {
		if (!image.current || !canvas.current)
			return window.setTimeout(handleImageLoaded, 30)

		canvas.current.style.width = image.current.clientWidth + 'px'
		canvas.current.style.height = image.current.clientHeight + 'px'

		canvas.current.width =
			image.current.clientWidth * window.devicePixelRatio
		canvas.current.height =
			image.current.clientHeight * window.devicePixelRatio
	}

	return (
		<div className={styles.root}>
			{!selectedFile ? (
				<span className={styles.imageInput}>
					Please import an image to start
				</span>
			) : (
				<div className={styles.canvasContainer}>
					<img
						ref={image}
						src={URL.createObjectURL(selectedFile)}
						alt="uploaded image"
						onLoad={handleImageLoaded}
					/>
					<canvas ref={canvas}></canvas>
				</div>
			)}
		</div>
	)
}

export default Canvas
