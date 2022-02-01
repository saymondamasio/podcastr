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
  playList: (list: Episode[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  hasPrevious: boolean
  hasNext: boolean
  isLooping: boolean
  toggleLoop: () => void
  toggleShuffle: () => void
  isShuffling: boolean
  clearPlayerState: () => void
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
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  const hasPrevious = !!episodeList[currentEpisodeIndex - 1]
  const hasNext = isShuffling || !!episodeList[currentEpisodeIndex + 1]

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      )
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  function playPrevious() {
    if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1)
  }

  return (
    <PlayerContext.Provider
      value={{
        setIsPlaying,
        playList,
        togglePlay,
        isPlaying,
        currentEpisodeIndex,
        episodeList,
        play,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        isShuffling,
        toggleShuffle,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
