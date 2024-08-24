import { action, makeAutoObservable } from "mobx";
import { IProduct } from "../../Model/IProduct";
import storageMMKV from "../../Service/Implementation/MMKVStorage";
import { IProductRepository } from "../IProductRepository";
import { ITagRepository } from "../ITagRepository";
import tagRepository from "./tagRepository";

const PRODUCT_STORAGE_KEY = "SLSHOPPINGPRODUCT";

class ProductRepository implements IProductRepository {
  products: IProduct[] = [];
  tagRepository: ITagRepository;

  constructor(tagRepository: ITagRepository) {
    this.tagRepository = tagRepository;
    makeAutoObservable(this, {
      load: action.bound, // Marca a função como uma ação
    });
    this.load();
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

  getAllItems(): IProduct[] {
    try {
      const currentData = this.getAllItemsMap();
      const result: IProduct[] = [];
      if (currentData) {
        currentData.forEach((uuid) => {
          const item = this.getItem(uuid);

          if (this.tagRepository.tagActive) {
            if (item && item.tag === this.tagRepository.tagActive?.uuid)
              result.push(item);
          } else if (item) result.push(item);
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

export default new ProductRepository(tagRepository);
