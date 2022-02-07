import Cookies from 'js-cookie'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Response<T> = [T, Dispatch<SetStateAction<T>>]

export function usePersistedState<T>(
  key: string,
  initialState: T
): Response<T> {
  const [state, setState] = useState<T>(() => {
    const value = Cookies.get(key)

    if (value) {
      return JSON.parse(value)
    }

    return initialState
  })

  useEffect(() => {
    Cookies.set(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
