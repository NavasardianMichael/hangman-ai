import { CustomButton } from 'components/shared/customButton'
import { PLAY_MODES, PLAYERS } from 'helpers/constants/app'
import { StageComponent } from 'helpers/types/stage'
import { useAppSelector } from 'hooks/useAppSelector'
import { selectAppOptions } from 'store/app/selectors'
import { initialState, setAppOptions } from 'store/app/slice'
import styles from './styles.module.css'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { Audio } from 'components/shared/audio'

export const End: StageComponent = () => {
  const dispatch = useAppDispatch()

  const { playerWon, mode } = useAppSelector(selectAppOptions)
  return (
    <div className={styles.end}>
      <h3>
        Խաղն ավարտվեց
        <br />
        🥇Շնորհավորում ենք🥇
      </h3>
      <p className={styles.winnerText}>
        🏆
        {mode === PLAY_MODES.single
          ? `Դուք հաղթեցիք`
          : `${
              playerWon === PLAYERS.player1
                ? 'Հաղթեց առաջին խաղացողը'
                : playerWon === PLAYERS.player2
                ? 'Հաղթեց երկրորդ խաղացողը'
                : 'Խաղն ավարտվեց ոչ-ոքի'
            } `}
      </p>
      <CustomButton onClick={() => dispatch(setAppOptions(JSON.parse(JSON.stringify(initialState))))}>
        Խաղալ նորից
      </CustomButton>
      <Audio deps={[playerWon]} src={'/win.mp3'} />
    </div>
  )
}
