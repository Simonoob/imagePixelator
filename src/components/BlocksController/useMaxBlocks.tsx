import { useEffect, useState } from 'react'
import useDOMSourceImage from '../Canvas/useSourceImage'
import { useAtom } from 'jotai'
import { pixelInputValueAtom } from '../../state/atoms'

const useMaxBlocks = () => {
	const defaultMaxBlocks = 120
	const sourceImage = useDOMSourceImage()
	const [blocks, setBlocks] = useAtom(pixelInputValueAtom)
	const [maxBlocks, setMaxBlocks] = useState(defaultMaxBlocks)

	const getMinImageSide = (sourceImage: HTMLImageElement): number => {
		return Math.min(sourceImage.naturalWidth, sourceImage.naturalHeight)
	}

	useEffect(() => {
		if (!sourceImage) {
			setMaxBlocks(defaultMaxBlocks)
			blocks > defaultMaxBlocks && setBlocks(defaultMaxBlocks)
		} else {
			const minImageSide = getMinImageSide(sourceImage)
			setMaxBlocks(minImageSide)
			if (blocks > minImageSide) setBlocks(minImageSide)
		}
	}, [blocks, setBlocks, sourceImage])

	return maxBlocks
}

export default useMaxBlocks
