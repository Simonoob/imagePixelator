import React from 'react'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import debounce from 'lodash/debounce'
import { useAtom } from 'jotai'
import { blocksAtom } from '../../state/atoms'
import styles from './BlocksController.module.scss'

interface Props {
	initialValue: number
	min: number
	max: number
	step: number
}

const BlocksController = ({ min, max, step }: Props) => {
	const [blocks, setBlocks] = useAtom(blocksAtom)

	return (
		<div className={styles.root}>
			<label>
				blocks
				<div
					className="tooltip tooltip-right"
					data-tip="Along the shortest side"
				>
					<InfoCircledIcon className="h-5 w-5" />
				</div>
			</label>

			<div className="flex flex-nowrap items-center justify-between gap-x-3">
				<input
					type="range"
					defaultValue={blocks}
					min={min}
					max={max}
					step={step}
					onChange={debounce(
						e => setBlocks(Number(e.target.value)),
						300,
					)}
					className="w-full h-1 appearance-none cursor-pointer col-span-7"
				></input>
				<span>{blocks}</span>
			</div>
		</div>
	)
}

export default BlocksController
