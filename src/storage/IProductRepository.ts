import { IProduct } from "../Model/IProduct";

export interface IProductRepository {
  addItemByUuid(item: IProduct): void;
  addItem(item: IProduct): void;
  addItemsToStorage(items: string): void;
  getAllItemsByTag(tag: string): IProduct[];
  getItem(uuid: string): IProduct | undefined;
  getAllItems(): IProduct[];
  getAllItemsMap(): string[];
  editItem(uuid: string, name: string, tag?: string): void;
  removeItem(uuid: string): void;
  removeItemByUuid(uuid: string): void;
  itemExists(uuid: string): boolean;
}
