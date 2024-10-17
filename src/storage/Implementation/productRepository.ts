import { action, makeAutoObservable } from "mobx";
import {
  IProduct,
  IProductTiny,
  ITagsProductsMultiSelect,
} from "../../Model/IProduct";
import storageMMKV from "../../Service/Implementation/MMKVStorage";
import { IProductRepository } from "../IProductRepository";
import { ITagRepository } from "../ITagRepository";
import { IListRepository } from "../IListRepository";
import tagRepository from "./tagRepository";
import listRepository from "./listRepository";
import amountRepository from "./amountRepository";
import { ISortArrayOfObjects, sortArrayOfObjects } from "../../utils/functions";
import { IAmountRepository } from "../IAmountRepository";
import IAmount from "../../Model/IAmount";

const PRODUCT_STORAGE_KEY = "SLSHOPPINGPRODUCT";

class ProductRepository implements IProductRepository {
  products: IProduct[] = [];
  tagRepository: ITagRepository;
  listRepository: IListRepository;
  amountRepository: IAmountRepository;
  sortArrayOfObjects: ISortArrayOfObjects;
  constructor(
    tagRepository: ITagRepository,
    listRepository: IListRepository,
    amountRepository: IAmountRepository,
    sortArrayOfObjects: ISortArrayOfObjects
  ) {
    this.tagRepository = tagRepository;
    this.listRepository = listRepository;
    this.amountRepository = amountRepository;
    this.sortArrayOfObjects = sortArrayOfObjects;
    makeAutoObservable(this, {
      load: action.bound,
      setTagFilter: action.bound,
    });
    this.load();
  }

  setTagFilter(tag: string): void {
    this.tagRepository.setTagFilter(tag);
    this.products = this.getAllItems();
    if (tag != 'Todos') {
      const tagFilter = this.tagRepository.getTagUuidByName(tag);
      this.products = this.products.filter(product => product.tag == tagFilter);
    }
    this.updateTotal();
    this.updateTotalUn();
    this.updateTotalWithAmount();
    this.updateTotalWithoutAmount();
  }

  getAllTagsByProductUuid(uuid: string[]): string[] {
    const result: string[] = [];
    uuid.forEach((id) => {
      const currentItem = this.getItem(id);
      if (currentItem && !result.includes(currentItem?.tag))
        result.push(currentItem?.tag);
    });
    return result;
  }
  getProductsToSelect(): ITagsProductsMultiSelect[] {
    const data: ITagsProductsMultiSelect[] = [];
    tagRepository.tags.forEach((tag) => {
      this.tagRepository.setTagAcitve(tag.uuid);
      const product = this.getAllItemsProductTiny();
      const filteredProduct: IProductTiny[] = product.filter(
        (product) => !listRepository.listActive?.items.includes(product.id)
      );
      if (filteredProduct.length > 0) {
        data.push({
          id: tag.uuid,
          name: tag.name,
          children: product,
        });
      }
      this.tagRepository.setTagAcitveNull();
    });
    return this.sortArrayOfObjects(data, "name");
  }

  load(): void {
    this.products = this.getAllItems();
  }

  addItemByUuid(item: IProduct): void {
    try {
      if (!this.itemExists(item.uuid)) {
        storageMMKV.set(item.uuid, JSON.stringify(item));
      }
    } catch (error) {
      console.error("Failed to add item by uuid:", error);
    }
  }
  editItem(uuid: string, name: string, tag?: string): void {
    try {
      const currentItem = this.getItem(uuid);
      if (currentItem) {
        currentItem.name = name;
        if (tag) currentItem.tag = tag;
        storageMMKV.set(uuid, JSON.stringify(currentItem));
        this.load();
      }
    } catch (error) {
      console.error("Failed to add item by uuid:", error);
    }
  }

  addItemsToStorage(items: string): void {
    try {
      storageMMKV.set(PRODUCT_STORAGE_KEY, items);
    } catch (error) {
      console.error("Failed to add item to storage:", error);
    }
  }

  addItem(item: IProduct): void {
    try {
      const currentData = this.getAllItemsMap();
      if (!this.itemExists(item.uuid)) {
        this.addItemByUuid(item);
        currentData.push(item.uuid);
        this.addItemsToStorage(JSON.stringify(currentData));
        this.load();
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  }

  getItem(uuid: string): IProduct | undefined {
    try {
      const jsonData = storageMMKV.get(uuid);
      return jsonData ? JSON.parse(jsonData) : undefined;
    } catch (error) {
      console.error("Failed to get item:", error);
      return undefined;
    }
  }

  // getTotal(amount: IAmount[]): number {
  //   const total: { total: number } = { total: 0 };
  //   amount.forEach((amount) => {
  //     total.total = amount?.type
  //       ? total.total + 1
  //       : total.total + Number(amount?.quantity);
  //   });
  //   return total.total;
  // }
  getTotal(amounts: IAmount[]): number {
    let total: number = 0;
    amounts.forEach((amount) => {
      total = total + Number(amount?.amount) * Number(amount?.quantity);
    });
    return total;
  }
  getTotalUn(amounts: IAmount[]): number {
    let total: number = 0;
    amounts.forEach((amount) => {
      const quantity: number = amount?.type ? 1 : Number(amount?.quantity);
      total = total + quantity;
    });
    return total;
  }

  updateTotal(): void {
    let total: number = 0;
    this.products.forEach((product) => {
      total = this.getTotal(product.amount) + total;
    });
    this.listRepository.updateTotal(total);
  }
  updateTotalUn(): void {
    let total: number = 0;
    this.products.forEach((product) => {
      if (product.amount.length > 0) {
        total = this.getTotalUn(product.amount) + total;
      } else {
        total = 1 + total;
      }
    });
    this.listRepository.updateTotalUn(total);
  }
  updateTotalWithAmount(): void {
    let total: number = 0;
    this.products.forEach((product) => {
      if (product.amount.length > 0) total = total + 1;
    });
    this.listRepository.updateTotalWithAmount(total);
  }
  updateTotalWithoutAmount(): void {
    let total: number = 0;
    this.products.forEach((product) => {
      total = total + product.amount.length;
    });
    this.listRepository.updateTotalWithoutAmount(total);
  }

  getAllItems(): IProduct[] {
    try {
      const currentData = this.getAllItemsMap();
      const result: IProduct[] = [];
      if (currentData) {
        currentData.forEach((uuid) => {
          const item = this.getItem(uuid);
          if (item && this.listRepository.listActive) {
            item.amount = this.amountRepository.getAllItems(
              this.listRepository.listActive.uuid + "-" + item?.uuid
            );

            if (item.amount.length > 0) {
              item.total = this.getTotal(item.amount)
                .toFixed(2)
                .replace(".", ",");
            } else {
              item.total = "0,00";
            }
          }

          if (this.tagRepository.tagActive) {
            if (item && item.tag === this.tagRepository.tagActive?.uuid)
              result.push(item);
          } else if (this.listRepository.listActive) {
            if (
              item &&
              this.listRepository.listActive?.items.includes(item.uuid)
            )
              result.push(item);
          } else if (item) {
            result.push(item);
          }
        });
      }
      return result;
    } catch (error) {
      console.error("Failed to get all items:", error);
      return [];
    }
  }
  getAllItemsProductTiny(): IProductTiny[] {
    try {
      const currentData = this.getAllItemsMap();
      const result: IProductTiny[] = [];
      if (currentData) {
        currentData.forEach((uuid) => {
          const item = this.getItem(uuid);

          if (this.tagRepository.tagActive) {
            if (
              item &&
              item.tag === this.tagRepository.tagActive?.uuid &&
              !this.listRepository.listActive?.items.includes(item.uuid)
            )
              result.push({ id: item.uuid, name: item.name });
          }
        });
      }
      return result;
    } catch (error) {
      console.error("Failed to get all items:", error);
      return [];
    }
  }

  getAllItemsMap(): string[] {
    try {
      const jsonData = storageMMKV.get(PRODUCT_STORAGE_KEY);
      return jsonData ? JSON.parse(jsonData) : [];
    } catch (error) {
      console.error("Failed to get all items map:", error);
      return [];
    }
  }

  removeItemByUuid(uuid: string): void {
    try {
      storageMMKV.delete(uuid);
    } catch (error) {
      console.error("Failed to remove item by uuid:", error);
    }
  }
  removeItemFromlist(uuid: string): void {
    this.listRepository.removeItemFromlist(uuid);
    this.load();
  }

  removeItem(uuid: string): void {
    try {
      const currentData = this.getAllItemsMap();
      const newData = currentData.filter((item) => item != uuid);
      this.addItemsToStorage(JSON.stringify(newData));
      this.removeItemByUuid(uuid);
      this.load();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  }

  itemExists(uuid: string): boolean {
    try {
      const currentData = this.getAllItemsMap();
      return !!currentData.includes(uuid);
    } catch (error) {
      console.error("Failed to check if item exists:", error);
      return false;
    }
  }
}

export default new ProductRepository(
  tagRepository,
  listRepository,
  amountRepository,
  sortArrayOfObjects
);
function toFixed(arg0: number) {
  throw new Error("Function not implemented.");
}

