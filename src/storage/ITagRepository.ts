import ITag from "../Model/ITag";

export interface ITagRepository {
  addItemByUuid(item: ITag): void;
  addItem(item: ITag): void;
  addItemsToStorage(items: string): void;
  getItem(uuid: string): ITag | undefined;
  getAllItems(): ITag[];
  getAllItemsMap(): string[];
  editItem(uuid: string, name: string): void;
  removeItem(uuid: string): void;
  removeItemByUuid(uuid: string): void;
  itemExists(uuid: string): boolean;
}
