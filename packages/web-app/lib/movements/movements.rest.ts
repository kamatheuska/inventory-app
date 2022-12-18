import request from "../utils/rest";
import { MovementDTO } from "@inventory-app/types"
import mapper from "./movements.mapper";

export async function addMovement(movement: MovementDTO) {
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

export async function getAllMovements(): Promise<MovementDTO[]> {
  const data = await request({
    endpoint: '/api/movements',
    headers: {
      'Accept': 'application/json'
    }  
  })

  return Array.isArray(data) ? data.map(mapper) : [];
}