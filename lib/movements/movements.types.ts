export type OperationOptions = 'add' | 'remove';

export interface IMovement {
  ingredientId: string;
  amount: number;
  operation: OperationOptions;
}
