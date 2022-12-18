import { ButtonHTMLAttributes } from 'react';
import classNames from '../../utils/classNames';
import { ButtonVariants } from './button.types';
import styles from './circle-button-icon.module.css'

type Props = {
  label: string,
  children: React.ReactNode,
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
  variant?: ButtonVariants,
}

export default function CircleButtonIcon({
  label,
  children,
  variant = 'primary'
}: Props) {
  const buttonClasses = classNames({
    [styles.button]: true,
    [styles.primary]: variant === 'primary',
  })

  return (
    <div className={styles.root}>
      <button className={buttonClasses}>
        {children}
      </button>
      <span className={styles.label}>
        {label}
      </span>
    </div>
  )
}