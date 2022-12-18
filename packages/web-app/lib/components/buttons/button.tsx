import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css'
import { IoAccessibilityOutline } from "react-icons/io5";

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
  label: string
}

export default function Button({
  type = 'button',
  label,
}: Props) {
  return (
    <>
      <IoAccessibilityOutline></IoAccessibilityOutline>
      <button type={type} className={styles.root}>
        {label}
      </button>
    </>
  )
}