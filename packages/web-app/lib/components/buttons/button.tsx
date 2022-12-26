import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import styles from './button.module.css'

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
  label: string
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

export default function Button({
  type = 'button',
  label,
  onClick
}: Props) {
  return (
    <>
      <button type={type} className={styles.root} onClick={onClick}>
        {label}
      </button>
    </>
  )
}