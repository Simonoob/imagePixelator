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
				<div className="tooltip" data-tip="Along the shortest side">
					<InfoCircledIcon />
				</div>
			</label>

			<div className={styles.inputContainer}>
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
				></input>
				<span>{blocks}</span>
			</div>
		</div>
	)
}

export default BlocksController
