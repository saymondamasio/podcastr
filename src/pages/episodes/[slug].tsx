import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'
import { connectDatabase } from '../../services/mongo'
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
  duration: number
}

interface Props {
  episode: Episode
}

export default function Episode({ episode }: Props) {
  const { play } = useContext(PlayerContext)

  return (
    <div className={styles.container}>
      <Head>
        <title>Home | {episode.title}</title>
      </Head>
      <div>
        <div className={styles.thumbnailContainer}>
          <Link href="/" passHref>
            <button type="button">
              <img src="/assets/arrow-left.svg" alt="Voltar" />
            </button>
          </Link>

          <div className={styles.thumbnail}>
            <Image
              src={episode.thumbnail}
              width={700}
              height={160}
              layout="fill"
              objectFit="cover"
              alt={episode.title}
            />
          </div>

          <button type="button" onClick={() => play(episode)}>
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
  const db = await connectDatabase(process.env.MONGODB_URL!)
  const episodesCollection = db.collection('episodes')

  const episodes = await episodesCollection
    .find()
    .sort({ published_at: -1 })
    .limit(2)
    .toArray()

  const paths = episodes.map((episode: any) => ({
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
  const db = await connectDatabase(process.env.MONGODB_URL!)
  const episodesCollection = db.collection('episodes')

  const data = JSON.parse(
    JSON.stringify(await episodesCollection.findOne({ id: params?.slug }))
  )

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
