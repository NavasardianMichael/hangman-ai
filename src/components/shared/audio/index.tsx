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
    if (!audio) return;

    if (deps.every((dep) => !dep)) return

    setTimeout(() => {
      audio.play()
    }, 100)

    return () => {
      if (!audio) return;
      audio.pause()
      audio.currentTime = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return <audio ref={audioRef} src={src} />
}