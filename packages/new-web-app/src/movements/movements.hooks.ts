import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getAllMovements } from './movements.rest';
import { setList } from './movementSlice';

export function useFetchMovements() {
    const didFetch = useRef(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMovements = async () => {
            setLoading(true);
            const list = await getAllMovements();
            dispatch(setList(list));
            setLoading(false);
        };

        if (!didFetch.current) {
            fetchMovements();
        }

        return () => {
            didFetch.current = true;
        };
    }, [dispatch]);

    return {
        isLoading,
    };
}
