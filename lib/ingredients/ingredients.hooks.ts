import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllIngredients } from "./ingredients.rest";
import { setIngredientsList } from "./ingredientSlice";

export function useFetchIngredients() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      const list = await getAllIngredients();

      dispatch(setIngredientsList(list));
    }

    fetchIngredients()
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      })
  }, [dispatch])
  
  return isLoading;
}