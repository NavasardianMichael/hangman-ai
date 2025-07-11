'use client'

import { FC, MediaHTMLAttributes, useEffect, useRef } from 'react'

type TProps = {
  deps: unknown[]
  src: MediaHTMLAttributes<HTMLAudioElement>['src']
}

export const Audio: FC<TProps> = ({ deps, src }) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    audioRef?.current?.load()
  }, [src])

  useEffect(() => {
    const audio = audioRef?.current
    if (!audio) return

    if (deps.every((dep) => !dep)) return

    // Handle the promise returned by play() to catch the AbortError
    audio.play().catch((error) => {
      // Ignore AbortError as it's expected when cleanup pauses before playback starts
      if (error.name !== 'AbortError') {
        console.error('Audio playback failed:', error)
      }
    })

    return () => {
      if (!audio) return
      audio.pause()
      audio.currentTime = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return <audio ref={audioRef} src={src} />
}
