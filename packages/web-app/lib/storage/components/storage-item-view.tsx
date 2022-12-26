import { MovementViewType,  StorageItemViewType } from "@inventory-app/types";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "../../components/buttons/button";
import { addMovement } from "../../movements/movements.rest";
import { finishRequest, startRequest } from "../storageItemSlice";
import styles from './storage-item-view.module.css'

type Props = StorageItemViewType;


export default function StorageItemView({ amount, ingredient, _id }: Props) {
  const { register, handleSubmit, setValue, getValues } = useForm<{ amount: number }>();

  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    setValue('amount', amount)
  }, [amount, setValue])

  const onSubmit = handleSubmit(async (data) => {
    const movementAmount = amount - data.amount;
    if (movementAmount === 0) return;

    dispatch(startRequest());

    const movement: MovementViewType = {
      amount: Math.abs(movementAmount),
      ingredient: ingredient._id,
      operation: movementAmount < 0 ? 'add' : 'remove',
    }

    try {
      await addMovement(movement)
      router.push({ pathname: '/storage '})
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(finishRequest());
    }
  })

  return (
    <form className={styles.root}  onSubmit={onSubmit}>
      <div className={styles.amount}>
        <input
          type="number"
          required
          {...register('amount', {
            required: true,
            min: 1,
            setValueAs: v => parseInt(v)
          })}
        />
        <span>
          {ingredient.measureUnit}
        </span>
      </div>
      <div className={styles.controls}>
        <Button label="-" onClick={() => setValue('amount', getValues().amount - 10 )}/>
        <Button label="+" onClick={() => setValue('amount', getValues().amount + 10 )}/>
      </div>
      <div className={styles.actions}>
        <Button label="save" type="submit" />
      </div>
    </form>
  )
}