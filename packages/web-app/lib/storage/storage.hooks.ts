import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getStorageItem, getStorageItems } from "./storage-item.rest";
import { finishRequest, setCurrent, setList, startRequest } from "./storageItemSlice";

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

export function useFetchStorageItem() {
  const router = useRouter();
  const {_id} = router.query;
  const didFetch = useRef(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchStorageItem = async (id: string) => {
      dispatch(startRequest());
      try {
        const current = await getStorageItem(id);
        dispatch(setCurrent(current));
      } catch (error) {
        console.error(error)
      } finally {
        dispatch(finishRequest());
      }
    }

    if (!_id || typeof _id !== 'string') return;

    if (!didFetch.current) {
      fetchStorageItem(_id)
    }

    return () => {
      didFetch.current = true;
    }
  }, [dispatch, _id])
}