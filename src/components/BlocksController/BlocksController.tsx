import React from 'react'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { blocksAtom } from '../../state/atoms'
import styles from './BlocksController.module.scss'
import useMaxBlocks from './useMaxBlocks'

interface Props {
	initialValue: number
	min: number
	step: number
}

const BlocksController = ({ min, step }: Props) => {
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
					type="range"
					defaultValue={blocks}
					min={min}
					max={maxBlocks}
					step={step}
					onChange={e => setBlocks(Number(e.target.value))}
				></input>
				<span>{blocks}</span>
			</div>
		</div>
	)
}

export default BlocksController
