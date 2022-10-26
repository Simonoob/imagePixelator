/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import Draggable, { DraggableEventHandler } from 'react-draggable'
import {
	sourceImageFile,
	sourceImageLoadedAtom,
	selectionPointsAtom,
	DOMcanvasDimensionsAtom,
} from '../../state/atoms'
import useSourceImage from './useSourceImage'
import styles from './Canvas.module.scss'
import CanvasWithWEBGL2 from './CanvasWithWEBGL2'

const Canvas = () => {
	const [selectedFile, setSelectedFile] = useAtom(sourceImageFile)
	const [imageLoaded, setImageLoaded] = useAtom(sourceImageLoadedAtom)
	const [selectionPoints, setSelectionPoints] = useAtom(selectionPointsAtom)
	const [dragging, setDragging] = useState(false)
	const image = useRef<HTMLImageElement>(null)
	const DOMsourceImage = useSourceImage()
	const DOMcanvasDimensions = useAtomValue(DOMcanvasDimensionsAtom)
	const canvasInnerContainer = useRef<HTMLDivElement>(null)

	const handleImageLoaded = async (): Promise<number | undefined> => {
		if (!image.current) return window.setTimeout(handleImageLoaded, 30)
		setImageLoaded(true)
	}

	const handleDragging: DraggableEventHandler = (e, data) => {
		if (
			!data.node.id ||
			(DOMcanvasDimensions.width === 0 &&
				DOMcanvasDimensions.height === 0)
		)
			return

		const selectedCoordinates = {
			x: Number((data.x / DOMcanvasDimensions.width).toFixed(2)),
			y: Number(
				(
					(DOMcanvasDimensions.height - data.y) /
					DOMcanvasDimensions.height
				).toFixed(2),
			),
		}

		setSelectionPoints(prev =>
			prev.map((item, i) =>
				i === Number(data.node.id)
					? { x: selectedCoordinates.x, y: selectedCoordinates.y }
					: item,
			),
		)
	}

	useEffect(() => {
		if (!DOMsourceImage || !canvasInnerContainer.current) return
		canvasInnerContainer.current.style.width = `calc(${DOMsourceImage.clientWidth}px + 1rem)` //add 1rem to align the measuring dot to the center when on the edges
		canvasInnerContainer.current.style.height = `calc(${DOMsourceImage.clientHeight}px + 1rem)`
	}, [DOMsourceImage, canvasInnerContainer.current])

	return (
		<div className={styles.root}>
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
					{imageLoaded && !!selectionPoints && (
						<div
							ref={canvasInnerContainer}
							className={styles.canvasInnerContainer}
						>
							<CanvasWithWEBGL2 />
							{DOMcanvasDimensions.width > 0 &&
								DOMcanvasDimensions.height > 0 && (
									<>
										<Draggable
											defaultPosition={{
												x:
													selectionPoints[0]?.x *
													DOMcanvasDimensions.width,
												y:
													DOMcanvasDimensions.height -
													selectionPoints[0]?.y *
														DOMcanvasDimensions.height,
											}}
											onDrag={handleDragging}
											bounds={'parent'}
										>
											<div
												id="0"
												className={styles.rectangleEdge}
											></div>
										</Draggable>
										<Draggable
											defaultPosition={{
												x:
													selectionPoints[1]?.x *
													DOMcanvasDimensions.width,
												y:
													DOMcanvasDimensions.height -
													selectionPoints[1]?.y *
														DOMcanvasDimensions.height,
											}}
											onDrag={handleDragging}
											bounds={'parent'}
										>
											<div
												id="1"
												className={styles.rectangleEdge}
											></div>
										</Draggable>
									</>
								)}
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Canvas
