import ITag from "../../Model/ITag";
import { IList, IListInterface } from "../../Model/IList";
import { IProduct } from "../../Model/IProduct";
import IAmount from "../../Model/IAmount";

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
  handle(data: IListInterface<ITag>): void;
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
export interface IControllerGetAMountsbyListProductsByUuid {
  handle(productsUuid: string): IAmount[];
}
export interface IControllerGetTagsByProductsUuid {
  handle(key: string[]): string[];
}
export interface IControllerGetTagByProductsUuid {
  handle(key: string): string;
}
export interface IControllerGetAmounts {
  handle(): IAmount[];
}
export interface IControllerGetTotalAmounts {
  handle(key: string): number;
}
export interface IControllerSaveAmountByUuid {
  handle(data: IAmount): void;
}
export interface IControllerSaveAmount {
  handle(data: IListInterface<IAmount>): void;
}
export interface IControllerDeleteAmountByUuid {
  handle(key: string): void;
}