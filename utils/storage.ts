import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ItemAmountInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../types/types";
import { IListAmountInterface } from "../Domain/Model/IAmount";
import { IListProductInterface } from "../Domain/Model/IProduct";
import { IListInterface } from "../Domain/Model/IList";

class Storage {
  retrieveData = async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data;
    } catch (error) {
      console.error("_retrieveData", error);
    }
  };
}

const _retrieveData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.error("_retrieveData", error);
  }
};

const setShoppingList = (value: IListInterface) => {
  AsyncStorage.setItem("SLSHOPPINGLIST", JSON.stringify(value));
};
const setShoppingListItem = (value: ListItemInterface) => {
  AsyncStorage.setItem("SLSHOPPINGLISTITEM", JSON.stringify(value));
};
const setShoppingListProduct = (value: IListProductInterface) => {
  AsyncStorage.setItem("SLSHOPPINGLISTPRODUCT", JSON.stringify(value));
};
const setShoppingItemAmount = (value: ListItemAmountInterface) => {
  AsyncStorage.setItem("SLSHOPPINGITEMAMOUNT", JSON.stringify(value));
};
const setShoppingListAmount = (value: IListAmountInterface) => {
  AsyncStorage.setItem("SLSHOPPINGLISTMAMOUNT", JSON.stringify(value));
};
const getShoppingList = async (): Promise<IListInterface | null> => {
  const listPromise: string | null | undefined = await _retrieveData(
    "SLSHOPPINGLIST"
  );

  if (listPromise) {
    const list: IListInterface = JSON.parse(listPromise);
    return list;
  }

  return null;
};
const getShoppingListItem = async (): Promise<IListProductInterface | null> => {
  const listItemPromise: string | null | undefined = await _retrieveData(
    "SLSHOPPINGLISTITEM"
  );

  if (listItemPromise) {
    const listItem: IListProductInterface = JSON.parse(listItemPromise);
    return listItem;
  }

  return null;
};
const getShoppingListProduct =
  async (): Promise<IListProductInterface | null> => {
    const listItemPromise: string | null | undefined = await _retrieveData(
      "SLSHOPPINGLISTPRODUCT"
    );

    if (listItemPromise) {
      const listItem: IListProductInterface = JSON.parse(listItemPromise);
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
const getShoppingListAmount =
  async (): Promise<ListItemAmountInterface | null> => {
    const itemAmountPromise: string | null | undefined = await _retrieveData(
      "SLSHOPPINGLISTAMOUNT"
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
const setShoppingListArchived = (value: IListInterface) => {
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
const getShoppingListArchived = async (): Promise<IListInterface | null> => {
  const listPromise: string | null | undefined = await _retrieveData(
    "SLARCHIVEDSHOPPINGLIST"
  );

  if (listPromise) {
    const list: IListInterface = JSON.parse(listPromise);
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
const getShoppingProductArchived =
  async (): Promise<IListProductInterface | null> => {
    const listItemPromise: string | null | undefined = await _retrieveData(
      "SLARCHIVEDSHOPPINGLISTPRODUCT"
    );

    if (listItemPromise) {
      const listItem: IListProductInterface = JSON.parse(listItemPromise);
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
const getShoppingListAmountArchived =
  async (): Promise<IListAmountInterface | null> => {
    const itemAmountPromise: string | null | undefined = await _retrieveData(
      "SLARCHIVEDSHOPPINGLISTAMOUNT"
    );

    if (itemAmountPromise) {
      const itemAmount: IListAmountInterface = JSON.parse(itemAmountPromise);
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
const setOnboarding = (value: boolean) => {
  AsyncStorage.setItem("ONBOARDING", JSON.stringify(value));
};
const getOnboarding = async (): Promise<boolean> => {
  const onboardingPromise: string | null | undefined = await _retrieveData(
    "ONBOARDING"
  );

  const onboarding: boolean = onboardingPromise === "true";
  return onboarding;
};

export default {
  Storage,
  getOnboarding,
  setOnboarding,
  //   getShoppingListItem,
  //   setShoppingListItem,
  //   getShoppingArchivedList,
  //   setShoppingArchivedList,
  //   getShoppingItemAmount,
  //   setShoppingItemAmount,
  //   getShoppingArchivedListItem,
  //   setShoppingArchivedListItem,
  //   getShoppingArchivedItemAmount,
  //   setShoppingArchivedItemAmount,
  //   setOnboarding,
  //   //novos
  //   setShoppingList,
  //   getShoppingList,
  //   setShoppingListProduct,
  //   setShoppingListAmount,
  //   setShoppingListArchived,
  //   getShoppingListArchived,
  //   getShoppingListProduct,
  //   getShoppingListAmount,
  //   getShoppingProductArchived,
  //   getShoppingListAmountArchived,
  //   _retrieveData,
};
