/* eslint-disable @next/next/no-img-element */
import { UploadIcon, TrashIcon, ImageIcon } from '@radix-ui/react-icons'
import { sourceImageAtom } from '../../state/atoms'
import { useAtom } from 'jotai'
import styles from './BaseImageInput.module.scss'

const BaseImageInput = ({
	label,
	showAcceptedFormats,
	showIcon,
}: {
	label: string
	showAcceptedFormats?: boolean
	showIcon?: boolean
}) => {
	const [selectedFile, setSelectedFile] = useAtom(sourceImageAtom)
	return (
		<>
			{!selectedFile ? (
				<label className={styles.toUpload}>
					<div id="container">
						{showIcon && <UploadIcon />}
						<p>{label}</p>
						{showAcceptedFormats && <p>PNG, JPG, JPEG</p>}
					</div>
					<input
						id="dropzone-file"
						type="file"
						className="hidden"
						accept="image/png, image/jpeg, image/jpg"
						onChange={e =>
							e.target.files && setSelectedFile(e.target.files[0])
						}
					/>
				</label>
			) : (
				<div className={styles.uploaded}>
					<label>
						Uploaded Image
						<ImageIcon />
					</label>
					<div className={styles.uploadedContainer}>
						<img
							src={URL.createObjectURL(selectedFile)}
							alt="uploaded image"
						/>
						<span>{selectedFile.name}</span>
						<button
							className={styles.deleteIcon}
							onClick={() => setSelectedFile(undefined)}
						>
							<TrashIcon className="h-5 w-5" />
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default BaseImageInput
