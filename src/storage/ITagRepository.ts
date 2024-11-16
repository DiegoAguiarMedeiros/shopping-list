import { ITagsSelect } from "../Model/IProduct";
import ITag from "../Model/ITag";
import IToast from "../Service/IToast";

export interface ITagRepository {
  tags: ITag[];
  tagActive: ITag | null;
  tagFilter: string;
  toast: IToast;
  load(): void;
  addItemByUuid(item: ITag): void;
  addItem(item: ITag): void;
  addItemsToStorage(items: string): void;
  increaseProductQTD(uuid: string): void;
  decreaseProductQTD(uuid: string): void;
  getItem(uuid: string): ITag | undefined;
  getAllItems(): ITag[];
  getAllItemsMap(): string[];
  editItem(uuid: string, name: string): void;
  removeItem(uuid: string): void;
  removeItemByUuid(uuid: string): void;
  itemExists(uuid: string): boolean;
  itemExistsByName(tag: string): boolean;
  setTagAcitve(uuid: string): void;
  setTagAcitveNull(): void;
  setTagFilter(tag: string): void;
  getTagUuidByName(filter: string): string;
  getTagToSelect(): ITagsSelect[];
}
