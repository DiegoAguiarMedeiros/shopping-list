import { IList } from "../Model/IList";

export interface IListRepository {
  addItemByUuid(item: IList): void;
  addItem(item: IList): void;
  addItemsToStorage(items: string): void;
  getItem(uuid: string): IList | undefined;
  getAllItems(): IList[];
  getAllItemsMap(): string[];
  editItem(uuid: string, name: string, tag?: string): void;
  copyItem(uuid: string, name: string): void;
  removeItem(uuid: string): void;
  removeItemByUuid(uuid: string): void;
  itemExists(uuid: string): boolean;
}
