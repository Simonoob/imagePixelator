import type { NextPage } from 'next'
import Head from 'next/head'
import Drawer from '../components/Drawer/Drawer'
import Canvas from '../components/Canvas/Canvas'
import styles from '../styles/Index.module.scss'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Image Pixelator</title>
				<meta
					name="description"
					content="Online image pixelation tool powered by GLSL shaders."
				/>
				<meta property="og:image" content="preview.jpeg" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.mainContainer}>
				<div className={styles.mainPageContent}>
					<nav>
						<h1>
							<span>
								<span className="text-accent">P</span>
								<span className="text-secondary">i</span>
								<span className="text-info">x</span>
								<span className="text-warning">e</span>
								<span className="text-error">l</span>
							</span>
							ator
						</h1>
					</nav>
					<Canvas />
				</div>
				<Drawer />
			</main>
		</>
	)
}

export default Home
