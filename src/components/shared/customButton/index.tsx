import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import { combineClassNames } from 'helpers/utils/styles'
import styles from './styles.module.css'

type TProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const CustomButton: FC<TProps> = (props) => {
  const { className, ...restProps } = props
  return (
    <button className={combineClassNames(styles.startGameBtn, className)} {...restProps}>
      {props.children}
    </button>
  )
}
