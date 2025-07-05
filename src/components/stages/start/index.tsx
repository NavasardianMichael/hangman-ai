'use client'

import { MouseEventHandler, useMemo } from 'react'
import { Button, ConfigProvider, ThemeConfig } from 'antd'
import { getWord } from 'app/getWord/client'
import { selectGameSettings } from 'store/app/selectors'
import { setAppOptions } from 'store/app/slice'
import { TAppSlice } from 'store/app/types'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { StageComponent } from 'helpers/types/stage'
import { PLAY_MODES } from 'helpers/constants/app'
import { DownloadAppBtn } from 'components/downloadAppBtn'
import styles from './styles.module.css'

export const Start: StageComponent = ({ toNextPage }) => {
  const dispatch = useAppDispatch()

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const mode = event.currentTarget.name as TAppSlice['mode']
    dispatch(setAppOptions({ mode }))
    toNextPage(mode)
  }

  const config: ThemeConfig = useMemo(() => {
    return {
      token: {
        colorPrimary: '#575757',
        borderRadius: 0,
        colorBgContainer: '#d3d3d32e',
        colorPrimaryBg: '#575757',
      },
      components: {
        Checkbox: {
          colorBgContainer: '#d3d3d32e',
          colorPrimary: 'red',
          colorPrimaryBg: 'red',
        },
      },
    }
  }, [])

  return (
    <ConfigProvider theme={config}>
      <div className={styles.start}>
        <DownloadAppBtn />
        <Button type="primary" onClick={handleClick} name={PLAY_MODES.single} className={styles.startBtn}>
          Մեկ հոգով
        </Button>
        <Button type="primary" onClick={handleClick} name={PLAY_MODES.multiplayer} className={styles.startBtn}>
          Երկու հոգով
        </Button>
      </div>
    </ConfigProvider>
  )
}
