import request from "../utils/rest";
import { IngredientViewType } from "@inventory-app/types"

export async function getAllIngredients(): Promise<IngredientViewType[]> {
  const data = await request({
    endpoint: '/api/ingredients',
    headers: {
      'Accept': 'application/json'
    }  
  })
  
  return data
}