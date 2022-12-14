/* eslint-disable @next/next/no-img-element */
import { UploadIcon, TrashIcon, ImageIcon } from '@radix-ui/react-icons'
import { sourceImageFile, sourceImageLoadedAtom } from '../../state/atoms'
import { useAtom, useSetAtom } from 'jotai'
import styles from './BaseImageInput.module.scss'
import { useState } from 'react'

const BaseImageInput = () => {
	const [selectedFile, setSelectedFile] = useAtom(sourceImageFile)
	const setImageLoaded = useSetAtom(sourceImageLoadedAtom)
	const [dragging, setDragging] = useState(false)
	return (
		<>
			{!selectedFile ? (
				<label
					className={`${styles.toUpload} ${
						dragging ? styles.dragging : undefined
					}`}
				>
					<div id="container">
						{!dragging && <UploadIcon />}
						<p>
							{!dragging
								? 'Click or drag & drop an image to upload'
								: 'Drop Here'}
						</p>
						{!dragging && <p>PNG, JPG, JPEG</p>}
					</div>
					<input
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
					/>
				</label>
			) : (
				<div className={styles.uploaded}>
					<label>
						Uploaded Image
						<ImageIcon />
					</label>
					<div
						className={`${styles.uploadedContainer} tooltip`}
						data-tip={selectedFile.name}
					>
						<img
							src={URL.createObjectURL(selectedFile)}
							alt="uploaded image"
						/>
						<span>{selectedFile.name}</span>
						<button
							className={styles.deleteIcon}
							onClick={() => {
								setSelectedFile(undefined)
								setImageLoaded(false)
							}}
						>
							<TrashIcon />
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default BaseImageInput
