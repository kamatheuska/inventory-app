import request from "../utils/rest";
import { IMovement } from "./movements.types";

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