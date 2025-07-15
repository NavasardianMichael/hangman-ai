'use client'

import { MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Statistic, StatisticTimerProps } from 'antd'
import { selectAppOptions } from 'store/app/selectors'
import { incrementCurrentPlayerPoint } from 'store/app/slice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { LETTERS, PLAY_MODES, STORE_VARS } from 'helpers/constants/app'
import { StageComponent } from 'helpers/types/stage'
import { combineClassNames } from 'helpers/utils/styles'
import { Audio } from 'components/shared/audio'
import { CustomButton } from 'components/shared/customButton'
import { Hangman } from './hangman'
import styles from './styles.module.css'

type MappedLettersBooleans = {
  [key in ExtendedLetters[number]]?: boolean
}

type ExtendedLetters = (typeof LETTERS)[number] | ' '

const fixLocalIssue = (word: string) => {
  const result: string[] = [];
  let i = 0;

  while (i < word.length) {
    const char = word[i];

    // Check if current and next character form 'ՈՒ'
    if (char === 'Ո' && word[i + 1] === 'Ւ') {
      result.push('ՈՒ');
      i += 2; // Skip both characters
    } else {
      result.push(char);
      i += 1;
    }
  }

  return result;
}

export const Discovery: StageComponent = ({ toNextPage }) => {
  const dispatch = useAppDispatch()
  const { currentWord, mode, settings } = useAppSelector(selectAppOptions)
  const [finishedAudioTrigger, setFinishedAudioTrigger] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isOpenForCountdownValueStoring = useRef(true)

  const currentWordLettersArr = useMemo(() => {
    const word = currentWord.toUpperCase()
    const arr = fixLocalIssue(word) as ExtendedLetters[]

    return arr
  }, [currentWord])

  const [guessedLetters, setGuessedLetters] = useState<MappedLettersBooleans>((() => {
    const storedGuessedLetters = localStorage.getItem(STORE_VARS.GUESSED_LETTERS)
    return storedGuessedLetters ? JSON.parse(storedGuessedLetters) as MappedLettersBooleans : {}
  })())
  const [wastedLetters, setWastedLetters] = useState<MappedLettersBooleans>((() => {
    const storedWastedLetters = localStorage.getItem(STORE_VARS.WASTED_LETTERS)
    return storedWastedLetters ? JSON.parse(storedWastedLetters) as MappedLettersBooleans : {}
  })())


  const wastedLettersCount = useMemo(() => {
    return Object.keys(wastedLetters).length
  }, [wastedLetters])

  const isWordGuessed = useMemo(() => {
    return currentWordLettersArr.filter((letter) => letter !== ' ').every((letter) => guessedLetters[letter])
  }, [currentWordLettersArr, guessedLetters])

  const countdownDeadline = useMemo(() => {
    // if (isWordGuessed || wastedLettersCount > 6) return Date.now()
    const lastDeadlineValue = localStorage.getItem(STORE_VARS.COUNTDOWN_LAST_VALUE)

    if (!settings.withTimeLimit || settings.timeLimit <= 0) return 0
    if (lastDeadlineValue && !isNaN(Number(lastDeadlineValue))) return Number(lastDeadlineValue) * 1000 + Date.now()
    return Date.now() + settings.timeLimit * 1000
  }, [settings.timeLimit, settings.withTimeLimit])

  const handleAlphabetLetterClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const letter = e.currentTarget.name.toUpperCase() as ExtendedLetters

    if (!currentWordLettersArr.includes(letter)) {
      setWastedLetters((prev) => ({ ...prev, [letter]: true }))
      return
    }

    setGuessedLetters((prev) => ({ ...prev, [letter]: true }))
  }

  const handleShowSummary = () => {
    toNextPage()
  }

  const countdownOnChange = useCallback((value: StatisticTimerProps['value']) => {
    if (!isOpenForCountdownValueStoring.current) return

    if (!value) return;
    if (settings.timeLimit && typeof value === 'number') {
      isOpenForCountdownValueStoring.current = false
      localStorage.setItem(STORE_VARS.COUNTDOWN_LAST_VALUE, (Math.floor(value / 1000)).toString())
      localStorage.setItem(STORE_VARS.GUESSED_LETTERS, JSON.stringify(guessedLetters))
      localStorage.setItem(STORE_VARS.WASTED_LETTERS, JSON.stringify(wastedLetters))
      timeoutRef.current = setTimeout(() => {
        isOpenForCountdownValueStoring.current = true
      }, 3000)
    }
  }, [guessedLetters, settings.timeLimit, wastedLetters])

  const handleTimerFinish: StatisticTimerProps['onFinish'] = () => {
    if (!isWordGuessed) setFinishedAudioTrigger(true)
    setTimeout(() => {
      toNextPage()
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      localStorage.removeItem(STORE_VARS.COUNTDOWN_LAST_VALUE)
      localStorage.removeItem(STORE_VARS.GUESSED_LETTERS)
      localStorage.removeItem(STORE_VARS.WASTED_LETTERS)
    }
  }, [])


  useEffect(() => {
    if (!isWordGuessed) return
    dispatch(incrementCurrentPlayerPoint())
  }, [currentWordLettersArr, dispatch, guessedLetters, isWordGuessed])

  return (
    <div className={styles.discovery}>
      {settings.withTimeLimit && settings.timeLimit > 0 && (
        <Statistic.Timer
          style={{
            fontVariantNumeric: 'tabular-nums',
            marginLeft: 16,
            marginTop: 4,
          }}
          format='mm:ss'
          type='countdown'
          value={countdownDeadline}
          onChange={countdownOnChange}
          onFinish={handleTimerFinish}
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
      <Audio deps={[wastedLettersCount, currentWordLettersArr]} src='/scribble.mp3' />
      <Audio deps={[isWordGuessed]} src='/win.mp3' />
      <Audio deps={[!isWordGuessed && wastedLettersCount > 6, finishedAudioTrigger]} src='/loss.mp3' />
      <Audio deps={[Object.values(guessedLetters).length]} src='/correct.mp3' />
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
