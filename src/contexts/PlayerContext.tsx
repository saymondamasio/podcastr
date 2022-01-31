import { createContext, ReactNode, useState } from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

interface PlayerContextData {
  isPlaying: boolean
  episodeList: Episode[]
  currentEpisodeIndex: number
  play: (episode: Episode) => void
  togglePlay: () => void
  setIsPlaying: (isPlaying: boolean) => void
}

export const PlayerContext = createContext<PlayerContextData>(
  {} as PlayerContextData
)

interface Props {
  children: ReactNode
}

export function PlayerProvider({ children }: Props) {
  const [episodeList, setEpisodeList] = useState<Episode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  return (
    <PlayerContext.Provider
      value={{
        setIsPlaying,
        togglePlay,
        isPlaying,
        currentEpisodeIndex,
        episodeList,
        play,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
