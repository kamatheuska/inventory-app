import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStorageItem, getStorageItems } from './storage-item.rest';
import { finishRequest, setCurrent, setList, startRequest } from './storageItemSlice';

export function useFetchStorageItems() {
    const didFetch = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchStorageItems = async () => {
            dispatch(startRequest());
            const list = await getStorageItems();

            dispatch(setList(list));

            dispatch(finishRequest());
        };

        if (!didFetch.current) {
            fetchStorageItems();
        }

        return () => {
            didFetch.current = true;
        };
    }, [dispatch]);
}

export function useFetchStorageItem() {
    const { itemId } = useParams();

    const didFetch = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchStorageItem = async (id: string) => {
            dispatch(startRequest());
            try {
                const current = await getStorageItem(id);
                dispatch(setCurrent(current));
            } catch (error) {
                console.error(error);
            } finally {
                dispatch(finishRequest());
            }
        };

        if (!itemId || typeof itemId !== 'string') return;

        if (!didFetch.current) {
            fetchStorageItem(itemId);
        }

        return () => {
            didFetch.current = true;
        };
    }, [dispatch, itemId]);
}
