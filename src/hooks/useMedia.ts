import { useEffect, useState } from 'react'

// import { Container } from './styles';

function useMedia(media: string) {
  const [match, setMatch] = useState<boolean>()

  useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media)
      setMatch(matches)
    }
    changeMatch()

    typeof window !== 'undefined' &&
      window.matchMedia &&
      window.addEventListener('resize', changeMatch)

    return () => {
      window.removeEventListener('resize', changeMatch)
    }
  }, [media])
  return match
}

export default useMedia
