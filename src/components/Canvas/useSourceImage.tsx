import { useEffect, useState } from 'react'

const useDOMSourceImage = () => {
	const [DOMsourceImage, setDOMsourceImage] = useState<Element | null>(null)

	useEffect(() => {
		setDOMsourceImage(document.querySelector('#canvasSourceImage'))
	}, [DOMsourceImage])

	return DOMsourceImage
}

export default useDOMSourceImage
