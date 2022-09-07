import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { sourceImageLoadedAtom } from '../../state/atoms'

const useDOMSourceImage = () => {
	const [DOMsourceImage, setDOMsourceImage] =
		useState<HTMLImageElement | null>(null)
	const sourceImageLoaded = useAtomValue(sourceImageLoadedAtom)

	useEffect(() => {
		setDOMsourceImage(
			document.querySelector<HTMLImageElement>('#canvasSourceImage'),
		)
	}, [DOMsourceImage, sourceImageLoaded])

	return DOMsourceImage
}

export default useDOMSourceImage
