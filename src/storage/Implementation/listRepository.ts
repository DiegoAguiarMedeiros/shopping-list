import { IList } from "../../Model/IList";
import storageMMKV from "../../Service/Implementation/MMKVStorage";
import { IListRepository } from "../IListRepository";
import UUIDGenerator from "react-native-uuid";

const LIST_STORAGE_KEY = "SLSHOPPINGLIST";

class ListRepository implements IListRepository {
  addItemByUuid(item: IList): void {
    try {
      if (!this.itemExists(item.uuid)) {
        storageMMKV.set(item.uuid, JSON.stringify(item));
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
      }
    } catch (error) {
      console.error("Failed to copy item:", error);
    }
  }
  addItem(item: IList): void {
    try {
      const currentData = this.getAllItemsMap();
      if (!this.itemExists(item.uuid)) {
        this.addItemByUuid(item);
        currentData.push(item.uuid);
        this.addItemsToStorage(JSON.stringify(currentData));
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  }

  addItemsToStorage(items: string): void {
    try {
      storageMMKV.set(LIST_STORAGE_KEY, items);
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

  getAllItems(): IList[] {
    try {
      const currentData = this.getAllItemsMap();
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

  getAllItemsMap(): string[] {
    try {
      const jsonData = storageMMKV.get(LIST_STORAGE_KEY);
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

export default new ListRepository();
