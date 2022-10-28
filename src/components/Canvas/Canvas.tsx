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
	const selectedRectangle = useRef<HTMLDivElement>(null)
	const rectangleEdge = useRef<HTMLDivElement>(null)

	const handleImageLoaded = async (): Promise<number | undefined> => {
		if (!image.current) return window.setTimeout(handleImageLoaded, 30)
		setImageLoaded(true)
	}

	const handleDragging: DraggableEventHandler = (e, data) => {
		if (
			!data.node.id ||
			(DOMcanvasDimensions.width === 0 &&
				DOMcanvasDimensions.height === 0) ||
			!selectedRectangle.current
		)
			return
		selectedRectangle.current.style.outline = 'none'
		const selectedCoordinates = {
			x: Number((data.x / DOMcanvasDimensions.width).toFixed(2)),
			y: Number(
				(
					(DOMcanvasDimensions.height - data.y) /
					DOMcanvasDimensions.height
				).toFixed(2),
			),
		}

		setSelectionPoints(prev => ({
			...prev,
			[Number(data.node.id)]: {
				x: selectedCoordinates.x,
				y: selectedCoordinates.y,
			},
		}))
	}

	const handleDraggingRectangle: DraggableEventHandler = (e, data) => {
		if (!selectedRectangle.current) return
		selectedRectangle.current.style.outline = 'none'
		setSelectionPoints(prev => ({
			0: {
				x: prev[0].x + data.deltaX / DOMcanvasDimensions.width,
				y: prev[0].y - data.deltaY / DOMcanvasDimensions.height,
			},
			1: {
				x: prev[0].x + data.deltaX / DOMcanvasDimensions.width,
				y: prev[0].y - data.deltaY / DOMcanvasDimensions.height,
			},
		}))
	}

	useEffect(() => {
		if (!DOMsourceImage || !canvasInnerContainer.current) return
		canvasInnerContainer.current.style.width = `calc(${DOMsourceImage.clientWidth}px)` //add 1rem to align the measuring dot to the center when on the edges
		canvasInnerContainer.current.style.height = `calc(${DOMsourceImage.clientHeight}px)`
	}, [DOMsourceImage, canvasInnerContainer.current])

	useEffect(() => {
		if (
			!selectedRectangle.current ||
			!DOMsourceImage ||
			(DOMcanvasDimensions.width === 0 &&
				DOMcanvasDimensions.height === 0)
		)
			return

		selectedRectangle.current.style.width = `${
			(Math.max(selectionPoints[0].x, selectionPoints[1].x) -
				Math.min(selectionPoints[0].x, selectionPoints[1].x)) *
			DOMcanvasDimensions.width
		}px`
		selectedRectangle.current.style.height = `${
			(Math.max(selectionPoints[0].y, selectionPoints[1].y) -
				Math.min(selectionPoints[0].y, selectionPoints[1].y)) *
			DOMcanvasDimensions.height
		}px`
	}, [selectionPoints, , selectedRectangle.current, DOMcanvasDimensions])

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
						onDragEnter={() => setDragging(true)}
						onDragLeave={() => setDragging(false)}
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
											position={{
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
												ref={rectangleEdge}
											></div>
										</Draggable>

										<Draggable
											position={{
												x:
													Math.min(
														selectionPoints[0].x,
														selectionPoints[1].x,
													) *
													DOMcanvasDimensions.width,
												y:
													DOMcanvasDimensions.height -
													Math.max(
														selectionPoints[0].y,
														selectionPoints[1].y,
													) *
														DOMcanvasDimensions.height,
											}}
											onDrag={handleDraggingRectangle}
											bounds={'parent'}
										>
											<div
												className={
													styles.selectedRectangle
												}
												ref={selectedRectangle}
											></div>
										</Draggable>

										<Draggable
											position={{
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
