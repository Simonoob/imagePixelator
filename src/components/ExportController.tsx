import React from 'react'
import { DownloadIcon } from '@radix-ui/react-icons'

const ExportController = () => {
	return (
		<div className="w-full min-h-full grid justify-center align-middle">
			<button className="bg-red-500 text-white hover:bg-red-600 font-bold py-2 px-4 rounded inline-flex items-center gap-x-2">
				<DownloadIcon />
				<span>Download</span>
			</button>
		</div>
	)
}

export default ExportController
