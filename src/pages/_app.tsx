import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import styles from '../styles/App.module.scss'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp
