'use client'

import { MouseEventHandler, useState } from 'react'
import { selectGameSettings } from 'store/app/selectors'
import { setAppOptions } from 'store/app/slice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { LETTERS, SPACE_CHAR } from 'helpers/constants/app'
import { StageComponent } from 'helpers/types/stage'
import { normalizeSpaces } from 'helpers/utils/commons'
import { combineClassNames } from 'helpers/utils/styles'
import { CustomButton } from 'components/shared/customButton'
import styles from './styles.module.css'

export const Composition: StageComponent = ({ toNextPage }) => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(selectGameSettings)

  const [word, setWord] = useState('')

  const handleAlphabetLetterClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setWord(word + e.currentTarget.name)
  }

  const handleAddSpaceCharClick: MouseEventHandler<HTMLButtonElement> = () => {
    setWord((prev) => prev + ' ')
  }
  const handleRemoveCharClick: MouseEventHandler<HTMLButtonElement> = () => {
    setWord((prev) => prev.substring(0, prev.length - 1))
  }

  const handleStartDiscovery: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      setAppOptions({
        currentWord: normalizeSpaces(word),
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
          disabled={!word.length || word.endsWith(' ')}
          className={combineClassNames(styles.letter, styles.space)}
          key={SPACE_CHAR}
          name=" "
          onClick={handleAddSpaceCharClick}
        >
          {SPACE_CHAR}
        </button>
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
    </div>
  )
}
