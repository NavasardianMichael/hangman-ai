import { Button, ButtonProps } from 'antd'
import { DetailedHTMLProps, FC } from 'react'
import styles from './styles.module.css'
import { combineClassNames } from 'helpers/utils/styles'

type TProps = DetailedHTMLProps<ButtonProps, HTMLButtonElement>

export const CustomButton: FC<TProps> = (props) => {
  const { className, ...restProps } = props
  return (
    <Button className={combineClassNames(styles.startGameBtn, className)} {...restProps}>
      {props.children}
    </Button>
  )
}
