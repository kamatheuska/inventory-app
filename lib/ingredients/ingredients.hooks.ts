import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllIngredients } from "./ingredients.rest";
import { finishRequest, setList } from "./ingredientSlice";


export function useFetchIngredients() {

  const dispatch = useDispatch();
  const fetchIngredients = () => {
    getAllIngredients()
      .then((list) => dispatch(setList(list)))
  }

  // const fetchIngredients = async () => {
  //   try {
  //     const list = await getAllIngredients();
  //     dispatch(setList(list))
  //   } catch (error) {
  //     dispatch(setList([]))
  //   } finally {
  //     dispatch(finishRequest())
  //   }
  // }
  
  return {
    fetchIngredients
  };
}