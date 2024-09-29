import { action, makeAutoObservable } from "mobx";
import IAmount from "../../Model/IAmount";
import storageMMKV from "../../Service/Implementation/MMKVStorage";
import { IAmountRepository } from "../IAmountRepository";

class AmountRepository implements IAmountRepository {
  constructor() {
    makeAutoObservable(this);
  }
  changeAmountQuantity(
    quantity: string,
    uuid: string,
    uuidAmount: string
  ): void {
    try {
      const amounts = this.getAllItems(uuid);
      const amountMapped = amounts.map((amount) => {
        if (amount.uuid == uuidAmount) {
          amount.quantity = quantity;
        }
        return amount;
      });
      storageMMKV.set(uuid, JSON.stringify(amountMapped));
    } catch (error) {
      console.error("Failed to change item quantity by uuid:", error);
    }
  }
  changeAmountType(type: boolean, uuid: string, uuidAmount: string): void {
    try {
      const amounts = this.getAllItems(uuid);
      const amountMapped = amounts.map((amount) => {
        if (amount.uuid == uuidAmount) {
          amount.quantity = "1";
          amount.type = type;
        }
        return amount;
      });
      storageMMKV.set(uuid, JSON.stringify(amountMapped));
    } catch (error) {
      console.error("Failed to change item quantity by uuid:", error);
    }
  }
  addItem(uuid: string, item: IAmount): void {
    try {
      const amounts = this.getAllItems(uuid);
      amounts.push(item);
      storageMMKV.set(uuid, JSON.stringify(amounts));
    } catch (error) {
      console.error("Failed to add item by uuid:", error);
    }
  }
  getAllItems(uuid: string): IAmount[] {
    try {
      const jsonData = storageMMKV.get(uuid);
      return jsonData ? JSON.parse(jsonData) : [];
    } catch (error) {
      console.error("Failed to get all items map:", error);
      return [];
    }
  }

  removeItem(uuid: string, uuidAmount: string): void {
    try {
      const amounts = this.getAllItems(uuid).filter(
        (amount) => amount.uuid != uuidAmount
      );
      if (amounts.length > 0) {
        storageMMKV.set(uuid, JSON.stringify(amounts));
      } else {
        storageMMKV.delete(uuid);
      }
    } catch (error) {
      console.error("Failed to remove item by uuid:", error);
    }
  }
  removeAllItems(uuid: string): void {
    try {
      storageMMKV.delete(uuid);
    } catch (error) {
      console.error("Failed to remove all items by uuid:", error);
    }
  }

  itemExists(uuid: string): boolean {
    try {
      const jsonData = storageMMKV.get(uuid);
      return !!jsonData;
    } catch (error) {
      console.error("Failed to check if item exists:", error);
      return false;
    }
  }
}

export default new AmountRepository();
