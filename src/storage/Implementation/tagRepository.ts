import { action, makeAutoObservable } from "mobx";
import ITag from "../../Model/ITag";
import storageMMKV from "../../Service/Implementation/MMKVStorage";
import { ITagRepository } from "../ITagRepository";
import { ITagsSelect } from "../../Model/IProduct";
import I18n from "i18n-js";
import langFilterAll from "../../../constants/LangFilterAll";
import { IConfigRepository } from "../IConfigRepository";
import configRepository from "./configRepository";
import { ISortArrayOfObjects, sortArrayOfObjects } from "../../utils/functions";

const TAG_STORAGE_KEY = "SLSHOPPINGTAG";

class TagRepository implements ITagRepository {
  tags: ITag[] = [];
  tagActive: ITag | null = null;
  tagFilter: string;
  sortArrayOfObjects: ISortArrayOfObjects;
  constructor(sortArrayOfObjects: ISortArrayOfObjects) {
    makeAutoObservable(this, {
      setTagAcitve: action.bound,
      setTagAcitveNull: action.bound,
      setTagFilter: action.bound,
    });
    this.sortArrayOfObjects = sortArrayOfObjects;
    this.load();
    this.tagFilter = 'All';
  }
  getTagToSelect(): ITagsSelect[] {

    return this.tags.map(tag => {
      return { ...tag, id: tag.uuid }
    })

  }
  setTagAcitveNull(): void {
    this.tagActive = null;
  }
  setTagAcitve(uuid: string): void {
    const tag = this.getItem(uuid);
    if (tag) this.tagActive = tag;
  }
  setTagFilter(tag: string): void {
    this.tagFilter = tag;
  }
  getTagUuidByName(filter: string): string {
    const tagFiltered = this.tags.filter(tag => tag.name == filter)
    this.tagFilter = filter;
    return tagFiltered[0].uuid;
  }

  load(): void {
    this.tags = this.getAllItems();
  }

  increaseProductQTD(uuid: string): void {
    const currentItem = this.getItem(uuid);
    if (currentItem) {
      currentItem.productsQTD = currentItem.productsQTD + 1;
      storageMMKV.set(uuid, JSON.stringify(currentItem));
      this.load();
    }
  }
  decreaseProductQTD(uuid: string): void {
    const currentItem = this.getItem(uuid);
    if (currentItem) {
      currentItem.productsQTD = currentItem.productsQTD - 1;
      storageMMKV.set(uuid, JSON.stringify(currentItem));
      this.load();
    }
  }
  addItemByUuid(item: ITag): void {
    try {
      if (!this.itemExists(item.uuid)) {
        storageMMKV.set(item.uuid, JSON.stringify(item));
        this.load();
      }
    } catch (error) {
      console.error("Failed to add item by uuid:", error);
    }
  }
  editItem(uuid: string, name: string): void {
    try {
      const currentItem = this.getItem(uuid);
      if (currentItem) {
        currentItem.name = name;
        storageMMKV.set(uuid, JSON.stringify(currentItem));
        this.load();
      }
    } catch (error) {
      console.error("Failed to add item by uuid:", error);
    }
  }

  addItem(item: ITag): void {
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
  addItemsToStorage(items: string): void {
    try {
      storageMMKV.set(TAG_STORAGE_KEY, items);
    } catch (error) {
      console.error("Failed to add item to storage:", error);
    }
  }

  getItem(uuid: string): ITag | undefined {
    try {
      const jsonData = storageMMKV.get(uuid);
      return jsonData ? JSON.parse(jsonData) : undefined;
    } catch (error) {
      console.error("Failed to get item:", error);
      return undefined;
    }
  }

  getAllItems(): ITag[] {
    try {
      const currentData = this.getAllItemsMap();
      const result: ITag[] = [];
      if (currentData) {
        currentData.forEach((uuid) => {
          const item = this.getItem(uuid);
          if (item) result.push(item);
        });
      }
      return this.sortArrayOfObjects(result, "name");
    } catch (error) {
      console.error("Failed to get all items:", error);
      return [];
    }
  }

  getAllItemsMap(): string[] {
    try {
      const jsonData = storageMMKV.get(TAG_STORAGE_KEY);
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
export default new TagRepository(sortArrayOfObjects);
