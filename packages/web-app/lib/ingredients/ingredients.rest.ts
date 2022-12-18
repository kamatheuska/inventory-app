import request from "../utils/rest";
import { IngredientDTO } from "@inventory-app/types"

export async function getAllIngredients(): Promise<IngredientDTO[]> {
  const data = await request({
    endpoint: '/api/ingredients',
    headers: {
      'Accept': 'application/json'
    }  
  })
  
  return data
}