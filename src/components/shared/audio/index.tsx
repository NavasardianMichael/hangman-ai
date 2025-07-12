'use client'

import { FC, MediaHTMLAttributes, useEffect, useRef } from 'react'

type TProps = {
  deps: unknown[]
  src: MediaHTMLAttributes<HTMLAudioElement>['src']
}

export const Audio: FC<TProps> = ({ deps, src }) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setTimeout(() => {
      audioRef?.current?.load()
    }, 100) // Delay to ensure the audio element is ready
  }, [src])

  useEffect(() => {
    const audio = audioRef?.current
    try {
      if (!audio) return

      if (deps.every((dep) => !dep)) return

      audio?.play?.()
    } catch (error) {
      console.error('Error playing audio:', error)
    }

    return () => {
      if (!audio) return
      audio.pause()
      audio.currentTime = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return <audio ref={audioRef} src={src} />
}
