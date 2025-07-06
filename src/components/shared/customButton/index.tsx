import { Button, ButtonProps } from 'antd'
import { DetailedHTMLProps, FC } from 'react'
import styles from './styles.module.css'

type TProps = DetailedHTMLProps<ButtonProps, HTMLButtonElement>

export const CustomButton: FC<TProps> = (props) => {
  return (
    <Button className={styles.startGameBtn} {...props}>
      {props.children}
    </Button>
  )
}
