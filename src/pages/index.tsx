import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '../services/api'
import styles from '../styles/home.module.scss'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

type Episode = {
  id: string
  title: string
  members: string
  publishedAtFormatted: string
  thumbnail: string
  url: string
  durationFormatted: string
}

interface Props {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
}

const Home: NextPage<Props> = ({ latestEpisodes, allEpisodes }) => {
  console.log(latestEpisodes)

  return (
    <div className={styles.container}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map(episode => (
            <li key={episode.id}>
              <div className={styles.thumbnail}>
                <Image
                  width={192}
                  height={192}
                  objectFit="cover"
                  src={episode.thumbnail}
                  alt={episode.title}
                />
              </div>
              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAtFormatted}</span>
                <span>{episode.durationFormatted}</span>
              </div>

              <button type="button">
                <img src="/assets/play-green.svg" alt="Tocar episodio" />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos lançamentos</h2>
        <table cellSpacing={0}>
          <thead>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </thead>
          <tbody>
            {allEpisodes.map(episode => (
              <tr key={episode.id}>
                <td style={{ width: 80 }}>
                  <div className={styles.thumbnail}>
                    <Image
                      src={episode.thumbnail}
                      width={120}
                      height={120}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </div>
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100, textTransform: 'capitalize' }}>
                  {episode.publishedAtFormatted}
                </td>
                <td>{episode.durationFormatted}</td>
                <td>
                  <button type="button">
                    <img src="/assets/play-green.svg" alt="Tocar episodio" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const episodes = data.map((episode: any) => ({
    ...episode,
    publishedAt: episode.published_at,
    publishedAtFormatted: format(parseISO(episode.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: Number(episode.file.duration),
    durationFormatted: convertDurationToTimeString(
      Number(episode.file.duration)
    ),
    url: episode.file.url,
  }))

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
