'use client'

import { FC, useEffect, useRef } from 'react'
import { canvasCreator } from 'helpers/utils/hangman'
import styles from './styles.module.css'

type TProps = {
  step: number
}

export const Hangman: FC<TProps> = ({ step }) => {
  const canvasRef = useRef(null)
  const prevStepsCount = useRef(0)

  useEffect(() => {
  }, [step])

  useEffect(() => {
    const hangmanDrawingSteps = canvasCreator(canvasRef?.current)
    if (step > prevStepsCount.current + 1) {
      for (let i = 0; i < step; i++) {
        hangmanDrawingSteps?.[i]?.()
      }
    } else {
      hangmanDrawingSteps?.[step]?.()
    }
    prevStepsCount.current = step
  }, [step])

  return (
    <div className={styles.hangman}>
      <canvas width={250} height={200} ref={canvasRef} />
    </div>
  )
}
