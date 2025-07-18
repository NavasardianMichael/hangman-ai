'use client'

import { FC, useMemo, useState } from 'react'
import { InfoCircleOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { clearIndexDB } from 'services/indexDB'
import { selectAppOptions } from 'store/app/selectors'
import { useAppSelector } from 'hooks/useAppSelector'
import { GAME_STAGES, PLAY_MODES, PLAYERS, STAGES_HIDE_BREADCRUMB, STORE_VARS } from 'helpers/constants/app'
import { combineClassNames } from 'helpers/utils/styles'
import styles from './styles.module.css'

export const Breadcrumb: FC = () => {
  const { currentStage, currentPlayer, mode } = useAppSelector(selectAppOptions)
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [restartGameModalOpen, setRestartGameModalOpen] = useState(false)

  const text = useMemo(() => {
    const isFirstPlayer = currentPlayer === PLAYERS.player1
    const parts = [
      'Բառը',
      currentStage === GAME_STAGES.discovery ? 'գուշակում է' : 'գրում է',
      currentStage === GAME_STAGES.discovery
        ? isFirstPlayer
          ? 'երկրորդ'
          : 'առաջին'
        : isFirstPlayer
          ? 'առաջին'
          : 'երկրորդ',
      'խաղացողը',
    ]

    return parts.join(' ')
  }, [currentStage, currentPlayer])

  const nextStageText = useMemo(() => {
    const parts = [
      'Հաջորդիվ բառը ',
      currentStage === GAME_STAGES.discovery ? 'գրելու է' : 'գուշակելու է',
      currentPlayer === PLAYERS.player1 ? 'երկրորդ' : 'առաջին',
      'խաղացողը',
    ]

    return parts.join(' ')
  }, [currentStage, currentPlayer])

  if (STAGES_HIDE_BREADCRUMB.includes(currentStage)) return

  return (
    <>
      <Button
        icon={<RedoOutlined />}
        type='primary'
        style={{
          position: 'absolute',
          right: 16,
          top: 12,
          width: '2rem',
          height: '2rem',
          backgroundColor: 'var(--secondary-color)',
        }}
        onClick={() => setRestartGameModalOpen(true)}
      />
      <Modal
        centered
        open={restartGameModalOpen}
        onOk={() => {
          setRestartGameModalOpen(false)
          clearIndexDB(STORE_VARS.DB_NAME, STORE_VARS.STORE_NAME, STORE_VARS.PRIMARY_KEY)
          localStorage.removeItem(STORE_VARS.COUNTDOWN_LAST_VALUE)
          window.location.reload()
        }}
        onCancel={() => setRestartGameModalOpen(false)}
        okButtonProps={{ style: { backgroundColor: '#575757', width: 100 } }}
        cancelButtonProps={{ style: { width: 100 } }}
        okText='Այո'
        cancelText='Ոչ'
      >
        <p style={{ textAlign: 'center' }}>
          Վստա՞հ եք, որ ցանկանում եք սկսել խաղը նորից։
          <br />
          <br />
          Այս գործողությունը կջնջի ընթացիկ խաղի արդյունքները։
        </p>
      </Modal>

      {currentStage !== GAME_STAGES.summary && mode !== PLAY_MODES.single && (
        <>
          <Button
            icon={<InfoCircleOutlined />}
            type='primary'
            style={{
              position: 'absolute',
              right: 62,
              top: 12,
              width: '2rem',
              height: '2rem',
              backgroundColor: 'var(--secondary-color)',
            }}
            onClick={() => setInfoModalOpen(true)}
          />
          <Modal
            centered
            open={infoModalOpen}
            onOk={() => setInfoModalOpen(false)}
            onCancel={() => setInfoModalOpen(false)}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            <div className={styles.container}>
              <p className={styles.breadcrumb}>{text}</p>
              <p className={combineClassNames(styles.breadcrumb, styles.nextStage)}>{nextStageText}</p>
            </div>
          </Modal>
        </>
      )}
    </>
  )
}
