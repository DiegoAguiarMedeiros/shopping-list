import { IProduct } from "../Model/IProduct";

export interface IProductRepository {
  load(): void;
  addItemByUuid(item: IProduct): void;
  addItem(item: IProduct): void;
  addItemsToStorage(items: string): void;
  getItem(uuid: string): IProduct | undefined;
  getAllItems(): IProduct[];
  editItem(uuid: string, name: string, tag?: string): void;
  removeItem(uuid: string): void;
  removeItemByUuid(uuid: string): void;
  itemExists(uuid: string): boolean;
}
