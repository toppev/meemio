import { useEffect, useRef } from 'react'

const useInterval = (callback, delay = 4000) => {

  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }
    let id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}

export { useInterval }