import request from "../utils/rest";
import { IIngredients } from "./ingredients.types";

export async function getAllIngredients(): Promise<IIngredients[]> {
  const data = await request({
    endpoint: '/api/ingredients',
    headers: {
      'Accept': 'application/json'
    }  
  })
  
  return data
}