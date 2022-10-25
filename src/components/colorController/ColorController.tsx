import { useEffect } from 'react'
import { useAtomValue, useAtom } from 'jotai'
import {
	computedPixelsAtom,
	selectedPixelAtom,
	textureModificationsAtom,
} from '../../state/atoms'

const ColorController = () => {
	const computedPixels = useAtomValue(computedPixelsAtom)
	const [selectedPixel] = useAtom(selectedPixelAtom)
	const [textureModifications, setTextureModifications] = useAtom(
		textureModificationsAtom,
	)

	if (!computedPixels)
		return <div>upload an image first to change its colors</div>

	if (selectedPixel.x === -1 && selectedPixel.y === -1)
		return <div>select a pixel to change its color value</div>

	return (
		<div>
			<p>
				<b>Selected Pixel:</b>
			</p>
			<p>X: {selectedPixel.x}</p>
			<p>Y: {selectedPixel.y}</p>
		</div>
	)
}

export default ColorController
