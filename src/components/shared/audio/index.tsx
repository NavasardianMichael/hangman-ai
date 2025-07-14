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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, audioRef?.current])

  useEffect(() => {
    if (deps.every((dep) => !dep)) return
    console.log({ deps })

    setTimeout(() => {
      audioRef?.current?.play()
    }, 100)

    return () => {
      if (!audioRef?.current) return
      audioRef.current.pause()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current.currentTime = 0
    }
  }, [deps])

  return <audio ref={audioRef} src={src} />
}