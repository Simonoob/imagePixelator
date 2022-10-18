import { useEffect } from 'react'
import { useAtomValue, useAtom } from 'jotai'
import { computedPixelsAtom, selectedPixelAtom } from '../../state/atoms'

const ColorController = () => {
	const computedPixels = useAtomValue(computedPixelsAtom)
    const [selectedPixel,] = useAtom(selectedPixelAtom)
	if (!computedPixels) return <div>upload an image first to change its colors</div>
    if (selectedPixel.x===-1 && selectedPixel.y===-1) return <div>select a pixel to change its color value</div>

	return <div>ColorController</div>
}

export default ColorController
