import Image from 'next/image'
import styles from './movement-item.module.css'
import circlePlaceholder from '../../assets/images/circle-placeholder.png'
import { IngredientDTO, MovementDTO } from '@inventory-app/types'

type Props = MovementDTO;

export default function MovementItem ({ amount, ingredient, operation, createdAt }: Props) {
  const ingredientDTO = ingredient as IngredientDTO
  const isAddOperation = () => operation === 'add'
  const date = Intl.DateTimeFormat('es-ES', {
    month: 'short',
    day: 'numeric'
  }).format(createdAt)

  const amountClasses = [
    styles.amount,
    isAddOperation() && styles.background
  ]
  
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <Image
          src={circlePlaceholder}
          alt="Picture of the author"
          width={35}
          height={35}
        />
      </div>

      <div className={styles.content}>
        <h5>{ingredientDTO.name}</h5>
        <p>{ date }</p>
      </div>
      <div className={amountClasses.join(' ')}>
        <span>
         { isAddOperation() ? '' : '-' } {amount}
        </span>
        <span>
          {' '} { ingredientDTO.measureUnit }
        </span>
      </div>

    </div>
  )
}