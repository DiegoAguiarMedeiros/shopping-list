import React, { createContext, useContext, useEffect, useState } from "react";
import ListStorage from "../utils/list";
import {
  ListInterface,
  ItemInterface,
  ListItemInterface,
  ListType,
  ItemAmountInterface,
  ListItemAmountInterface,
} from "../types/types";
type ShoppingListProviderProps = {
  children: React.ReactNode;
};

type ShoppingListContextType = {
  list: ListType;
  setList: React.Dispatch<React.SetStateAction<ListType | null>>;
  listItem: ListItemInterface;
  setListItem: React.Dispatch<React.SetStateAction<ListItemInterface | null>>;
  itemAmountList: ListItemAmountInterface;
  setItemAmountList: React.Dispatch<
    React.SetStateAction<ListItemAmountInterface | null>
  >;
  getListItemsOfList: (listItems: string[]) => ItemInterface[];
  getAmountOfListItems: (listItemsArr: string[]) => ItemAmountInterface[];
  getTotalWithAmount: (listItemsArr: ItemInterface[]) => number;
  getTotal: (listItemsArr: ItemInterface[]) => number;
  getTotalUn: (listItemsArr: ItemInterface[]) => number;
};
type ShoppingListArchivedContextType = {
  archived: ListType;
  setArchived: React.Dispatch<React.SetStateAction<ListType | null>>;
};

const getListFromStorage = async (): Promise<ListType | null> => {
  const list = await ListStorage.getList();
  return list;
};
const getListItemFromStorage = async (): Promise<ListItemInterface | null> => {
  const listItem = await ListStorage.getListItem();
  return listItem;
};
const getItemAmountFromStorage =
  async (): Promise<ListItemAmountInterface | null> => {
    const itemAmountList = await ListStorage.getItemAmount();
    return itemAmountList;
  };

const setListFromStorage = (newList: ListType): void => {
  ListStorage.setList(newList);
};
const setListItemFromStorage = (newList: ListItemInterface): void => {
  ListStorage.setListItem(newList);
};
const setItemAmountFromStorage = (newList: ListItemAmountInterface): void => {
  ListStorage.setItemAmount(newList);
};
const getListArchivedFromStorage = async (): Promise<ListType | null> => {
  const list = await ListStorage.getListArchived();
  return list;
};

const setListArchivedFromStorage = (newList: ListType): void => {
  ListStorage.setListArchived(newList);
};

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

const ShoppingListProvider: React.FC<ShoppingListProviderProps> = ({
  children,
}) => {
  const [list, setList] = useState<ListType | null>(null);
  const [listItem, setListItem] = useState<ListItemInterface | null>(null);
  const [itemAmountList, setItemAmountList] =
    useState<ListItemAmountInterface | null>(null);

  const loadList = async (): Promise<void> => {
    const listArr = await getListFromStorage();
    setList(listArr);
  };
  const loadListItem = async (): Promise<void> => {
    const listItemArr = await getListItemFromStorage();
    setListItem(listItemArr);
  };
  const loadItemAmount = async (): Promise<void> => {
    const itemAmountListArr = await getItemAmountFromStorage();
    setItemAmountList(itemAmountListArr);
  };

  const getListItemsOfList = (listItemsArr: string[]): ItemInterface[] => {
    const returnListItemsArr: ItemInterface[] = [];
    if (listItemsArr) {
      listItemsArr.forEach((item: string) => {
        if (listItem != null) returnListItemsArr.push(listItem[item]);
      });
    }
    return returnListItemsArr;
  };
  const getAmountOfListItems = (
    amountItemList: string[]
  ): ItemAmountInterface[] => {
    const returnAmountItemList: ItemAmountInterface[] = [];
    itemAmountList &&
      amountItemList.forEach((item: string) => {
        returnAmountItemList.push(itemAmountList[item]);
      });
    return returnAmountItemList;
  };

  const getTotal = (items: ItemInterface[]): number => {
    let total: number = 0;
    items.forEach((itemList) => {
      const amount = getAmountOfListItems(itemList.amount);
      total =
        total +
        amount.reduce((accumulator, currentValue) => {
          return (
            accumulator +
            Number(currentValue.amount) * Number(currentValue.quantity)
          );
        }, 0);
    });
    return total;
  };

  const getTotalWithAmount = (items: ItemInterface[]): number => {
    let total: number = 0;
    items.forEach((itemList) => {
      const amount = getAmountOfListItems(itemList.amount);
      total =
        itemList.amount.length > 0
          ? total +
            amount.reduce((accumulator, currentValue) => {
              return accumulator + Number(currentValue.quantity);
            }, 0)
          : total + Number(itemList.amount.length);
    });
    return total;
  };

  const getTotalUn = (items: ItemInterface[]): number => {
    let total: number = 0;
    items.forEach((itemList) => {
      const amount = getAmountOfListItems(itemList.amount);
      total =
        amount.length > 0
          ? total +
            amount.reduce((accumulator, currentValue) => {
              return accumulator + Number(currentValue.quantity);
            }, 0)
          : total + 1;
    });
    return total;
  };
  useEffect(() => {
    loadList();
    loadListItem();
    loadItemAmount();
  }, []);

  useEffect(() => {
    list && setListFromStorage(list);
    listItem && setListItemFromStorage(listItem);
    itemAmountList && setItemAmountFromStorage(itemAmountList);
  }, [list, listItem, itemAmountList]);

  return (
    <ShoppingListContext.Provider
      value={{
        list: list!,
        setList: setList,
        listItem: listItem!,
        setListItem: setListItem,
        itemAmountList: itemAmountList!,
        setItemAmountList: setItemAmountList,
        getListItemsOfList: getListItemsOfList,
        getAmountOfListItems: getAmountOfListItems,
        getTotalWithAmount: getTotalWithAmount,
        getTotal: getTotal,
        getTotalUn: getTotalUn,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
const useShoppingListContext = () => {
  const context = useContext(ShoppingListContext);

  if (!context) {
    throw new Error(
      "useShoppingListContext must be used within a ShoppingListProvider"
    );
  }

  return context;
};

const ShoppingListArchivedContext = createContext<
  ShoppingListArchivedContextType | undefined
>(undefined);

const ShoppingListArchivedProvider: React.FC<ShoppingListProviderProps> = ({
  children,
}) => {
  const [list, setList] = useState<ListType | null>(null);

  const loadList = async (): Promise<void> => {
    const listArr = await getListArchivedFromStorage();
    setList(listArr);
  };

  useEffect(() => {
    loadList();
  }, []);
  useEffect(() => {
    list && setListArchivedFromStorage(list!);
  }, [list]);

  return (
    <ShoppingListArchivedContext.Provider
      value={{ archived: list!, setArchived: setList }}
    >
      {children}
    </ShoppingListArchivedContext.Provider>
  );
};

const useShoppingListArchivedContext = () => {
  const context = useContext(ShoppingListArchivedContext);

  if (!context) {
    throw new Error(
      "useShoppingListContext must be used within a ShoppingListProvider"
    );
  }

  return context;
};

export {
  ShoppingListProvider,
  useShoppingListContext,
  ShoppingListArchivedProvider,
  useShoppingListArchivedContext,
};
