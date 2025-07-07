'use client'

import { Statistic } from 'antd'
import { Audio } from 'components/shared/audio'
import { CustomButton } from 'components/shared/customButton'
import { LETTERS, PLAY_MODES } from 'helpers/constants/app'
import { StageComponent } from 'helpers/types/stage'
import { combineClassNames } from 'helpers/utils/styles'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { MouseEventHandler, useEffect, useMemo, useState } from 'react'
import { selectAppOptions } from 'store/app/selectors'
import { incrementCurrentPlayerPoint } from 'store/app/slice'
import { Hangman } from './hangman'
import styles from './styles.module.css'

type ExtendedLetters = (typeof LETTERS)[number] | ' '

export const Discovery: StageComponent = ({ toNextPage }) => {
  const dispatch = useAppDispatch()
  const { currentWord, mode, settings } = useAppSelector(selectAppOptions)
  const currentWordLettersArr = useMemo(() => {
    return Array.from(currentWord.toUpperCase()) as ExtendedLetters[number][]
  }, [currentWord])
  console.log({ currentWordLettersArr })

  const [guessedLetters, setGuessedLetters] = useState<{
    [key in ExtendedLetters[number]]?: boolean
  }>({})
  const [wastedLetters, setWastedLetters] = useState<{
    [key in ExtendedLetters[number]]?: boolean
  }>({})

  const wastedLettersCount = useMemo(() => {
    return Object.keys(wastedLetters).length
  }, [wastedLetters])

  const isWordGuessed = useMemo(() => {
    return currentWordLettersArr.filter((letter) => letter !== ' ').every((letter) => guessedLetters[letter])
  }, [currentWordLettersArr, guessedLetters])

  const countdownDeadline = useMemo(() => {
    if (isWordGuessed || wastedLettersCount > 6) return Date.now()
    if (!settings.withTimeLimit || settings.timeLimit <= 0) return 0
    return Date.now() + settings.timeLimit * 1000
  }, [isWordGuessed, settings.timeLimit, settings.withTimeLimit, wastedLettersCount])

  const handleAlphabetLetterClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const letter = e.currentTarget.name.toUpperCase()

    if (!currentWord.toUpperCase().includes(letter)) {
      setWastedLetters((prev) => ({ ...prev, [letter]: true }))
      // if(Object.keys(wastedLetters).length + 1 >= 7) {
      //   toNextPage()
      // }
      return
    }

    setGuessedLetters((prev) => ({ ...prev, [letter]: true }))
  }

  const handleShowSummary = () => {
    toNextPage()
  }

  useEffect(() => {
    if (isWordGuessed) dispatch(incrementCurrentPlayerPoint())
  }, [currentWordLettersArr, dispatch, guessedLetters, isWordGuessed])

  return (
    <div className={styles.discovery}>
      {settings.withTimeLimit && settings.timeLimit > 0 && (
        <Statistic.Timer
          style={{
            textAlign: 'center',
            position: 'absolute',
            top: 0,
            right: 10,
            fontVariantNumeric: 'tabular-nums',
          }}
          type="countdown"
          value={countdownDeadline}
          onFinish={() => toNextPage()}
        />
      )}
      <div
        className={combineClassNames(
          styles.word,
          isWordGuessed ? styles.success : undefined,
          !isWordGuessed && wastedLettersCount > 6 ? styles.fail : undefined
        )}
      >
        {currentWordLettersArr.map((letter, i) => {
          const isSpace = letter === ' '

          return (
            <span
              key={i}
              className={combineClassNames(
                styles.cell,
                isSpace && styles.space,
                isWordGuessed || (!isWordGuessed && (guessedLetters[letter] || wastedLettersCount > 6))
                  ? styles.guessed
                  : undefined
              )}
            >
              <span>{letter}</span>
            </span>
          )
        })}
      </div>
      <Audio deps={[wastedLettersCount, currentWordLettersArr]} src={'/scribble.mp3'} />
      <Audio deps={[isWordGuessed]} src={'/win.mp3'} />
      <Audio deps={[!isWordGuessed && wastedLettersCount > 6]} src={'/loss.mp3'} />
      <Audio deps={[Object.values(guessedLetters).length]} src={'/correct.mp3'} />
      <Hangman step={wastedLettersCount} />
      <div
        className={combineClassNames(
          styles.alphabet,
          isWordGuessed || wastedLettersCount > 6 ? styles.disabled : undefined
        )}
      >
        {LETTERS.map((letter) => {
          return (
            <button
              key={letter}
              name={letter}
              disabled={guessedLetters[letter] || wastedLetters[letter]}
              className={combineClassNames(
                styles.letter,
                guessedLetters[letter] ? styles.guessed : undefined,
                wastedLetters[letter] ? styles.wasted : undefined
              )}
              onClick={handleAlphabetLetterClick}
            >
              {letter}
            </button>
          )
        })}
      </div>
      {(isWordGuessed || wastedLettersCount > 6) && (
        <CustomButton onClick={handleShowSummary}>
          {mode === PLAY_MODES.single ? `Շարունակել` : `Անցնել հաջորդ խաղացողին`}
        </CustomButton>
      )}
    </div>
  )
}
