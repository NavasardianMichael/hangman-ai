'use client'

import { useState } from 'react'
import { Flex, Spin } from 'antd'
import { getWord } from 'app/getWord/client'
import { selectAppOptions, selectGameSettings, selectIsSingleMode, selectPoints } from 'store/app/selectors'
import { setAppOptions } from 'store/app/slice'
import { TAppSlice } from 'store/app/types'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { useOpponent } from 'hooks/useOpponent'
import { PLAYERS } from 'helpers/constants/app'
import { StageComponent } from 'helpers/types/stage'
import { combineClassNames } from 'helpers/utils/styles'
import { CustomButton } from 'components/shared/customButton'
import styles from './styles.module.css'

export const Summary: StageComponent = ({ toNextPage }) => {
  const dispatch = useAppDispatch()
  const [isPending, setIsPending] = useState(false)
  const { minLettersCount, category, difficulty } = useAppSelector(selectGameSettings)
  const isSingleMode = useAppSelector(selectIsSingleMode)

  const { player1, player2 } = useAppSelector(selectPoints)
  const { currentPlayer, currentWord, playerWon } = useAppSelector(selectAppOptions)

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
    if (isSingleMode && !playerWon) {
      const newWord = await getWord({ minLettersCount, category, difficulty })
      payload.currentWord = newWord

      dispatch(setAppOptions(payload))
    }
    setIsPending(false)
    toNextPage()
  }

  const isLongText = !playerWon && !isSingleMode

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

      <CustomButton
        onClick={handleNextPlayerComposes}
        disabled={isPending}
        className={combineClassNames(isLongText && styles.longTextButton)}
      >
        <Flex align='center' justify='center' gap={12}>
          {isPending && <Spin className='' />}
          {isLongText
            ? `Բառ գրելու հերթը ${currentPlayer === PLAYERS.player1 ? 'երկրորդ' : 'առաջին'} խաղացողինն է`
            : <span style={{ fontSize: (isPending && isSingleMode) ? '.6rem' : '1rem' }}>
              {(isPending && isSingleMode) ? 'Արհեստական բանականությունը մտածում է․․․' : 'Շարունակել'}
            </span>}
        </Flex>
      </CustomButton>
    </div>
  )
}
