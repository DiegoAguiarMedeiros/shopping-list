import IAmount from "../Model/IAmount";
import {
  IProduct,
  IProductTiny,
  ITagsProductsMultiSelect,
} from "../Model/IProduct";

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
  removeItemFromlist(uuid: string): void;
  itemExists(uuid: string): boolean;
  getProductsToSelect(listUuid: string): ITagsProductsMultiSelect[];
  getAllItemsProductTiny(): IProductTiny[];
  getAllTagsByProductUuid(uuid: string[]): string[];
  updateTotal(): void;
  updateTotalUn(): void;
  updateTotalWithAmount(): void;
  updateTotalWithoutAmount(): void;
  getTotal(amounts: IAmount[]): number;
  getTotalUn(amounts: IAmount[]): number;
}
