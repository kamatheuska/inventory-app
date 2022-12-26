import request from '../lib/utils/rest';
import { StorageItemViewType } from '@inventory-app/types';
import mapper from './storage-item.mapper';

export async function getStorageItems(): Promise<StorageItemViewType[]> {
    const data = await request({
        endpoint: '/api/storage-items',
        headers: {
            Accept: 'application/json',
        },
    });

    return Array.isArray(data) ? data.map(mapper) : [];
}

export async function getStorageItem(id: string): Promise<StorageItemViewType> {
    const data = await request({
        endpoint: `/api/storage-items/${id}`,
        headers: {
            Accept: 'application/json',
        },
    });

    return mapper(data);
}
