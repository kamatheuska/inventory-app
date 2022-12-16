import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllMovements } from "./movements.rest";
import { setMovementsList } from "./movementSlice";

export function useFetchMovements() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovements = async () => {
      setLoading(true);
      const list = await getAllMovements();

      dispatch(setMovementsList(list));
    }

    fetchMovements()
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      })
  }, [dispatch])
  
  return isLoading;
}