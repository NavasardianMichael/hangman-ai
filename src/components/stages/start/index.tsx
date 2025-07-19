'use client'

import { MouseEventHandler, useMemo, useRef } from 'react'
import { Button, ConfigProvider, ThemeConfig } from 'antd'
import { setAppOptions } from 'store/app/slice'
import { TAppSlice } from 'store/app/types'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { PLAY_MODES, STORE_VARS } from 'helpers/constants/app'
import { StageComponent } from 'helpers/types/stage'
import { DownloadAppBtn } from 'components/downloadAppBtn'
import styles from './styles.module.css'

const timeoutToHintDownloadApp = 60 * 60 * 1000

export const Start: StageComponent = ({ toNextPage }) => {
  const dispatch = useAppDispatch()
  const isAppInstalledRef = useRef((() => {
    const pwaInstalledDate = localStorage.getItem(STORE_VARS.PWA_INSTALLED_DATE)
    return pwaInstalledDate && !isNaN(+pwaInstalledDate) ? Date.now() - +pwaInstalledDate < timeoutToHintDownloadApp : false
  })())
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
          <span style={{ transform: 'translateY(-3px)' }}>Մեկ հոգով</span>
          <span style={{ position: 'absolute', bottom: 9, left: '50%', fontSize: 8, transform: 'translateX(-50%)' }}>
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
