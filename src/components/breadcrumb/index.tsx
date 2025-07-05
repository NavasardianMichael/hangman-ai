'use client'

import { FC, useMemo } from 'react'
import { selectAppOptions } from 'store/app/selectors'
import { useAppSelector } from 'hooks/useAppSelector'
import { GAME_STAGES, PLAYERS, STAGES_HIDE_BREADCRUMB } from 'helpers/constants/app'
import { combineClassNames } from 'helpers/utils/styles'
import styles from './styles.module.css'

type TProps = {}

export const Breadcrumb: FC<TProps> = ({}) => {
  const { currentStage, currentPlayer } = useAppSelector(selectAppOptions)

  const text = useMemo(() => {
    const parts = [
      'Բառը',
      currentStage === GAME_STAGES.composition ? 'գրում է' : 'գուշակում է',
      currentStage === GAME_STAGES.composition
        ? currentPlayer === PLAYERS.player1
          ? 'առաջին'
          : 'երկրորդ'
        : currentPlayer === PLAYERS.player1
          ? 'երկրորդ'
          : 'առաջին',
      'խաղացողը',
    ]

    return parts.join(' ')
  }, [currentStage, currentPlayer])

  const nextStageText = useMemo(() => {
    if (currentStage === GAME_STAGES.discovery) return
    const parts = ['Հաջորդիվ բառը գուշակելու է', currentPlayer === PLAYERS.player1 ? 'երկրորդ' : 'առաջին', 'խաղացողը']

    return parts.join(' ')
  }, [currentStage, currentPlayer])

  if (STAGES_HIDE_BREADCRUMB.includes(currentStage)) return

  return (
    <div className={styles.container}>
      <p className={styles.breadcrumb}>{text}</p>
      <p className={combineClassNames(styles.breadcrumb, styles.nextStage)}>{nextStageText}</p>
    </div>
  )
}
