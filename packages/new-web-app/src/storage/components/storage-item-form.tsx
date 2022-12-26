import { MovementDTO, StorageItemViewType } from '@inventory-app/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../lib/components/buttons/button';
import { addMovement } from '../../movements/movements.rest';
import { finishRequest, startRequest } from '../storageItemSlice';
import styles from './storage-item-form.module.css';

type Props = StorageItemViewType;

export default function StorageItemForm({ amount, ingredient }: Props) {
    const { register, handleSubmit, setValue, getValues, watch } = useForm<{ amount: number }>();
    const [inputFontSize, setInputFontSize] = useState('calc(100vw / 2)');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setValue('amount', amount);
    }, [amount, setValue]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name !== 'amount') return;

            if (value.amount && value.amount > 9999) {
                setInputFontSize('calc(100vw / 4)');
            } else if (value.amount && value.amount > 999) {
                setInputFontSize('calc(100vw / 3)');
            } else {
                setInputFontSize('calc(100vw / 2)');
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, inputFontSize]);

    const onSubmit = handleSubmit(async (data) => {
        const movementAmount = amount - data.amount;
        if (movementAmount === 0) return;

        dispatch(startRequest());

        const movement: MovementDTO = {
            amount: Math.abs(movementAmount),
            ingredient: ingredient._id,
            operation: movementAmount < 0 ? 'add' : 'remove',
        };

        try {
            await addMovement(movement);
            navigate('/storage');
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(finishRequest());
        }
    });

    return (
        <form className={styles.root} onSubmit={onSubmit}>
            <div className={styles.amount}>
                <input
                    type="number"
                    style={{
                        fontSize: inputFontSize,
                    }}
                    required
                    {...register('amount', {
                        required: true,
                        min: 1,
                        setValueAs: (v) => parseInt(v),
                    })}
                />
                <span>{ingredient.measureUnit}</span>
            </div>
            <div className={styles.controls}>
                <Button label="-" onClick={() => setValue('amount', getValues().amount - 10)} />
                <Button label="+" onClick={() => setValue('amount', getValues().amount + 10)} />
            </div>
            <div className={styles.actions}>
                <Button label="save" type="submit" />
            </div>
        </form>
    );
}
