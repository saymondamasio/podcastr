import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerProvider } from '../contexts/PlayerContext'
import styles from '../styles/app.module.scss'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayerProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerProvider>
  )
}

export default MyApp
