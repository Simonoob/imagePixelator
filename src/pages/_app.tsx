import '../styles/globals.scss'
import type { AppType } from 'next/dist/shared/lib/utils'
import { usePanelbear } from '@panelbear/panelbear-nextjs'

const MyApp: AppType = ({ Component, pageProps }) => {
	usePanelbear('5LhAmT00vw7')
	return <Component {...pageProps} />
}

export default MyApp
