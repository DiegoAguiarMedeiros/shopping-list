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

const setListOnStorage = (newList: ListType): void => {
  ListStorage.setList(newList);
};
const setListItemOnStorage = (newList: ListItemInterface): void => {
  ListStorage.setListItem(newList);
};
const setItemAmountOnStorage = (newList: ListItemAmountInterface): void => {
  ListStorage.setItemAmount(newList);
};
const getListArchivedFromStorage = async (): Promise<ListType | null> => {
  const list = await ListStorage.getListArchived();
  return list;
};
const getListItemArchivedFromStorage =
  async (): Promise<ListItemInterface | null> => {
    const listItem = await ListStorage.getListItemArchived();
    return listItem;
  };
const getItemAmountArchivedFromStorage =
  async (): Promise<ListItemAmountInterface | null> => {
    const itemAmountList = await ListStorage.getItemAmountArchived();
    return itemAmountList;
  };

const setListArchivedOnStorage = (newList: ListType): void => {
  ListStorage.setListArchived(newList);
};
const setListItemArchivedOnStorage = (newList: ListItemInterface): void => {
  ListStorage.setListItemArchived(newList);
};
const setItemAmountArchivedOnStorage = (
  newList: ListItemAmountInterface
): void => {
  ListStorage.setItemAmountArchived(newList);
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
      const amount = getAmountOfListItems(itemList?.amount);
      total =
        total +
        amount.reduce((accumulator, currentValue) => {
          return (
            accumulator +
            Number(currentValue?.amount) * Number(currentValue?.quantity)
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
              return (
                accumulator +
                Number(currentValue.type ? "1" : currentValue.quantity)
              );
            }, 0)
          : total + Number(itemList.amount.length);
    });
    return total;
  };

  const getTotalUn = (items: ItemInterface[]): number => {
    let total: number = 0;
    items.forEach((itemList) => {
      const amount = getAmountOfListItems(itemList?.amount);
      total =
        amount.length > 0
          ? total +
            amount.reduce((accumulator, currentValue) => {
              return (
                accumulator +
                Number(currentValue?.type ? "1" : currentValue?.quantity)
              );
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
    list && setListOnStorage(list);
    listItem && setListItemOnStorage(listItem);
    itemAmountList && setItemAmountOnStorage(itemAmountList);
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

type ShoppingListArchivedContextType = {
  listArchived: ListType;
  setListArchived: React.Dispatch<React.SetStateAction<ListType | null>>;
  listItemArchived: ListItemInterface;
  setListItemArchived: React.Dispatch<
    React.SetStateAction<ListItemInterface | null>
  >;
  itemAmountListArchived: ListItemAmountInterface;
  setItemAmountListArchived: React.Dispatch<
    React.SetStateAction<ListItemAmountInterface | null>
  >;
  getListItemsOfListArchived: (listItems: string[]) => ItemInterface[];
  getAmountOfListItemsArchived: (
    listItemsArr: string[]
  ) => ItemAmountInterface[];
  getTotalWithAmountArchived: (listItemsArr: ItemInterface[]) => number;
  getTotalArchived: (listItemsArr: ItemInterface[]) => number;
  getTotalUnArchived: (listItemsArr: ItemInterface[]) => number;
};

const ShoppingListArchivedContext = createContext<
  ShoppingListArchivedContextType | undefined
>(undefined);

const ShoppingListArchivedProvider: React.FC<ShoppingListProviderProps> = ({
  children,
}) => {
  const [listArchived, setListArchived] = useState<ListType | null>(null);
  const [listItemArchived, setListItemArchived] =
    useState<ListItemInterface | null>(null);
  const [itemAmountListArchived, setItemAmountListArchived] =
    useState<ListItemAmountInterface | null>(null);

  const loadListArchived = async (): Promise<void> => {
    const listArr = await getListArchivedFromStorage();
    setListArchived(listArr);
  };
  const loadListItemArchived = async (): Promise<void> => {
    const listItemArr = await getListItemArchivedFromStorage();
    setListItemArchived(listItemArr);
  };
  const loadItemAmountArchived = async (): Promise<void> => {
    const itemAmountListArr = await getItemAmountArchivedFromStorage();
    setItemAmountListArchived(itemAmountListArr);
  };

  const getListItemsOfListArchived = (
    listItemsArr: string[]
  ): ItemInterface[] => {
    const returnListItemsArr: ItemInterface[] = [];
    if (listItemsArr) {
      listItemsArr.forEach((item: string) => {
        if (listItemArchived != null)
          returnListItemsArr.push(listItemArchived[item]);
      });
    }
    return returnListItemsArr;
  };
  const getAmountOfListItemsArchived = (
    amountItemList: string[]
  ): ItemAmountInterface[] => {
    const returnAmountItemList: ItemAmountInterface[] = [];
    itemAmountListArchived &&
      amountItemList.forEach((item: string) => {
        returnAmountItemList.push(itemAmountListArchived[item]);
      });
    return returnAmountItemList;
  };
  const getTotalArchived = (items: ItemInterface[]): number => {
    let total: number = 0;
    items.forEach((itemList) => {
      const amount = getAmountOfListItemsArchived(itemList.amount);
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

  const getTotalWithAmountArchived = (items: ItemInterface[]): number => {
    let total: number = 0;
    items.forEach((itemList) => {
      const amount = getAmountOfListItemsArchived(itemList.amount);
      total =
        itemList.amount.length > 0
          ? total +
            amount.reduce((accumulator, currentValue) => {
              return (
                accumulator +
                Number(currentValue.type ? "1" : currentValue.quantity)
              );
            }, 0)
          : total + Number(itemList.amount.length);
    });
    return total;
  };

  const getTotalUnArchived = (items: ItemInterface[]): number => {
    let total: number = 0;
    items.forEach((itemList) => {
      const amount = getAmountOfListItemsArchived(itemList.amount);
      total =
        amount.length > 0
          ? total +
            amount.reduce((accumulator, currentValue) => {
              return (
                accumulator +
                Number(currentValue.type ? "1" : currentValue.quantity)
              );
            }, 0)
          : total + 1;
    });
    return total;
  };

  useEffect(() => {
    loadListArchived();
    loadListItemArchived();
    loadItemAmountArchived();
  }, []);

  useEffect(() => {
    listArchived && setListArchivedOnStorage(listArchived);
    listItemArchived && setListItemArchivedOnStorage(listItemArchived);
    itemAmountListArchived &&
      setItemAmountArchivedOnStorage(itemAmountListArchived);
  }, [listArchived, listItemArchived, itemAmountListArchived]);

  return (
    <ShoppingListArchivedContext.Provider
      value={{
        listArchived: listArchived!,
        setListArchived: setListArchived,
        listItemArchived: listItemArchived!,
        setListItemArchived: setListItemArchived,
        itemAmountListArchived: itemAmountListArchived!,
        setItemAmountListArchived: setItemAmountListArchived,
        getListItemsOfListArchived: getListItemsOfListArchived,
        getTotalArchived: getTotalArchived,
        getTotalWithAmountArchived: getTotalWithAmountArchived,
        getTotalUnArchived: getTotalUnArchived,
        getAmountOfListItemsArchived: getAmountOfListItemsArchived,
      }}
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
