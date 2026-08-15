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
import langFilterAll from '../../../constants/LangFilterAll';
import IToast from "../../Service/IToast";
import Toast from "../../Service/Implementation/Toast";
const PRODUCT_STORAGE_KEY = "SLSHOPPINGPRODUCT";

class ProductRepository implements IProductRepository {
  products: IProduct[] = [];
  tagRepository: ITagRepository;
  listRepository: IListRepository;
  configRepository: IConfigRepository;
  amountRepository: IAmountRepository;
  langFilterAll: string[] = [];
  sortArrayOfObjects: ISortArrayOfObjects;
  storageMMKV: IMMKVStorage;
  toast: IToast;

  constructor(
    tagRepository: ITagRepository,
    listRepository: IListRepository,
    configRepository: IConfigRepository,
    amountRepository: IAmountRepository,
    storageMMKV: IMMKVStorage,
    sortArrayOfObjects: ISortArrayOfObjects,
    langFilterAll: string[],
    toast: IToast
  ) {
    this.toast = toast;
    this.tagRepository = tagRepository;
    this.listRepository = listRepository;
    this.configRepository = configRepository;
    this.amountRepository = amountRepository;
    this.storageMMKV = storageMMKV;
    this.langFilterAll = langFilterAll;
    this.sortArrayOfObjects = sortArrayOfObjects;
    makeAutoObservable(this, {
      load: action.bound,
      setTagFilter: action.bound,
    });

    this.load();
  }

  generateLastPrices(uuid: string): void {
    this.listRepository.setListActive(uuid)
    this.products.map(product => {
      const lastprice = this.calculateAverageAmount(product.amount);
      if (Number(lastprice) > 0) this.setLastPrice(product.uuid, lastprice)
    })
    this.listRepository.setListActiveNull()
  }

  setLastPrice(uuid: string, price: string): void {
    const product = this.getItem(uuid);
    if (!product) return;

    product.lastPrices ??= [];
    product.lastPrices.unshift(price);

    this.storageMMKV.set(product.uuid, JSON.stringify(product));
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
    this.products = this.getAllItems();
    if (!this.langFilterAll.includes(tag)) {
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
    const categoriesById = new Map<string, ITagsProductsMultiSelect>();
    this.tagRepository.tags.forEach((tag) => {
      categoriesById.set(tag.uuid, {
        id: tag.uuid,
        name: tag.name,
        children: [],
      });
    });

    // A single pass avoids scanning every product once for each category.
    // Set also keeps the active-list lookup constant-time for large lists.
    const activeProductIds = new Set(this.listRepository.listActive?.items ?? []);
    this.getAllItemsMap().forEach((uuid) => {
      const product = this.getItem(uuid);
      const category = product ? categoriesById.get(product.tag) : undefined;
      if (product && category && !activeProductIds.has(product.uuid)) {
        category.children.push({ id: product.uuid, name: product.name });
      }
    });

    const categories = Array.from(categoriesById.values())
      .filter((category) => category.children.length > 0)
      .map((category) => ({
        ...category,
        children: this.sortArrayOfObjects(category.children, "name"),
      }));

    return this.sortArrayOfObjects(categories, "name");
  }

  load(): void {
    // Reloading product data must preserve the category selected in the list.
    // Price changes also trigger a reload, so bypassing this would make every
    // product visible again after adding or editing a price.
    this.products = this.getAllItems();

    const selectedTag = this.tagRepository.tagFilter;
    if (!this.langFilterAll.includes(selectedTag)) {
      const tag = this.tagRepository.tags.find((item) => item.name === selectedTag);
      if (tag) {
        this.products = this.products.filter((product) => product.tag === tag.uuid);
      }
    }
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
          this.toast.showToast("productEditedSuccessfully");
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

  addItem(item: IProduct): boolean {

    try {
      if (!this.itemExistsByName(item.name)) {
        const currentData = this.getAllItemsMap();
        this.addItemByUuid(item);
        currentData.push(item.uuid);
        this.addItemsToStorage(JSON.stringify(currentData));
        this.load();
        this.toast.showToast("productCreatedSuccessfully");
        return true;
      } else {
        this.toast.showToast("productNameAlreadyExists");
        return false;
      }
    } catch (error) {
      console.error("Failed to add item:", error);
      return false;
    }
  }

  getItem(uuid: string): IProduct | undefined {

    if (!uuid) return undefined;
    try {
      const jsonData = this.storageMMKV.get(uuid);
      return jsonData ? JSON.parse(jsonData) : undefined;
    } catch (error) {
      console.error("Failed to get item:", error);
      return undefined;
    }
  }

  getProductByUuid(uuid: string): IProduct | undefined {
    return this.getItem(uuid);
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
      const quantity: number = !amount?.amount.includes('.') ? 1 : Number(amount?.quantity);
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
    const itemsQTY = this.listRepository.listActive?.itemsQTY;
    this.products.forEach((product) => {
      if (product.amount.length > 0) {
        total = this.getTotalUn(product.amount) + total;
      } else {
        const qty = itemsQTY?.[product.uuid];
        const qtyNumber = qty && (qty.includes(".") || Number(qty) > 100) ? 1 : qty;
        total = (qtyNumber ? Number(qtyNumber) : 1) + total;
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
      total = total + this.getTotalUn(product.amount);
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
      return this.sortArrayOfObjects(result, "name");
    } catch (error) {
      console.error("Failed to get all items:", error);
      return [];
    }
  }

  getAllItemsByTag(tagUuid: string): IProduct[] {
    try {
      const currentData = this.getAllItemsMap();
      const result: IProduct[] = [];
      if (currentData) {
        currentData.forEach((uuid) => {
          const item = this.getItem(uuid);
          if (item && item.tag === tagUuid) {
            if (this.listRepository.listActive) {
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
            result.push(item);
          }
        });
      }
      return this.sortArrayOfObjects(result, "name");
    } catch (error) {
      console.error("Failed to get all items by tag:", error);
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
    // Recalculate tags based on remaining items so FilterButtons stays in sync
    const remainingItems = this.listRepository.listActive?.items ?? [];
    const updatedTags = this.getAllTagsByProductUuid(remainingItems);
    this.listRepository.updateTags(updatedTags);
    // If the currently active filter no longer exists in the list, reset to "All"
    const currentFilter = this.tagRepository.tagFilter;
    const allLabel = I18n.t("all");
    if (currentFilter !== allLabel && !updatedTags.some(tagUuid => {
      const tag = this.tagRepository.getItem(tagUuid);
      return tag?.name === currentFilter;
    })) {
      this.setTagFilter(allLabel);
    }
    this.toast.showToast("productDeletedSuccessfully");
  }

  removeItem(uuid: string): void {
    try {
      const currentData = this.getAllItemsMap();
      const newData = currentData.filter((item) => item != uuid);
      this.addItemsToStorage(JSON.stringify(newData));
      this.removeItemByUuid(uuid);
      this.load();
      this.toast.showToast("productDeletedSuccessfully");
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
  itemExistsByName(name: string): boolean {
    try {
      const currentData = this.getAllItems();
      return currentData.some(item => item.name === name);
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
  sortArrayOfObjects,
  langFilterAll,
  Toast
);
