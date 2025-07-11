'use client'

import { createContext, FC, MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DownloadOutlined } from '@ant-design/icons'
import type { NotificationArgsProps } from 'antd'
import { Button, Carousel, Modal, notification } from 'antd'
import Image from 'next/image'
import Hint1Img from 'assets/images/hint1.png'
import Hint2Img from 'assets/images/hint2.png'
import Hint3Img from 'assets/images/hint3.png'
import { isInWebView } from 'helpers/utils/commons'

const isIos = () => /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let deferredPrompt: any | null = null

const isIosInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone

const isNonIosStandaloneMode = () => window.matchMedia('(display-mode: standalone)').matches

type NotificationPlacement = NotificationArgsProps['placement']

const Context = createContext({ name: 'Default' })

export const DownloadAppBtn: FC = () => {
  const [api, contextHolder] = notification.useNotification()
  const [showIosDownloadAppHintModal, setShowIosDownloadAppHintModal] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isIosRef = useRef(isIos())
  const isInWebViewRef = useRef(isInWebView())

  const setAppInstalled = useCallback(() => {
    localStorage.setItem('pwa-installed', 'true')
  }, [])

  useEffect(() => {
    const isIos = isIosRef.current
    if (isIos) {
      if (isIosInStandaloneMode()) return setAppInstalled()
      setShowIosDownloadAppHintModal(true)
      return
    }

    if (isInWebViewRef.current) return
    if (isNonIosStandaloneMode()) return setAppInstalled()

    const preservePrompt = (event: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault()
      // Stash the event so it can be triggered later
      deferredPrompt = event
    }
    window.addEventListener('beforeinstallprompt', preservePrompt)

    return () => {
      if (isIos) return
      window.removeEventListener('beforeinstallprompt', preservePrompt)
    }
  }, [setAppInstalled])

  useEffect(() => {
    window.addEventListener('appinstalled', setAppInstalled)
    return () => window.removeEventListener('appinstalled', setAppInstalled)
  }, [setAppInstalled])

  const downloadAppBtnClick = useCallback<MouseEventHandler>(async () => {
    if (!deferredPrompt) return
    // Show the install prompt
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') setAppInstalled()

    deferredPrompt = null
  }, [setAppInstalled])

  const openNotification = useCallback(
    (placement: NotificationPlacement) => {
      api.info({
        message: <b>Ներբեռնե՞լ հավելվածը</b>,
        duration: 0,
        icon: ' ',
        description: (
          <Context.Consumer>
            {() => {
              return (
                <Button
                  type='primary'
                  style={{ width: '100%' }}
                  onClick={downloadAppBtnClick}
                  icon={<DownloadOutlined />}
                >
                  Ներբեռնել
                </Button>
              )
            }}
          </Context.Consumer>
        ),
        placement,
      })
    },
    [api, downloadAppBtnClick]
  )

  useEffect(() => {
    const openDownloadNotification = () => {
      openNotification('top')
    }

    if (!isIosRef.current) {
      timeoutRef.current = setTimeout(() => {
        openDownloadNotification()
      }, 1000)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [openNotification])

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), [])

  return (
    <>
      {
        <Modal
          title='Ինչպե՞ս ներբեռնել հավելվածը'
          centered
          width={'80%'}
          open={showIosDownloadAppHintModal}
          onCancel={() => setShowIosDownloadAppHintModal(false)}
          okButtonProps={{
            style: { display: 'none' },
          }}
          cancelButtonProps={{
            style: { display: 'none' },
          }}
        >
          <div style={{ maxHeight: '80vh', boxSizing: 'border-box' }}>
            <Carousel autoplay arrows dots dotPosition='bottom'>
              <div>
                <Image
                  src={Hint1Img}
                  alt='Hint 1'
                  style={{ margin: 'auto', maxWidth: '100%', maxHeight: '80vh', objectFit: 'cover' }}
                />
              </div>
              <div>
                <Image
                  src={Hint2Img}
                  alt='Hint 2'
                  style={{ margin: 'auto', maxWidth: '100%', maxHeight: '80vh', objectFit: 'cover' }}
                />
              </div>
              <div>
                <Image
                  src={Hint3Img}
                  alt='Hint 3'
                  style={{ margin: 'auto', maxWidth: '100%', maxHeight: '80vh', objectFit: 'cover' }}
                />
              </div>
            </Carousel>
          </div>
        </Modal>
      }
      <Context.Provider value={contextValue}>{contextHolder}</Context.Provider>
    </>
  )
}
