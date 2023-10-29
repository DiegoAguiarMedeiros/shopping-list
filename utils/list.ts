import Storage from "./storage";
import {
  ItemAmountInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../types/types";
import { IListAmountInterface } from "../Domain/Model/IAmount";
import { IListProductInterface } from "../Domain/Model/IProduct";
import { IListInterface } from "../Domain/Model/IList";

const getList = () => Storage.getShoppingList();

const getListItem = () => Storage.getShoppingListItem();

const getListProduct = () => Storage.getShoppingListProduct();

const getItemAmount = () => Storage.getShoppingItemAmount();

const getListAmount = () => Storage.getShoppingListAmount();

const setList = (list: IListInterface) => {
  Storage.setShoppingList(list);
};

const setListItem = (listItem: ListItemInterface) => {
  Storage.setShoppingListItem(listItem);
};
const setListProduct = (listProduct: IListProductInterface) => {
  Storage.setShoppingListProduct(listProduct);
};
const setListAmount = (amountList: IListAmountInterface) => {
  Storage.setShoppingListAmount(amountList);
};

const setItemAmount = (listItem: ListItemAmountInterface) => {
  Storage.setShoppingItemAmount(listItem);
};
const getListArchived = () => Storage.getShoppingListArchived();

const getListItemArchived = () => Storage.getShoppingArchivedListItem();

const getListProductArchived = () => Storage.getShoppingProductArchived();

const getItemAmountArchived = () => Storage.getShoppingArchivedItemAmount();

const getListAmountArchived = () => Storage.getShoppingListAmountArchived();

const setListArchived = (list: IListInterface) => {
  Storage.setShoppingListArchived(list);
};
const setListItemArchived = (listItem: ListItemInterface) => {
  Storage.setShoppingArchivedListItem(listItem);
};
const setItemAmountArchived = (listItem: ListItemAmountInterface) => {
  Storage.setShoppingArchivedItemAmount(listItem);
};
const setListProductArchived = (listItem: IListProductInterface) => {
  Storage.setShoppingArchivedListItem(listItem);
};
const setListAmountArchived = (listItem: IListAmountInterface) => {
  Storage.setShoppingArchivedItemAmount(listItem);
};

export default {
  getList,
  getListItem,
  setListItem,
  getItemAmount,
  setItemAmount,
  getListArchived,
  getListItemArchived,
  getItemAmountArchived,
  setListItemArchived,
  setItemAmountArchived,
  //novos
  setList,
  setListArchived,
  setListProduct,
  setListAmount,
  getListProduct,
  getListAmount,
  getListProductArchived,
  getListAmountArchived,
  setListProductArchived,
  setListAmountArchived,
};
