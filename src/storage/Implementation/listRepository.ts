import { action, makeAutoObservable } from "mobx";
import { IList } from "../../Model/IList";
import storageMMKV from "../../Service/Implementation/MMKVStorage";
import { IListRepository } from "../IListRepository";
import UUIDGenerator from "react-native-uuid";
import { IProduct } from "../../Model/IProduct";

const LIST_STORAGE_KEY: string = "SLSHOPPINGLIST";
const LIST_ARCHIVED_STORAGE_KEY: string = "SLSHOPPINGLISTARCHIVED";

class ListRepository implements IListRepository {
  lists: IList[] = [];
  listActive: IList | null = null;
  listsArchived: IList[] = [];
  listArchivedActive: IList | null = null;


  constructor() {
    makeAutoObservable(this, {
      setListActive: action.bound,
      setListActiveNull: action.bound,
    });
    this.load();
    this.loadArchived();
  }

  updateTotalUn(totalUn: number): void {
    const list = this.getItem(this.listActive?.uuid!);
    if (list) {
      list.totalUn = totalUn;
      this.listActive = list;
      storageMMKV.set(list.uuid, JSON.stringify(list));
      this.load();
    }
  }
  updateTags(tags: string[]): void {
    const list = this.getItem(this.listActive?.uuid!);
    if (list) {
      list.tags = tags;
      this.listActive = list;
      storageMMKV.set(list.uuid, JSON.stringify(list));
      this.load();
    }
  }
  updateTotal(total: number): void {
    const list = this.getItem(this.listActive?.uuid!);
    if (list) {
      list.total = total;
      this.listActive = list;
      storageMMKV.set(list.uuid, JSON.stringify(list));
      this.load();
    }
  }
  updateTotalWithAmount(total: number): void {
    const list = this.getItem(this.listActive?.uuid!);
    if (list) {
      list.totalWithAmount = total;
      this.listActive = list;
      storageMMKV.set(list.uuid, JSON.stringify(list));
      this.load();
    }
  }
  updateTotalWithoutAmount(total: number): void {
    const list = this.getItem(this.listActive?.uuid!);
    if (list) {
      list.totalWithoutAmount = total;
      this.listActive = list;
      storageMMKV.set(list.uuid, JSON.stringify(list));
      this.load();
    }
  }

  addItemsTolist(items: string[]): void {
    const list = this.getItem(this.listActive?.uuid!);
    if (list) {
      list.items = [...list.items, ...items];
      this.listActive = list;
      storageMMKV.set(list.uuid, JSON.stringify(list));
    }
  }
  removeItemFromlist(uuid: string): void {
    const list = this.getItem(this.listActive?.uuid!);
    if (list) {
      list.items = list.items.filter((item) => item != uuid);
      this.listActive = list;
      storageMMKV.set(list.uuid, JSON.stringify(list));
    }
  }
  load(): void {
    this.lists = this.getAllItems(LIST_STORAGE_KEY);
  }
  loadArchived(): void {
    this.listsArchived = this.getAllItems(LIST_ARCHIVED_STORAGE_KEY);
  }
  setListActiveNull(): void {
    this.listActive = null;
  }
  setListActive(uuid: string): void {
    const list = this.getItem(uuid);
    if (list) this.listActive = list;
  }
  addItemByUuid(item: IList): void {
    try {
      if (!this.itemExists(item.uuid, LIST_STORAGE_KEY)) {
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
  copyItem(uuid: string, name: string): void {
    try {
      const currentItem = this.getItem(uuid);
      if (currentItem) {
        const newList: IList = JSON.parse(JSON.stringify(currentItem));
        newList.uuid = String(UUIDGenerator.v4());
        newList.name = name;
        newList.createAt = new Date().getTime();
        this.addItem(newList);
        this.load();
      }
    } catch (error) {
      console.error("Failed to copy item:", error);
    }
  }
  addItem(item: IList): void {
    try {
      const currentData = this.getAllItemsMap(LIST_STORAGE_KEY);
      if (!this.itemExists(item.uuid, LIST_STORAGE_KEY)) {
        this.addItemByUuid(item);
        currentData.push(item.uuid);
        this.addItemsToStorage(JSON.stringify(currentData), LIST_STORAGE_KEY);
        this.load();
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  }

  archiveList(uuid: string): void {
    this.removeItemFromList(uuid);
    this.addItemTolistArchived(uuid);
  }
  addItemTolistArchived(uuid: string): void {
    try {
      const currentData = this.getAllItemsMap(LIST_ARCHIVED_STORAGE_KEY);
      if (!this.itemExists(uuid, LIST_ARCHIVED_STORAGE_KEY)) {
        currentData.push(uuid);
        this.addItemsToStorage(JSON.stringify(currentData), LIST_ARCHIVED_STORAGE_KEY);
        this.loadArchived();
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  }

  addItemsToStorage(items: string, key: string): void {
    try {
      storageMMKV.set(key, items);
    } catch (error) {
      console.error("Failed to add item to storage:", error);
    }
  }

  getItem(uuid: string): IList | undefined {
    try {
      const jsonData = storageMMKV.get(uuid);
      return jsonData ? JSON.parse(jsonData) : undefined;
    } catch (error) {
      console.error("Failed to get item:", error);
      return undefined;
    }
  }

  getAllItems(key: string): IList[] {
    try {
      const currentData = this.getAllItemsMap(key);

      const result: IList[] = [];
      if (currentData) {
        currentData.forEach((uuid) => {
          const item = this.getItem(uuid);
          if (item) result.push(item);
        });
      }
      return result;
    } catch (error) {
      console.error("Failed to get all items:", error);
      return [];
    }
  }

  getAllItemsMap(key: string): string[] {
    try {
      const jsonData = storageMMKV.get(key);
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

  removeItemFromList(uuid: string): void {
    console.log("removeItemFromList")
    try {
      const currentData = this.getAllItemsMap(LIST_STORAGE_KEY);
      const newData = currentData.filter((item) => item != uuid);
      this.addItemsToStorage(JSON.stringify(newData), LIST_STORAGE_KEY);
      console.log("ListRepository", JSON.stringify(this.lists))
      this.load();
      console.log("ListRepository load", JSON.stringify(this.lists))
      this.loadArchived();
    } catch (error) {
      console.error("Failed to remove item from list:", error);
    }
  }
  removeItem(uuid: string): void {
    console.log("removeItem")
    try {
      this.removeItemFromList(uuid);
      this.removeItemByUuid(uuid);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  }
  removeItemFromListArchived(uuid: string): void {
    try {
      const currentData = this.getAllItemsMap(LIST_ARCHIVED_STORAGE_KEY);
      const newData = currentData.filter((item) => item != uuid);
      this.addItemsToStorage(JSON.stringify(newData), LIST_ARCHIVED_STORAGE_KEY);
      this.load();
    } catch (error) {
      console.error("Failed to remove item from list:", error);
    }
  }
  removeItemArchived(uuid: string): void {
    try {
      this.removeItemFromListArchived(uuid);
      this.removeItemByUuid(uuid);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  }

  itemExists(uuid: string, list: string): boolean {
    try {
      const currentData = this.getAllItemsMap(list);
      return !!currentData.includes(uuid);
    } catch (error) {
      console.error("Failed to check if item exists:", error);
      return false;
    }
  }
}

export default new ListRepository();
