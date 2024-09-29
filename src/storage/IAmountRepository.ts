import IAmount from "../Model/IAmount";

export interface IAmountRepository {
  addItem(uuid: string, item: IAmount): void;
  getAllItems(uuid: string): IAmount[];
  removeItem(uuid: string, uuidAmount: string): void;
  removeAllItems(uuid: string): void;
  itemExists(uuid: string): boolean;
  changeAmountQuantity(quantity: string, uuid: string, uuidAmount: string): void;
  changeAmountType(type: boolean, uuid: string, uuidAmount: string): void;
}
