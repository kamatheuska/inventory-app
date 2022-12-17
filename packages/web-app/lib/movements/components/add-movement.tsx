import React, { FormEvent, useState } from "react";
import { addMovement } from "../movements.rest";
import { IMovement } from "../movements.types";
import { useForm } from "react-hook-form";
import styles from './add-movement.module.css'
import IngridientSelector from "../../ingredients/components/ingredient-selector";
import { IIngredient } from "@inventory-app/types";

export default function AddMovementForm () {
  const { register, handleSubmit, setValue } = useForm<IMovement>();

  const onSubmit = handleSubmit(async (data) => {
    const movement: IMovement = {
      amount: data.amount,
      ingredientId: data.ingredientId,
      operation: data.operation,
    }

    try {
      await addMovement(movement)
    } catch (error) {
      console.error(error)
    }
  })

  const onSelect = (ingredient: IIngredient) => {
    setValue('ingredientId', ingredient._id)
  }

  return (
    <form className={styles.root} onSubmit={onSubmit}>
      <div>
        <label htmlFor="amount">Amount: </label>
        <input
          type="number"
          required
          {...register('amount', {
            required: true,
            min: 1,
            setValueAs: v => parseInt(v)
          })}
        />
      </div>
      <div>
        <label htmlFor="ingredientId">Operation: </label>
        <select {...register('operation', { required: true }) }>
          <option value="add">Add</option>
          <option value="remove">Remove</option>
        </select>
      </div>
      <IngridientSelector onSelect={onSelect}/>
      <button type="submit">Submit</button>
    </form>
  )
}