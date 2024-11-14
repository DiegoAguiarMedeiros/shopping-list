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
import configRepository from "./configRepository";
import { ISortArrayOfObjects, sortArrayOfObjects } from "../../utils/functions";
import { IAmountRepository } from "../IAmountRepository";
import IAmount from "../../Model/IAmount";
import IMMKVStorage from "../../Service/IMMKVStorage";
import I18n from "i18n-js";
import { IConfigRepository } from "../IConfigRepository";

const PRODUCT_STORAGE_KEY = "SLSHOPPINGPRODUCT";

class ProductRepository implements IProductRepository {
  products: IProduct[] = [];
  allProducts: IProduct[] = [];
  tagRepository: ITagRepository;
  listRepository: IListRepository;
  configRepository: IConfigRepository;
  amountRepository: IAmountRepository;
  sortArrayOfObjects: ISortArrayOfObjects;
  storageMMKV: IMMKVStorage;

  constructor(
    tagRepository: ITagRepository,
    listRepository: IListRepository,
    configRepository: IConfigRepository,
    amountRepository: IAmountRepository,
    storageMMKV: IMMKVStorage,
    sortArrayOfObjects: ISortArrayOfObjects,
  ) {
    this.tagRepository = tagRepository;
    this.listRepository = listRepository;
    this.configRepository = configRepository;
    this.amountRepository = amountRepository;
    this.storageMMKV = storageMMKV;
    this.sortArrayOfObjects = sortArrayOfObjects;
    makeAutoObservable(this, {
      load: action.bound,
      setTagFilter: action.bound,
    });

    this.load();
    this.loadAll();
  }

  generateLastPrices(uuid: string): void {
    this.loadAll();
    this.allProducts.map(product => {
      const lastprice = this.calculateAverageAmount(product.amount);
      if (Number(lastprice) > 0) this.setLastPrice(product.uuid, lastprice)
    })
  }

  setLastPrice(uuid: string, price: string): void {
    const product = this.getItem(uuid);
    if (product) {
      if (product.lastPrices) {
        product.lastPrices?.push(price);
      } else {
        product.lastPrices = [];
        product.lastPrices.push(price);

      }
      this.storageMMKV.set(product.uuid, JSON.stringify(product));
    }
  }

  calculateAverageAmount(items: IAmount[]): string {
    const amounts: number[] = items.map((item) => parseFloat(item.amount));
    if (amounts.length === 0) {
      return '0';
    }

    const sum = amounts.reduce((total, amount) => total + amount, 0);
    const average = sum / amounts.length;
    return average.toFixed(2);
  }

  setTagFilter(tag: string): void {
    this.tagRepository.setTagFilter(tag);
    this.products = this.getFilteredItems();
    if (tag != this.tagRepository.tagFilter) {
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
    this.products = this.getFilteredItems();
  }

  loadAll(): void {
    this.allProducts = this.getAllItems();
  }
  addItemByUuid(item: IProduct): void {
    try {
      if (!this.itemExists(item.uuid)) {
        this.storageMMKV.set(item.uuid, JSON.stringify(item));
      }
    } catch (error) {
      console.error("Failed to add item by uuid:", error);
    }
  }
  editItem(uuid: string, name: string, tag?: string): void {
    try {
      if (this.itemExists(uuid)) {
        const currentItem = this.getItem(uuid);
        if (currentItem) {
          currentItem.name = name;
          if (tag) currentItem.tag = tag;
          this.storageMMKV.set(uuid, JSON.stringify(currentItem));
          this.load();
          this.loadAll();
        }
      }
    } catch (error) {
      console.error("Failed to add item by uuid:", error);
    }
  }

  addItemsToStorage(items: string): void {
    try {
      this.storageMMKV.set(PRODUCT_STORAGE_KEY, items);
    } catch (error) {
      console.error("Failed to add item to storage:", error);
    }
  }

  addItem(item: IProduct): void {

    try {
      if (!this.itemExists(item.uuid)) {
        const currentData = this.getAllItemsMap();
        this.addItemByUuid(item);
        currentData.push(item.uuid);
        this.addItemsToStorage(JSON.stringify(currentData));
        this.load();
        this.loadAll();
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  }

  getItem(uuid: string): IProduct | undefined {
    try {
      const jsonData = this.storageMMKV.get(uuid);
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

  getFilteredItems(): IProduct[] {
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
  getAllItems(): IProduct[] {
    try {
      const currentData = this.getAllItemsMap();
      const result: IProduct[] = [];
      if (currentData) {
        currentData.forEach((uuid) => {
          const item = this.getItem(uuid);
          if (item) {
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
      const jsonData = this.storageMMKV.get(PRODUCT_STORAGE_KEY);
      return jsonData ? JSON.parse(jsonData) : [];
    } catch (error) {
      console.error("Failed to get all items map:", error);
      return [];
    }
  }

  removeItemByUuid(uuid: string): void {
    try {
      this.storageMMKV.delete(uuid);
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
      this.loadAll();
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
  configRepository,
  amountRepository,
  storageMMKV,
  sortArrayOfObjects
);

