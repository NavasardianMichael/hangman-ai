'use client'

import { FC } from 'react'
import Image from 'next/image'
import BgPaperImage from 'assets/images/gallows-narrow.jpg'
import { selectAppOptions } from 'store/app/selectors'
import { useAppSelector } from 'hooks/useAppSelector'
import { useMemoizedCombinedClassNames } from 'hooks/useMemoizedCombinedClassNames'
import { STAGES_WITH_CLEAR_BACKGROUND } from 'helpers/constants/app'
import styles from './styles.module.css'

type TProps = {
  blurred?: boolean
}

export const Background: FC<TProps> = ({ blurred = false }) => {
  const { currentStage } = useAppSelector(selectAppOptions)
  const wrapperClassName = useMemoizedCombinedClassNames(
    [styles.background, !STAGES_WITH_CLEAR_BACKGROUND.includes(currentStage) || blurred ? styles.light : undefined],
    [currentStage]
  )

  return (
    <div className={wrapperClassName}>
      <Image src={BgPaperImage} alt='app background image' />
    </div>
  )
}
