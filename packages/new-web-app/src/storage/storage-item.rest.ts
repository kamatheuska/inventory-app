import request from '../lib/utils/rest';
import { StorageItemView } from '@inventory-app/types';
import mapper from './storage-item.mapper';

export async function getStorageItems(): Promise<StorageItemView[]> {
    const data = await request({
        endpoint: '/api/storage-items',
        headers: {
            Accept: 'application/json',
        },
    });

    return Array.isArray(data) ? data.map(mapper) : [];
}

export async function getStorageItem(id: string): Promise<StorageItemView> {
    const data = await request({
        endpoint: `/api/storage-items/${id}`,
        headers: {
            Accept: 'application/json',
        },
    });

    return mapper(data);
}
