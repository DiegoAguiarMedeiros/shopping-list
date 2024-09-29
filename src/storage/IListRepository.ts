import { IList } from "../Model/IList";
import { IProduct } from "../Model/IProduct";

export interface IListRepository {
  lists: IList[];
  listActive: IList | null;
  load(): void;
  addItemByUuid(item: IList): void;
  addItem(item: IList): void;
  addItemsTolist(items: string[]): void;
  removeItemFromlist(uuid: string): void;
  addItemsToStorage(items: string): void;
  getItem(uuid: string): IList | undefined;
  getAllItems(): IList[];
  getAllItemsMap(): string[];
  editItem(uuid: string, name: string, tag?: string): void;
  copyItem(uuid: string, name: string): void;
  removeItem(uuid: string): void;
  removeItemByUuid(uuid: string): void;
  itemExists(uuid: string): boolean;
  setListAcitve(uuid: string): void;
  setListAcitveNull(): void;
  updateTags(tags: string[]): void;
  updateTotal(total: number): void;
  updateTotalUn(totalUn: number): void;
  updateTotalWithAmount(total: number): void;
  updateTotalWithoutAmount(total: number): void;
}
