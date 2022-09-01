import React, { useState } from 'react'
import { GearIcon, BlendingModeIcon, RocketIcon } from '@radix-ui/react-icons'
import styles from './ControllersTabs.module.scss'
import BlocksController from '../BlocksController/BlocksController'
import ExportController from '../ExportController'
import ImageInput from '../BaseImageInput/BaseImageInput'

const ControllersTabs = () => {
	const [activeTab, setActiveTab] = useState('general')

	const tabs = [
		{
			title: 'general',
			icon: <GearIcon />,
			content: (
				<div className="grid gap-y-5">
					<ImageInput
						label="Click or drag & drop an image to upload"
						showAcceptedFormats
						showIcon
					/>
					<BlocksController
						min={4}
						max={120}
						step={4}
						initialValue={24}
					/>
				</div>
			),
		},
		{
			title: 'Color',
			icon: <BlendingModeIcon />,
			content: <div>Color</div>,
		},
		{
			title: 'Compare & Export',
			icon: <RocketIcon />,
			content: <ExportController />,
		},
	]

	return (
		<div className={styles.ControllersTabs}>
			<nav>
				{tabs.map(tab => (
					<button
						className={`${styles.tab} ${
							activeTab === tab.title && styles['-active']
						}`}
						key={tab.title}
						onClick={() => setActiveTab(tab.title)}
					>
						{tab.title}
						{tab.icon}
					</button>
				))}
			</nav>
			<div className="flex-1 pb-20">
				{tabs.find(tab => activeTab === tab.title)?.content}
			</div>
		</div>
	)
}

export default ControllersTabs
