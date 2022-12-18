import request from "../utils/rest";
import { StorageItemDTO } from "@inventory-app/types"
import mapper from "./storage-item.mapper";

export async function getStorageItems(): Promise<StorageItemDTO[]> {
  const data = await request({
    endpoint: '/api/storage-items',
    headers: {
      'Accept': 'application/json'
    }  
  })
  
  return Array.isArray(data) ? data.map(mapper) : [];
}