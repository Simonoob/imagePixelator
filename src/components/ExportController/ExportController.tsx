import React from 'react'
import { DownloadIcon } from '@radix-ui/react-icons'
import styles from './ExportController.module.scss'

const ExportController = () => {
	return (
		<button className={styles.button}>
			<DownloadIcon />
			<span>Download</span>
		</button>
	)
}

export default ExportController
