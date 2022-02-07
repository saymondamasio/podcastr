import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR })
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(media.matches)

    function handleMediaChange(media: MediaQueryListEvent) {
      setIsDarkMode(media.matches)
    }

    media.addEventListener('change', handleMediaChange)

    return () => media.removeEventListener('change', handleMediaChange)
  }, [])

  return (
    <header className={styles.container}>
      <Link href="/">
        <a>
          <img
            src={isDarkMode ? '/assets/logo-dark.svg' : '/assets/logo.svg'}
            alt="Podcastr"
          />
        </a>
      </Link>

      <p>O melhor para ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  )
}
