import Storage from "./storage";
import {
  ItemAmountInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../types/types";

const getList = () => Storage.getShoppingList();

const getListItem = () => Storage.getShoppingListItem();

const getItemAmount = () => Storage.getShoppingItemAmount();

const setList = (list: ListType) => {
  Storage.setShoppingList(list);
};

const setListItem = (listItem: ListItemInterface) => {
  Storage.setShoppingListItem(listItem);
};
const setItemAmount = (listItem: ListItemAmountInterface) => {
  Storage.setShoppingItemAmount(listItem);
};
const getListArchived = () => Storage.getShoppingArchivedList();

const getListItemArchived = () => Storage.getShoppingArchivedListItem();

const getItemAmountArchived = () => Storage.getShoppingArchivedItemAmount();

const setListArchived = (list: ListType) => {
  Storage.setShoppingArchivedList(list);
};
const setListItemArchived = (listItem: ListItemInterface) => {
  Storage.setShoppingArchivedListItem(listItem);
};
const setItemAmountArchived = (listItem: ListItemAmountInterface) => {
  Storage.setShoppingArchivedItemAmount(listItem);
};

export default {
  getList,
  getListItem,
  setList,
  setListItem,
  getItemAmount,
  setItemAmount,
  getListArchived,
  setListArchived,
  getListItemArchived,
  getItemAmountArchived,
  setListItemArchived,
  setItemAmountArchived,
};
