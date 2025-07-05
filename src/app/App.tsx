'use client'

import { Background } from 'components/background'
import { Breadcrumb } from 'components/breadcrumb'
import { Stages } from 'components/stages/Stages'
import { FC, useEffect, useState } from 'react'
import 'styles/commons.css'
import 'styles/variables.css'
import './app.css'
import './index.css'
import { StoreProvider } from 'store/Provider'

export const App: FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  return (
    <StoreProvider>
      <div className="app dark">
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
    </StoreProvider>
  )
}

export default App
