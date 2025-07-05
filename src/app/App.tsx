'use client'

import { FC } from 'react'
import { selectIsSingleMode } from 'store/app/selectors'
import { StoreProvider } from 'store/main'
import { useAppSelector } from 'hooks/useAppSelector'
import { IS_TOUCH_DEVICE } from 'helpers/constants/commons'
import { Background } from 'components/background'
import { Breadcrumb } from 'components/breadcrumb'
import { Stages } from 'components/stages/Stages'
import './app.css'
import './index.css'

export const App: FC = () => {
  const isSingleMode = useAppSelector(selectIsSingleMode)

  return (
    <StoreProvider>
      <div className="app dark">
        {IS_TOUCH_DEVICE ? (
          <div>
            <Stages />
            {!isSingleMode && <Breadcrumb />}
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
