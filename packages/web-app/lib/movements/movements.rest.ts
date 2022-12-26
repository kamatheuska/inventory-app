import request from "../utils/rest";
import { MovementDTO, MovementViewType } from "@inventory-app/types"
import mapper from "./movements.mapper";

export async function addMovement(movement: MovementViewType) {
  const body = JSON.stringify(movement);

  return request({
    endpoint: '/api/movements/new',
    body,
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }  
  })
}

export async function getAllMovements(): Promise<MovementViewType[]> {
  const data = await request({
    endpoint: '/api/movements',
    headers: {
      'Accept': 'application/json'
    }  
  })

  return Array.isArray(data) ? data.map(mapper) : [];
}