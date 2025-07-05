'use client'

import { selectAppOptions, selectGameSettings, selectIsSingleMode, selectPoints } from 'store/app/selectors'
import { setAppOptions } from 'store/app/slice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { useOpponent } from 'hooks/useOpponent'
import { StageComponent } from 'helpers/types/stage'
import { PLAYERS } from 'helpers/constants/app'
import { CustomButton } from 'components/shared/customButton'
import styles from './styles.module.css'
import { getWord } from 'app/getWord/client'
import { TAppSlice } from 'store/app/types'
import { useState } from 'react'

export const Summary: StageComponent = ({ toNextPage }) => {
  const dispatch = useAppDispatch()
  const [isPending, setIsPending] = useState(false)
  const { minLettersCount, category, difficulty } = useAppSelector(selectGameSettings)
  const isSingleMode = useAppSelector(selectIsSingleMode)

  const { player1, player2 } = useAppSelector(selectPoints)
  const { currentPlayer, currentWord } = useAppSelector(selectAppOptions)
  const opponent = useOpponent()

  const handleNextPlayerComposes = async () => {
    if (isPending) return
    setIsPending(true)
    if (isSingleMode) {
      dispatch(setAppOptions({ currentPlayer: PLAYERS.player1 }))
    }
    const payload: Partial<TAppSlice> = {
      currentPlayer: opponent,
    }
    if (isSingleMode) {
      const newWord = await getWord({ minLettersCount, category, difficulty })
      payload.currentWord = newWord
    }

    dispatch(setAppOptions(payload))
    setIsPending(false)
    toNextPage()
  }

  return (
    <div className={styles.summary}>
      <div className={styles.hints}>
        <p className={styles.main}>
          Պահված բառն էր՝
          <br />
          <span className={styles.currentWord}>«{currentWord}»</span>
        </p>
        <p className={styles.hint}>{isSingleMode ? `Դուք ունեք ${player1} միավոր` : `Խաղացող 1՝ ${player1} միավոր`}</p>
        {!isSingleMode && <p className={styles.hint}>Խաղացող 2՝ {player2} միավոր</p>}
      </div>

      <CustomButton style={{ fontSize: '.9rem' }} onClick={handleNextPlayerComposes} disabled={isPending}>
        {isSingleMode
          ? 'Շարունակել'
          : `Բառ գրելու հերթը ${currentPlayer === PLAYERS.player1 ? 'երկրորդ' : 'առաջին'} խաղացողինն է`}
      </CustomButton>
    </div>
  )
}
