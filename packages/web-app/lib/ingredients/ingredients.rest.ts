import request from "../utils/rest";
import { IIngredient } from "@inventory-app/types"

export async function getAllIngredients(): Promise<IIngredient[]> {
  const data = await request({
    endpoint: '/api/ingredients',
    headers: {
      'Accept': 'application/json'
    }  
  })
  
  return data
}