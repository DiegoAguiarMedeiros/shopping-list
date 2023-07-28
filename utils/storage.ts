import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ItemAmountInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../types/types";

const _retrieveData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.error("_retrieveData", error);
  }
};

const setShoppingList = (value: ListType) => {
  AsyncStorage.setItem("SLSHOPPINGLIST", JSON.stringify(value));
};
const setShoppingListItem = (value: ListItemInterface) => {
  AsyncStorage.setItem("SLSHOPPINGLISTITEM", JSON.stringify(value));
};
const setShoppingItemAmount = (value: ListItemAmountInterface) => {
  AsyncStorage.setItem("SLSHOPPINGITEMAMOUNT", JSON.stringify(value));
};
const getShoppingList = async (): Promise<ListType | null> => {
  const listPromise: string | null | undefined = await _retrieveData(
    "SLSHOPPINGLIST"
  );

  if (listPromise) {
    const list: ListType = JSON.parse(listPromise);
    return list;
  }

  return null;
};
const getShoppingListItem = async (): Promise<ListItemInterface | null> => {
  const listItemPromise: string | null | undefined = await _retrieveData(
    "SLSHOPPINGLISTITEM"
  );

  if (listItemPromise) {
    const listItem: ListItemInterface = JSON.parse(listItemPromise);
    return listItem;
  }

  return null;
};
const getShoppingItemAmount =
  async (): Promise<ListItemAmountInterface | null> => {
    const itemAmountPromise: string | null | undefined = await _retrieveData(
      "SLSHOPPINGITEMAMOUNT"
    );

    if (itemAmountPromise) {
      const itemAmount: ListItemAmountInterface = JSON.parse(itemAmountPromise);
      return itemAmount;
    }

    return null;
  };

const setShoppingArchivedList = (value: ListType) => {
  AsyncStorage.setItem("SLARCHIVEDSHOPPINGLIST", JSON.stringify(value));
};
const getShoppingArchivedList = async (): Promise<ListType | null> => {
  const listPromise: string | null | undefined = await _retrieveData(
    "SLARCHIVEDSHOPPINGLIST"
  );

  if (listPromise) {
    const list: ListType = JSON.parse(listPromise);
    return list;
  }

  return null;
};

const getShoppingArchivedListItem =
  async (): Promise<ListItemInterface | null> => {
    const listItemPromise: string | null | undefined = await _retrieveData(
      "SLARCHIVEDSHOPPINGLISTITEM"
    );

    if (listItemPromise) {
      const listItem: ListItemInterface = JSON.parse(listItemPromise);
      return listItem;
    }

    return null;
  };
const getShoppingArchivedItemAmount =
  async (): Promise<ListItemAmountInterface | null> => {
    const itemAmountPromise: string | null | undefined = await _retrieveData(
      "SLARCHIVEDSHOPPINGITEMAMOUNT"
    );

    if (itemAmountPromise) {
      const itemAmount: ListItemAmountInterface = JSON.parse(itemAmountPromise);
      return itemAmount;
    }

    return null;
  };

const setShoppingArchivedListItem = (value: ListItemInterface) => {
  AsyncStorage.setItem("SLARCHIVEDSHOPPINGLISTITEM", JSON.stringify(value));
};
const setShoppingArchivedItemAmount = (value: ListItemAmountInterface) => {
  AsyncStorage.setItem("SLARCHIVEDSHOPPINGITEMAMOUNT", JSON.stringify(value));
};

export default {
  getShoppingList,
  setShoppingList,
  getShoppingListItem,
  setShoppingListItem,
  getShoppingArchivedList,
  setShoppingArchivedList,
  getShoppingItemAmount,
  setShoppingItemAmount,
  getShoppingArchivedListItem,
  setShoppingArchivedListItem,
  getShoppingArchivedItemAmount,
  setShoppingArchivedItemAmount,
};
