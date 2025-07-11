import { DetailedHTMLProps, FC } from 'react'
import { Button, ButtonProps } from 'antd'
import { combineClassNames } from 'helpers/utils/styles'
import styles from './styles.module.css'

type TProps = DetailedHTMLProps<ButtonProps, HTMLButtonElement>

export const CustomButton: FC<TProps> = (props) => {
  const { className, ...restProps } = props
  return (
    <Button className={combineClassNames(styles.startGameBtn, className)} {...restProps}>
      {props.children}
    </Button>
  )
}
