'use client'

import { FC } from 'react'
import { useStagesTemplate } from 'hooks/useStagesTemplate'
import styles from './styles.module.css'

type Props = {}

export const Stages: FC<Props> = ({}) => {
  const Stage = useStagesTemplate()

  return <div className={styles.stage}>{Stage}</div>
}
