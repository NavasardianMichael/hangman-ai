'use client'

import { MouseEventHandler, useMemo, useRef } from 'react'
import { Button, ConfigProvider, ThemeConfig } from 'antd'
import { StageComponent } from 'helpers/types/stage'
import { PLAY_MODES } from 'helpers/constants/app'
import { setAppOptions } from 'store/app/slice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { TAppSlice } from 'store/app/types'
import { DownloadAppBtn } from 'components/downloadAppBtn'
import styles from './styles.module.css'

export const Start: StageComponent = ({ toNextPage }) => {
  const dispatch = useAppDispatch()
  const isAppInstalledRef = useRef(localStorage.getItem('pwa-installed') === 'true')

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
    }
  }, [])

  return (
    <ConfigProvider theme={config}>
      <div className={styles.start}>
        {!isAppInstalledRef.current && <DownloadAppBtn />}
        <Button
          style={{ position: 'relative' }}
          type='primary'
          onClick={handleClick}
          name={PLAY_MODES.single}
          className={styles.startBtn}
        >
          <span style={{ transform: 'translateY(-4px)' }}>Մեկ հոգով</span>
          <span style={{ position: 'absolute', bottom: 10, left: '50%', fontSize: 7, transform: 'translateX(-50%)' }}>
            արհեստական բանականության դեմ
          </span>
        </Button>
        <Button type='primary' onClick={handleClick} name={PLAY_MODES.multiplayer} className={styles.startBtn}>
          Երկու հոգով
        </Button>
      </div>
    </ConfigProvider>
  )
}
