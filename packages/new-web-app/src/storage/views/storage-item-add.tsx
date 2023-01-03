import StorageItemForm, { StorageItemFormProps } from '../components/storage-item-form';

export default function StorageItemAdd() {
    const storageItem: StorageItemFormProps = {
        amount: 100,
        ingredient: {
            _id: '',
            measureUnit: 'gr',
        },
        isNew: true,
    };

    return (
        <div>
            <div>
                <StorageItemForm {...storageItem} />
            </div>
        </div>
    );
}
