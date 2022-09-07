/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { sourceImageAtom, sourceImageLoadedAtom } from '../../state/atoms'
import styles from './Canvas.module.scss'
import CanvasWithWEBGL2 from './CanvasWithWEBGL2'

const Canvas = () => {
	const [selectedFile, setSelectedFile] = useAtom(sourceImageAtom)
	const [imageLoaded, setImageLoaded] = useAtom(sourceImageLoadedAtom)
	const [dragging, setDragging] = useState(false)
	const image = useRef<HTMLImageElement>(null)

	const handleImageLoaded = async (): Promise<number | undefined> => {
		if (!image.current) return window.setTimeout(handleImageLoaded, 30)
		setImageLoaded(true)
	}

	return (
		<div
			className={styles.root}
			onDragOver={() => setDragging(true)}
			onDragLeave={e => {
				e.preventDefault()
				setDragging(false)
			}}
		>
			{!selectedFile ? (
				<label
					className={`${styles.imageInput} ${
						dragging ? styles.dragging : undefined
					}`}
				>
					{!dragging
						? 'Please import an image to start'
						: 'Drop here'}
					<input
						className={styles.fileDropzone}
						type="file"
						accept="image/png, image/jpeg, image/jpg"
						onChange={e =>
							e.target.files &&
							e.target.files[0] &&
							(setSelectedFile(e.target.files[0]),
							setDragging(false))
						}
					></input>
				</label>
			) : (
				<div className={styles.canvasContainer}>
					<img
						ref={image}
						src={URL.createObjectURL(selectedFile)}
						alt="uploaded image"
						onLoad={handleImageLoaded}
						id="canvasSourceImage"
					/>
					{imageLoaded && <CanvasWithWEBGL2 />}
				</div>
			)}
		</div>
	)
}

export default Canvas
