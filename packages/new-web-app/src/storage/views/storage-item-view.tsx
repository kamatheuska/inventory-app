import { useSelector } from 'react-redux';
import StorageItemForm from '../components/storage-item-form';
import { useFetchStorageItem } from '../storage.hooks';
import { getCurrent, getIsLoading } from '../storageItemSlice';

export default function StorageItemView() {
    useFetchStorageItem();
    const isLoading = useSelector(getIsLoading);
    const storageItem = useSelector(getCurrent);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                !!storageItem && (
                    <div>
                        <StorageItemForm {...storageItem} isNew={false} />
                    </div>
                )
            )}
        </div>
    );
}
