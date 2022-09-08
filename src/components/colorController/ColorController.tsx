import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { computedPixelsAtom } from '../../state/atoms'

const ColorController = () => {
	const computedPixels = useAtomValue(computedPixelsAtom)

	useEffect(() => {
		if (!computedPixels) return
		console.log(computedPixels.x * computedPixels.y)
	}, [computedPixels])
	return <div>ColorController</div>
}

export default ColorController
