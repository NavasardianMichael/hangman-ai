'use client'

import { FC, useEffect, useState } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { StoreProvider } from 'store/Provider'
import { Background } from 'components/background'
import { Breadcrumb } from 'components/breadcrumb'
import { Stages } from 'components/stages/Stages'
import IndexDbProvider from '../services/IndexDbProvider'
import 'styles/variables.css'
import './app.css'
import 'styles/commons.css'

export const App: FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null)

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  if (isTouchDevice == null) return null

  return (
    <AntdRegistry>
      <StoreProvider>
        <IndexDbProvider>
          <div className='app dark'>
            {isTouchDevice ? (
              <div>
                <Stages />
                <Breadcrumb />
                <Background />
              </div>
            ) : (
              <div>
                <Background blurred />
                <h2 style={{ margin: 0, paddingTop: 40, textAlign: 'center' }}>
                  The App is Designed
                  <br /> only for Touch Devices
                </h2>
              </div>
            )}
          </div>
        </IndexDbProvider>
      </StoreProvider>
    </AntdRegistry>
  )
}

export default App
