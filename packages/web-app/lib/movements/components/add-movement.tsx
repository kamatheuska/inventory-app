import React, { FormEvent, useState } from "react";
import { addMovement } from "../movements.rest";
import { useForm } from "react-hook-form";
import styles from './add-movement.module.css'
import IngridientSelector from "../../ingredients/components/ingredient-selector";
import { IngredientViewType, MovementViewType } from "@inventory-app/types";

export default function AddMovementForm () {
  const { register, handleSubmit, setValue } = useForm<MovementViewType>();

  const onSubmit = handleSubmit(async (data) => {
    const movement: MovementViewType = {
      amount: data.amount,
      ingredient: data.ingredient,
      operation: data.operation,
    }

    try {
      await addMovement(movement)
    } catch (error) {
      console.error(error)
    }
  })

  const onSelect = (ingredient: IngredientViewType) => {
    setValue('ingredient', ingredient._id)
  }

  return (
    <form className={styles.root} onSubmit={onSubmit} data-cy="add-movement">
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
        <label htmlFor="operation">Operation: </label>
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