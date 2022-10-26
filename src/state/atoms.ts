import { atom } from 'jotai'

export const sourceImageFile = atom<File | undefined>(undefined)
export const sourceImageLoadedAtom = atom(false)

export const pixelInputValueAtom = atom(36)
export const computedPixelsAtom = atom(get => {
	if (!get(sourceImageLoadedAtom)) return undefined
	const initialPixels = get(pixelInputValueAtom)

	const computedBlocks = {
		x: initialPixels,
		y: initialPixels,
	}

	const DOMsourceImage =
		document.querySelector<HTMLImageElement>('#canvasSourceImage')
	if (!DOMsourceImage) return
	//force block to be squared
	const sourceImageDimensions = {
		width: DOMsourceImage.naturalWidth,
		height: DOMsourceImage.naturalHeight,
	}
	const canvasRatio =
		sourceImageDimensions.width / sourceImageDimensions.height

	canvasRatio > 1.0
		? (computedBlocks.x *= canvasRatio)
		: (computedBlocks.y /= canvasRatio)

	return computedBlocks
})

export const selectionPointsAtom = atom([
	{ x: 0.25, y: 0.25 },
	{ x: 0.75, y: 0.75 },
])

export const DOMcanvasDimensionsAtom = atom({
	width: 0,
	height: 0,
})
