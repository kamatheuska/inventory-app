import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getStorageItems } from "./storage-item.rest";
import { finishRequest, setList, startRequest } from "./storageItemSlice";

export function useFetchStorageItems() {
  const didFetch = useRef(false);
  const dispatch = useDispatch();
  
  useEffect(() => {

    const fetchStorageItems = async () => {
      dispatch(startRequest());
      const list = await getStorageItems();
      
      dispatch(setList(list));

      dispatch(finishRequest());
    }

    if (!didFetch.current) {
      fetchStorageItems()
    }

    return () => {
      didFetch.current = true;
    }
  }, [dispatch])
}