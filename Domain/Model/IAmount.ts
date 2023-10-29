export default interface IAmount {
  uuid: string;
  amount: string;
  type: boolean;
  quantity: string;
}

export interface IListAmountInterface {
  [key: string]: IAmount;
}
