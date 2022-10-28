import React, { useState } from 'react'
import { DownloadIcon } from '@radix-ui/react-icons'
import styles from './ExportController.module.scss'
import { sourceImageFile } from '../../state/atoms'
import { useAtomValue } from 'jotai'

const ExportController = () => {
	const [selectedFormat, setSelectedFormat] = useState('image/jpeg')
	const [selectedQuality, setSelectedQuality] = useState(1)
	const selectedFile = useAtomValue(sourceImageFile)

	const handleDownload = () => {
		const canvas = document.querySelector('#targetCanvas')
		if (!(canvas instanceof HTMLCanvasElement)) return
		let canvasUrl = canvas.toDataURL(selectedFormat, selectedQuality)
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
