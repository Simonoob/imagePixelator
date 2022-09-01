import React, { useState } from 'react'
import { GearIcon } from '@radix-ui/react-icons'
import ControllersTabs from '../ControllersTab/ControllersTabs'
import styles from './Drawer.module.scss'

const Drawer = () => {
	const [open, setOpen] = useState(true)
	return (
		<div className={styles.Drawer}>
			{/* <button
				className="flex gap-x-2 lg:hidden h-8 w-full rounded-t-2xl items-center justify-center bg-primary text-primary-content hover:bg-primary-focus"
				onClick={() => setOpen(!open)}
			>
				Settings <GearIcon />
			</button> */}
			<ControllersTabs />
		</div>
	)
}

export default Drawer
