import ITag, { ITagInterface } from "../../Model/ITag";
import { IList, IListInterface } from "../../Model/IList";
import { IProduct } from "../../Model/IProduct";

export interface IControllerSaveList {
  handle(data: IListInterface<IList>): void;
}
export interface IControllerDeleteList {
  handle(key: string): void;
}
export interface IControllerGetListByUuid {
  handle(key: string): IList;
}
export interface IControllerSaveListByUuid {
  handle(data: IList): void;
}
export interface IControllerSaveTag {
  handle(data: ITagInterface): void;
}
export interface IControllerGetTags {
  handle(): ITag[];
}
export interface IControllerGetLists {
  handle(): IList[] | null;
}
export interface IControllerSaveListProduct {
  handle(data: IListInterface<IProduct>): void;
}
export interface IControllerGetListProducts {
  handle(): IProduct[] | null;
}
export interface IControllerGetListProductsByUuid {
  handle(productsUuid: string[]): IProduct[] | null;
}
export interface IControllerGetTagByProductsUuid {
  handle(key: string): string;
}
