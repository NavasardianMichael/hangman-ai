'use client'

import { JSX } from 'react'
import { selectAppOptions } from 'store/app/selectors'
import { setAppOptions } from 'store/app/slice'
import { TAppSlice } from 'store/app/types'
import { GAME_STAGES, PLAY_MODES, PLAYERS } from 'helpers/constants/app'
import { Composition } from 'components/stages/composition'
import { Discovery } from 'components/stages/discovery'
import { End } from 'components/stages/end'
import { Settings } from 'components/stages/settings'
import { Start } from 'components/stages/start'
import { Summary } from 'components/stages/summary'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

export const useStagesTemplate = (): JSX.Element => {
  const {
    currentStage,
    currentPlayer,
    mode,
    points: { player1, player2 },
    settings: { pointsToWin },
  } = useAppSelector(selectAppOptions)
  const dispatch = useAppDispatch()

  const STAGES_TEMPLATE = {
    [PLAY_MODES.single]: {
      [GAME_STAGES.start]: {
        Component: Start,
        nextStage: GAME_STAGES.settings,
      },
      [GAME_STAGES.settings]: {
        Component: Settings,
        nextStage: GAME_STAGES.discovery,
      },
      [GAME_STAGES.composition]: {
        Component: Composition,
        nextStage: GAME_STAGES.discovery,
      },
      [GAME_STAGES.discovery]: {
        Component: Discovery,
        nextStage: GAME_STAGES.summary,
      },
      [GAME_STAGES.summary]: {
        Component: Summary,
        nextStage: GAME_STAGES.end,
      },
      [GAME_STAGES.end]: {
        Component: End,
        nextStage: GAME_STAGES.end,
      },
    },
    [PLAY_MODES.multiplayer]: {
      [GAME_STAGES.start]: {
        Component: Start,
        nextStage: GAME_STAGES.settings,
      },
      [GAME_STAGES.settings]: {
        Component: Settings,
        nextStage: GAME_STAGES.composition,
      },
      [GAME_STAGES.composition]: {
        Component: Composition,
        nextStage: GAME_STAGES.discovery,
      },
      [GAME_STAGES.discovery]: {
        Component: Discovery,
        nextStage: GAME_STAGES.summary,
      },
      [GAME_STAGES.summary]: {
        Component: Summary,
        nextStage: GAME_STAGES.end,
      },
      [GAME_STAGES.end]: {
        Component: End,
        nextStage: GAME_STAGES.start,
      },
    },
  }

  const { Component } = mode ? STAGES_TEMPLATE[mode][currentStage] : STAGES_TEMPLATE[PLAY_MODES.single][currentStage]

  const toNextPage: (currentMode?: TAppSlice['mode']) => void = (currentMode) => {
    const actualMode = currentMode ?? mode
    const { nextStage } = actualMode
      ? STAGES_TEMPLATE[actualMode][currentStage]
      : STAGES_TEMPLATE[PLAY_MODES.single][currentStage]

    if (mode === PLAY_MODES.single && player1 >= pointsToWin) {
      dispatch(setAppOptions({ currentStage: nextStage, playerWon: PLAYERS.player1 }))
      return
    }

    if (player1 === player2 && player2 >= pointsToWin) {
      dispatch(setAppOptions({ currentStage: nextStage, playerWon: 'draw' }))
      return
    }

    if (player1 >= pointsToWin && currentPlayer === PLAYERS.player1) {
      dispatch(setAppOptions({ currentStage: nextStage, playerWon: PLAYERS.player1 }))
      return
    }

    if (player2 >= pointsToWin && currentPlayer === PLAYERS.player2) {
      dispatch(setAppOptions({ currentStage: nextStage, playerWon: PLAYERS.player2 }))
      return
    }

    const newStage =
      currentStage === GAME_STAGES.summary
        ? mode === PLAY_MODES.single
          ? GAME_STAGES.discovery
          : GAME_STAGES.composition
        : nextStage
    dispatch(setAppOptions({ currentStage: newStage }))
  }

  return <Component toNextPage={toNextPage} />
}
