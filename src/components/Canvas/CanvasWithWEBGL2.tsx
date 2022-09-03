import React, { RefObject } from 'react'

const CanvasWithWEBGL2 = ({
	refObject,
}: {
	refObject: RefObject<HTMLCanvasElement>
}) => {
	return <canvas ref={refObject}></canvas>
}

export default CanvasWithWEBGL2
