import { IList } from "../Model/IList";
import { IProduct } from "../Model/IProduct";
import IToast from "../Service/IToast";

export interface IListRepository {
  lists: IList[];
  listActive: IList | null;
  listsArchived: IList[];
  listArchivedActive: IList | null;
  toast: IToast;
  load(): void;
  loadArchived(): void;
  addItemByUuid(item: IList): void;
  addItem(item: IList): void;
  addItemsTolist(items: string[]): void;
  removeItemFromlist(uuid: string): void;
  addItemsToStorage(items: string, key: string): void;
  getItem(uuid: string): IList | undefined;
  getAllItems(key: string): IList[];
  getAllItemsMap(key: string): string[];
  editItem(uuid: string, name: string, tag?: string): void;
  copyItem(uuid: string, name: string): void;
  removeItem(uuid: string): void;
  removeItemFromList(uuid: string): void;
  removeItemArchived(uuid: string): void;
  removeItemFromListArchived(uuid: string): void;
  removeItemByUuid(uuid: string): void;
  itemExists(uuid: string, list: string): boolean;
  setListActive(uuid: string): void;
  setListActiveNull(): void;
  updateTags(tags: string[]): void;
  updateTotal(total: number): void;
  updateTotalUn(totalUn: number): void;
  updateTotalWithAmount(total: number): void;
  updateTotalWithoutAmount(total: number): void;
  archiveList(uuid: string): void;
  addItemTolistArchived(uuid: string): void;
}
