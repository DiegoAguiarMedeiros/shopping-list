import { IListInterface } from "../Model/IList";

export interface IRepository<T> {
  addItemByUuid(item: T): void;
  addItem(item: T): void;
  editItem(uuid: string, name: string): void;
  getItem(uuid: string): T | undefined;
  getAllItems(): T[];
  getAllItemsMap(): string[];
  removeItem(uuid: string): void;
  removeItemByUuid(uuid: string): void;
  itemExists(uuid: string): boolean;
}
