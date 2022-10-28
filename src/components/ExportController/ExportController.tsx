import React, { useState } from 'react'
import { DownloadIcon } from '@radix-ui/react-icons'
import styles from './ExportController.module.scss'
import { sourceImageFile } from '../../state/atoms'
import { useAtomValue } from 'jotai'
import useDOMSourceImage from '../Canvas/useSourceImage'

const ExportController = () => {
	const [selectedFormat, setSelectedFormat] = useState('image/jpeg')
	const [selectedQuality, setSelectedQuality] = useState(1)
	const selectedFile = useAtomValue(sourceImageFile)
	const DOMsourceImage = useDOMSourceImage()

	const handleDownload = () => {
		const canvas = document.querySelector('#targetCanvas')
		if (!(canvas instanceof HTMLCanvasElement) || !DOMsourceImage) return

		const resizedCanvas = document.createElement('canvas')
		const resizedContext = resizedCanvas.getContext('2d')
		if (!resizedContext) return

		//actual image dimensions
		resizedCanvas.width = DOMsourceImage.naturalWidth
		resizedCanvas.height = DOMsourceImage.naturalHeight

		resizedContext.drawImage(
			canvas,
			0,
			0,
			resizedCanvas.width,
			resizedCanvas.height,
		)

		const canvasUrl = resizedCanvas.toDataURL(
			selectedFormat,
			selectedQuality,
		)
		const anchor = document.createElement('a')
		anchor.href = canvasUrl
		anchor.download =
			selectedFile?.name.replace(/\.[^/.]+$/, '') || 'downloadedImage'
		anchor.click()
		anchor.remove()
	}

	return (
		<div className={styles.container}>
			<div>
				<label>Format</label>
				<div className={`btn-group ${styles.buttonGroup}`}>
					<button
						className={`btn ${
							selectedFormat === 'image/jpeg' && 'btn-active'
						} ${styles.button}`}
						onClick={() => setSelectedFormat('image/jpeg')}
					>
						JPEG
					</button>
					<button
						className={`btn ${
							selectedFormat === 'image/png' && 'btn-active'
						} ${styles.button}`}
						onClick={() => setSelectedFormat('image/png')}
					>
						PNG
					</button>
					<button
						className={`btn ${
							selectedFormat === 'image/webp' && 'btn-active'
						} ${styles.button}`}
						onClick={() => setSelectedFormat('image/webp')}
					>
						WebP
					</button>
				</div>
			</div>

			<div>
				<label>Quality</label>
				<div className={`btn-group ${styles.buttonGroup}`}>
					<button
						className={`btn ${
							selectedQuality === 0.5 && 'btn-active'
						} ${styles.button}`}
						onClick={() => setSelectedQuality(0.5)}
					>
						Medium
					</button>
					<button
						className={`btn ${
							selectedQuality === 0.75 && 'btn-active'
						} ${styles.button}`}
						onClick={() => setSelectedQuality(0.75)}
					>
						High
					</button>
					<button
						className={`btn ${
							selectedQuality === 1 && 'btn-active'
						} ${styles.button}`}
						onClick={() => setSelectedQuality(1)}
					>
						Max
					</button>
				</div>
			</div>

			<div>
				<div className="divider"></div>
				<button
					className={`btn ${styles.button} ${styles.downloadButton}`}
					onClick={handleDownload}
				>
					<DownloadIcon />
					<span>Download</span>
				</button>
			</div>
		</div>
	)
}

export default ExportController
