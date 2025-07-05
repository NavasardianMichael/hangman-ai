'use client'

import { FC, useEffect, useRef } from 'react'
import { canvasCreator } from 'helpers/utils/hangman'
import styles from './styles.module.css'

type TProps = {
  step: number
}

export const Hangman: FC<TProps> = ({ step }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const hangmanDrawingSteps = canvasCreator(canvasRef?.current)
    hangmanDrawingSteps?.[step]?.()
  }, [step])

  return (
    <div className={styles.hangman}>
      <canvas width={250} height={200} ref={canvasRef} />
    </div>
  )
}
