'use client'

import { MouseEventHandler, useState } from 'react'
// import WritingAudio from 'assets/audio/writing.mp3'
import { selectGameSettings } from 'store/app/selectors'
import { setAppOptions } from 'store/app/slice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { StageComponent } from 'helpers/types/stage'
import { LETTERS } from 'helpers/constants/app'
import { combineClassNames } from 'helpers/utils/styles'
import { Audio } from 'components/shared/audio'
import { CustomButton } from 'components/shared/customButton'
import styles from './styles.module.css'

export const Composition: StageComponent = ({ toNextPage }) => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(selectGameSettings)

  const [word, setWord] = useState('')

  const handleAlphabetLetterClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setWord(word + e.currentTarget.name)
  }

  const handleRemoveCharClick: MouseEventHandler<HTMLButtonElement> = () => {
    setWord((prev) => prev.substring(0, prev.length - 1))
  }

  const handleStartDiscovery: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      setAppOptions({
        currentWord: word,
      })
    )
    toNextPage()
  }

  return (
    <div className={styles.composition}>
      <div className={styles.word}>
        {Array.from(word).map((letter, i) => {
          return (
            <span key={i} className={styles.letter}>
              {letter}
            </span>
          )
        })}
      </div>
      <div className={styles.alphabet}>
        {LETTERS.map((letter) => {
          return (
            <button className={styles.letter} key={letter} name={letter} onClick={handleAlphabetLetterClick}>
              {letter}
            </button>
          )
        })}
        <button
          disabled={!word.length}
          className={combineClassNames(styles.letter, styles.remove)}
          key="✕"
          name="✕"
          onClick={handleRemoveCharClick}
        >
          ✕
        </button>
      </div>
      <CustomButton disabled={word.length < settings.minLettersCount} onClick={handleStartDiscovery}>
        Անցնել գուշակելուն
      </CustomButton>
      <Audio deps={[word]} src={'/writing.mp3'} />
    </div>
  )
}
