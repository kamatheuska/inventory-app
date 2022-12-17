import request from "../utils/rest";
import { IMovement } from "@inventory-app/types"

export async function addMovement(movement: IMovement) {
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

export async function getAllMovements(): Promise<IMovement[]> {
  const data = await request({
    endpoint: '/api/movements',
    headers: {
      'Accept': 'application/json'
    }  
  })
  
  return data
}