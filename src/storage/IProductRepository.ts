import IAmount from "../Model/IAmount";
import {
  IProduct,
  IProductTiny,
  ITagsProductsMultiSelect,
} from "../Model/IProduct";
import IMMKVStorage from "../Service/IMMKVStorage";
import { ISortArrayOfObjects } from "../utils/functions";
import { IAmountRepository } from "./IAmountRepository";
import { IListRepository } from "./IListRepository";
import { ITagRepository } from "./ITagRepository";

export interface IProductRepository {
  products: IProduct[];
  tagRepository: ITagRepository;
  listRepository: IListRepository;
  amountRepository: IAmountRepository;
  sortArrayOfObjects: ISortArrayOfObjects;
  storageMMKV: IMMKVStorage;
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
  setTagFilter(tag: string): void;
  generateLastPrices(uuid: string): void;
  calculateAverageAmount(items: IAmount[]): string
  setLastPrice(uuid: string, price: string): void
}
