import React from 'react'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { blocksAtom } from '../../state/atoms'
import styles from './BlocksController.module.scss'
import useMaxBlocks from './useMaxBlocks'

interface Props {
	initialValue: number
	min: number
}

const BlocksController = ({ min }: Props) => {
	const [blocks, setBlocks] = useAtom(blocksAtom)
	const maxBlocks = useMaxBlocks()

	return (
		<div className={styles.root}>
			<label>
				blocks
				<div className="tooltip" data-tip="Along the shortest side">
					<InfoCircledIcon />
				</div>
			</label>

			<div className={styles.inputContainer}>
				<input
					className={styles.rangeInput}
					type="range"
					value={blocks}
					min={min}
					max={maxBlocks}
					step={1}
					onChange={e => setBlocks(Number(e.target.value))}
				></input>
				<input
					className={styles.numberInput}
					type="number"
					value={blocks}
					min={0}
					max={maxBlocks}
					step={1}
					onChange={e => {
						let targetValue = Number(e.target.value)
						if (targetValue > maxBlocks) targetValue = maxBlocks
						if (targetValue < min) targetValue = min
						setBlocks(targetValue)
					}}
				></input>
			</div>
		</div>
	)
}

export default BlocksController
