import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '../../services/api'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'
import styles from './episode.module.scss'

type Episode = {
  id: string
  title: string
  members: string
  publishedAtFormatted: string
  thumbnail: string
  description: string
  url: string
  durationFormatted: string
}

interface Props {
  episode: Episode
}

export default function Episode({ episode }: Props) {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.thumbnailContainer}>
          <Link href="/" passHref>
            <button type="button">
              <img src="/assets/arrow-left.svg" alt="Voltar" />
            </button>
          </Link>

          <Image
            src={episode.thumbnail}
            width={700}
            height={160}
            objectFit="cover"
            alt={episode.title}
          />

          <button type="button">
            <img src="/assets/play.svg" alt="Tocar episodio" />
          </button>
        </div>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAtFormatted}</span>
          <span>{episode.durationFormatted}</span>
        </header>

        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const episodes = await api.get('/episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const paths = episodes.data.map((episode: any) => ({
    params: {
      slug: episode.id,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await api.get(`/episodes/${params?.slug}`)

  const episode = {
    ...data,
    publishedAt: data.published_at,
    publishedAtFormatted: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationFormatted: convertDurationToTimeString(Number(data.file.duration)),
    url: data.file.url,
  }

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
