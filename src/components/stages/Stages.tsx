'use client'

import { FC } from 'react'
import { useStagesTemplate } from 'hooks/useStagesTemplate'
import styles from './styles.module.css'

export const Stages: FC = () => {
  const Stage = useStagesTemplate()

  return <div className={styles.stage}>{Stage}</div>
}
