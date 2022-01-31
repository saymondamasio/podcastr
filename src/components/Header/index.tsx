import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './styles.module.scss'

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR })

  return (
    <header className={styles.container}>
      <img src="assets/logo.svg" alt="Podcastr" />

      <p>O melhor para ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  )
}
