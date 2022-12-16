import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getAllIngredients } from "./ingredients.rest";
import { finishRequest, setList, startRequest } from "./ingredientSlice";

export function useFetchIngredients() {
  const didFetch = useRef(false);
  const dispatch = useDispatch();
  
  useEffect(() => {

    const fetchIngredients = async () => {
      dispatch(startRequest());
      const list = await getAllIngredients();
      
      dispatch(setList(list));

      dispatch(finishRequest());
    }

    if (!didFetch.current) {
      fetchIngredients()
    }

    return () => {
      didFetch.current = true;
    }
  }, [dispatch])
}