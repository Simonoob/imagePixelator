import React, { useState } from 'react'
import { GearIcon, BlendingModeIcon, RocketIcon } from '@radix-ui/react-icons'
import styles from './ControllersTabs.module.scss'
import BlocksController from '../BlocksController/BlocksController'
import ExportController from '../ExportController/ExportController'
import ImageInput from '../BaseImageInput/BaseImageInput'
import { sourceImageFile } from '../../state/atoms'
import { useAtomValue } from 'jotai'

const ControllersTabs = () => {
	const [activeTab, setActiveTab] = useState('general')
	const selectedFile = useAtomValue(sourceImageFile)

	const tabs = [
		{
			title: 'general',
			icon: <GearIcon />,
			content: (
				<div className="grid gap-y-5">
					<ImageInput />
					<BlocksController min={1} initialValue={36} />
				</div>
			),
		},
		{
			title: 'Export Image',
			icon: <RocketIcon />,
			content: <ExportController />,
			disabled: !Boolean(selectedFile),
		},
	]

	return (
		<div className={styles.ControllersTabs}>
			<nav>
				{tabs.map(tab => (
					<button
						className={`${styles.tab} ${
							activeTab === tab.title
								? styles['-active']
								: undefined
						} ${tab.disabled ? styles['-disabled'] : undefined}`}
						key={tab.title}
						onClick={() => setActiveTab(tab.title)}
					>
						{tab.title}
						{tab.icon}
					</button>
				))}
			</nav>
			{tabs.find(tab => activeTab === tab.title && !tab.disabled)
				?.content || <p>Not available</p>}
		</div>
	)
}

export default ControllersTabs
