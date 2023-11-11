import React, { createContext, useContext, useEffect, useState } from "react";
import ListStorage from "../utils/list";
import { ListItemInterface, ListItemAmountInterface } from "../types/types";
import { IList, IListInterface } from "../Domain/Model/IList";
import { IListProductInterface } from "../Domain/Model/IProduct";
import { IListAmountInterface } from "../Domain/Model/IAmount";
import getListsController from "../Domain/UseCases/List/GetLists";
import getTagsController from "../Domain/UseCases/Tag/GetTags";
import saveListsController from "../Domain/UseCases/List/SaveLists";
import getListsArchivedController from "../Domain/UseCases/ListArchived/GetLists";
import saveListsArchivedController from "../Domain/UseCases/ListArchived/SaveLists";
import ITag from "../Domain/Model/ITag";
type ShoppingListProviderProps = {
  children: React.ReactNode;
};

type ShoppingListContextType = {
  list: IList[];
  setList: React.Dispatch<React.SetStateAction<IList[] | null>>;
  listProduct: IListProductInterface;
  setListProduct: React.Dispatch<
    React.SetStateAction<IListProductInterface | null>
  >;
  listAmount: IListAmountInterface;
  setListAmount: React.Dispatch<
    React.SetStateAction<IListAmountInterface | null>
  >;
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[] | null>>;
};

const getListsFromStorage = (): IList[] | null => {
  return getListsController.handle();
};
const getTagsFromStorage = (): ITag[] | null => {
  return getTagsController.handle();
};
const getListProductFromStorage =
  async (): Promise<IListProductInterface | null> => {
    const listItem = await ListStorage.getListProduct();
    return listItem;
  };
const getListAmountFromStorage =
  async (): Promise<IListAmountInterface | null> => {
    const itemAmountList = await ListStorage.getListAmount();
    return itemAmountList;
  };

const setListOnStorage = (newList: IListInterface): void => {
  saveListsController.handle(newList);
};
const setListProductOnStorage = (newList: IListProductInterface): void => {
  ListStorage.setListProduct(newList);
};
const setListAmountOnStorage = (newList: IListAmountInterface): void => {
  ListStorage.setListAmount(newList);
};
const getListArchivedFromStorage = (): IList[] | null => {
  return getListsArchivedController.handle();
};
const getListProductArchivedFromStorage =
  async (): Promise<IListProductInterface | null> => {
    const listProduct = await ListStorage.getListProductArchived();
    return listProduct;
  };
const getItemAmountArchivedFromStorage =
  async (): Promise<IListAmountInterface | null> => {
    const itemAmountList = await ListStorage.getListAmountArchived();
    return itemAmountList;
  };

const setListArchivedOnStorage = (newList: IListInterface): void => {
  saveListsArchivedController.handle(newList);
};
const setListProductArchivedOnStorage = (
  newList: IListProductInterface
): void => {
  ListStorage.setListProductArchived(newList);
};
const setListAmountArchivedOnStorage = (
  newList: ListItemAmountInterface
): void => {
  ListStorage.setItemAmountArchived(newList);
};

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

const convertToIListInterface = (listArray: IList[]): IListInterface => {
  const listInterface: IListInterface = {};
  listArray.forEach((item) => {
    listInterface[item.uuid] = item;
  });
  return listInterface;
};

const ShoppingListProvider: React.FC<ShoppingListProviderProps> = ({
  children,
}) => {
  const [list, setList] = useState<IList[] | null>(null);
  const [tags, setTags] = useState<ITag[] | null>(null);
  const [listProduct, setListProduct] = useState<IListProductInterface | null>(
    null
  );
  const [listAmount, setListAmount] = useState<IListAmountInterface | null>(
    null
  );

  const loadList = async (): Promise<void> => {
    const listArr = await getListsFromStorage();
    setList(listArr);
  };
  const loadListProduct = async (): Promise<void> => {
    const listItemArr = await getListProductFromStorage();
    setListProduct(listItemArr);
  };
  const loadListAmount = async (): Promise<void> => {
    const itemAmountListArr = await getListAmountFromStorage();
    setListAmount(itemAmountListArr);
  };
  const loadTags = async (): Promise<void> => {
    const tagsArr = await getTagsFromStorage();
    setTags(tagsArr);
  };

  // const getListItemsOfList = (listItemsArr: string[]): ItemInterface[] => {
  //   const returnListItemsArr: ItemInterface[] = [];
  //   if (listItemsArr) {
  //     listItemsArr.forEach((item: string) => {
  //       if (listItem != null) returnListItemsArr.push(listItem[item]);
  //     });
  //   }
  //   return returnListItemsArr;
  // };
  // const getAmountOfListItems = (
  //   amountItemList: string[]
  // ): ItemAmountInterface[] => {
  //   const returnAmountItemList: ItemAmountInterface[] = [];
  //   itemAmountList &&
  //     amountItemList.forEach((item: string) => {
  //       returnAmountItemList.push(itemAmountList[item]);
  //     });
  //   return returnAmountItemList;
  // };

  // const getTotal = (items: ItemInterface[]): number => {
  //   let total: number = 0;
  //   items.forEach((itemList) => {
  //     const amount = getAmountOfListItems(itemList?.amount);
  //     total =
  //       total +
  //       amount.reduce((accumulator, currentValue) => {
  //         return (
  //           accumulator +
  //           Number(currentValue?.amount) * Number(currentValue?.quantity)
  //         );
  //       }, 0);
  //   });
  //   return total;
  // };

  // const getTotalWithAmount = (items: ItemInterface[]): number => {
  //   let total: number = 0;
  //   items.forEach((itemList) => {
  //     const amount = getAmountOfListItems(itemList.amount);
  //     total =
  //       itemList.amount.length > 0
  //         ? total +
  //           amount.reduce((accumulator, currentValue) => {
  //             return (
  //               accumulator +
  //               Number(currentValue.type ? "1" : currentValue.quantity)
  //             );
  //           }, 0)
  //         : total + Number(itemList.amount.length);
  //   });
  //   return total;
  // };

  // const getTotalUn = (items: ItemInterface[]): number => {
  //   let total: number = 0;
  //   items.forEach((itemList) => {
  //     const amount = getAmountOfListItems(itemList?.amount);
  //     total =
  //       amount.length > 0
  //         ? total +
  //           amount.reduce((accumulator, currentValue) => {
  //             return (
  //               accumulator +
  //               Number(currentValue?.type ? "1" : currentValue?.quantity)
  //             );
  //           }, 0)
  //         : total + 1;
  //   });
  //   return total;
  // };
  useEffect(() => {
    loadList();
    loadListProduct();
    loadListAmount();
    loadTags();
  }, []);




  // useEffect(() => {
  //   list && setListOnStorage(convertToIListInterface(list));
  //   listProduct && setListProductOnStorage(listProduct);
  //   listAmount && setListAmountOnStorage(listAmount);
  //   tags && setTagsOnStorage(convertToIListInterface(list));
  // }, [list, listProduct, listAmount]);

  return (
    <ShoppingListContext.Provider
      value={{
        list: list!,
        setList: setList,
        listProduct: listProduct!,
        setListProduct: setListProduct,
        listAmount: listAmount!,
        setListAmount: setListAmount,
        tags: tags!,
        setTags: setTags,
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
  listArchived: IList[];
  setListArchived: React.Dispatch<React.SetStateAction<IList[] | null>>;
  listProductArchived: IListProductInterface;
  setListProductArchived: React.Dispatch<
    React.SetStateAction<IListProductInterface | null>
  >;
  listAmountArchived: IListAmountInterface;
  setListAmountArchived: React.Dispatch<
    React.SetStateAction<IListAmountInterface | null>
  >;
};

const ShoppingListArchivedContext = createContext<
  ShoppingListArchivedContextType | undefined
>(undefined);

const ShoppingListArchivedProvider: React.FC<ShoppingListProviderProps> = ({
  children,
}) => {
  const [listArchived, setListArchived] = useState<IList[] | null>(null);
  const [listProductArchived, setListProductArchived] =
    useState<IListProductInterface | null>(null);
  const [listAmountArchived, setListAmountArchived] =
    useState<IListAmountInterface | null>(null);

  const loadListArchived = async (): Promise<void> => {
    const listArr = await getListArchivedFromStorage();
    setListArchived(listArr);
  };
  const loadListProductArchived = async (): Promise<void> => {
    const listItemArr = await getListProductArchivedFromStorage();
    setListProductArchived(listItemArr);
  };
  const loadListAmountArchived = async (): Promise<void> => {
    const listAmountArr = await getItemAmountArchivedFromStorage();
    setListAmountArchived(listAmountArr);
  };

  // const getListItemsOfListArchived = (
  //   listItemsArr: string[]
  // ): ItemInterface[] => {
  //   const returnListItemsArr: ItemInterface[] = [];
  //   if (listItemsArr) {
  //     listItemsArr.forEach((item: string) => {
  //       if (listItemArchived != null)
  //         returnListItemsArr.push(listItemArchived[item]);
  //     });
  //   }
  //   return returnListItemsArr;
  // };
  // const getAmountOfListItemsArchived = (
  //   amountItemList: string[]
  // ): ItemAmountInterface[] => {
  //   const returnAmountItemList: ItemAmountInterface[] = [];
  //   itemAmountListArchived &&
  //     amountItemList.forEach((item: string) => {
  //       returnAmountItemList.push(itemAmountListArchived[item]);
  //     });
  //   return returnAmountItemList;
  // };
  // const getTotalArchived = (items: ItemInterface[]): number => {
  //   let total: number = 0;
  //   items.forEach((itemList) => {
  //     const amount = getAmountOfListItemsArchived(itemList.amount);
  //     total =
  //       total +
  //       amount.reduce((accumulator, currentValue) => {
  //         return (
  //           accumulator +
  //           Number(currentValue.amount) * Number(currentValue.quantity)
  //         );
  //       }, 0);
  //   });
  //   return total;
  // };

  // const getTotalWithAmountArchived = (items: ItemInterface[]): number => {
  //   let total: number = 0;
  //   items.forEach((itemList) => {
  //     const amount = getAmountOfListItemsArchived(itemList.amount);
  //     total =
  //       itemList.amount.length > 0
  //         ? total +
  //           amount.reduce((accumulator, currentValue) => {
  //             return (
  //               accumulator +
  //               Number(currentValue.type ? "1" : currentValue.quantity)
  //             );
  //           }, 0)
  //         : total + Number(itemList.amount.length);
  //   });
  //   return total;
  // };

  // const getTotalUnArchived = (items: ItemInterface[]): number => {
  //   let total: number = 0;
  //   items.forEach((itemList) => {
  //     const amount = getAmountOfListItemsArchived(itemList.amount);
  //     total =
  //       amount.length > 0
  //         ? total +
  //           amount.reduce((accumulator, currentValue) => {
  //             return (
  //               accumulator +
  //               Number(currentValue.type ? "1" : currentValue.quantity)
  //             );
  //           }, 0)
  //         : total + 1;
  //   });
  //   return total;
  // };

  useEffect(() => {
    loadListArchived();
    loadListProductArchived();
    loadListAmountArchived();
  }, []);

  useEffect(() => {
    listArchived && setListArchivedOnStorage(convertToIListInterface(listArchived));
    listProductArchived && setListProductArchivedOnStorage(listProductArchived);
    listAmountArchived && setListAmountArchivedOnStorage(listAmountArchived);
  }, [listArchived, listProductArchived, listAmountArchived]);

  return (
    <ShoppingListArchivedContext.Provider
      value={{
        listArchived: listArchived!,
        setListArchived: setListArchived,
        listProductArchived: listProductArchived!,
        setListProductArchived: setListProductArchived,
        listAmountArchived: listAmountArchived!,
        setListAmountArchived: setListAmountArchived,
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
