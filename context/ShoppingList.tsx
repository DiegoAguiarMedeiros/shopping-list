import React, { createContext, useContext, useEffect, useState } from "react";
import ListStorage from "../utils/list";
import { ListItemInterface, ListItemAmountInterface } from "../types/types";
import { IList, IListInterface } from "../Domain/Model/IList";
import IAmount from "../Domain/Model/IAmount";
import getListsController from "../Domain/UseCases/List/GetLists";
import getTagsController from "../Domain/UseCases/Tag/GetTags";
import saveListsController from "../Domain/UseCases/List/SaveLists";
import getListsArchivedController from "../Domain/UseCases/ListArchived/GetLists";
import saveListsArchivedController from "../Domain/UseCases/ListArchived/SaveLists";
import GetListProducts from "../Domain/UseCases/ListProduct/GetListProducts";
import ITag from "../Domain/Model/ITag";
import { convertToInterface } from "../utils/functions";
import { IProduct } from "../Domain/Model/IProduct";
import GetAmountsController from "../Domain/UseCases/Amount/GetAmounts";

type ShoppingListProviderProps = {
  children: React.ReactNode;
};

type ShoppingListContextType = {
  list: IList[];
  setList: React.Dispatch<React.SetStateAction<IList[] | null>>;
  listProduct: IProduct[];
  setListProduct: React.Dispatch<
    React.SetStateAction<IProduct[] | null>
  >;
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[] | null>>;
  amount: IAmount[];
  setAmount: React.Dispatch<React.SetStateAction<IAmount[] | null>>;
};

const getListsFromStorage = (): IList[] | null => {
  return getListsController.handle();
};
const getTagsFromStorage = (): ITag[] | null => {
  return getTagsController.handle();
};
const getListProductFromStorage =
  (): IProduct[] | null => {
    return GetListProducts.handle();
  };
const getListAmountFromStorage =
  (): IAmount[] | null => {
    return GetAmountsController.handle();
  };

const setListOnStorage = (newList: IListInterface<IList>): void => {
  saveListsController.handle(newList);
};
const setListProductOnStorage = (newList: IListInterface<IProduct>): void => {
  ListStorage.setListProduct(newList);
};
const setListAmountOnStorage = (newList: IListInterface<IAmount>): void => {
  ListStorage.setListAmount(newList);
};
const getListArchivedFromStorage = (): IList[] | null => {
  return getListsArchivedController.handle();
};
const getListProductArchivedFromStorage =
  async (): Promise<IListInterface<IProduct> | null> => {
    const listProduct = await ListStorage.getListProductArchived();
    return listProduct;
  };
const getItemAmountArchivedFromStorage =
  async (): Promise<IListInterface<IAmount> | null> => {
    const itemAmountList = await ListStorage.getListAmountArchived();
    return itemAmountList;
  };

const setListArchivedOnStorage = (newList: IListInterface<IList>): void => {
  saveListsArchivedController.handle(newList);
};
const setListProductArchivedOnStorage = (
  newList: IListInterface<IProduct>
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



const ShoppingListProvider: React.FC<ShoppingListProviderProps> = ({
  children,
}) => {
  const [list, setList] = useState<IList[] | null>(null);
  const [tags, setTags] = useState<ITag[] | null>(null);
  const [listProduct, setListProduct] = useState<IProduct[] | null>(
    null
  );
  const [amount, setAmount] = useState<IAmount[] | null>(null);

  const loadList = (): void => {
    const listArr = getListsFromStorage();
    setList(listArr);
  };
  const loadListProduct = (): void => {
    const listItemArr = getListProductFromStorage();
    setListProduct(listItemArr);
  };
  const loadListAmount = (): void => {
    const itemAmountListArr = getListAmountFromStorage();
    setAmount(itemAmountListArr);
  };
  const loadTags = (): void => {
    const tagsArr = getTagsFromStorage();
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
  //   list && setListOnStorage(convertToInterface(list));
  //   listProduct && setListProductOnStorage(listProduct);
  //   listAmount && setListAmountOnStorage(listAmount);
  //   tags && setTagsOnStorage(convertToInterface(list));
  // }, [list, listProduct, listAmount]);

  return (
    <ShoppingListContext.Provider
      value={{
        list: list!,
        setList: setList,
        listProduct: listProduct!,
        setListProduct: setListProduct,
        amount: amount!,
        setAmount: setAmount,
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
  listProductArchived: IListInterface<IProduct>;
  setListProductArchived: React.Dispatch<
    React.SetStateAction<IListInterface<IProduct> | null>
  >;
  listAmountArchived: IListInterface<IAmount>;
  setListAmountArchived: React.Dispatch<
    React.SetStateAction<IListInterface<IAmount> | null>
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
    useState<IListInterface<IProduct> | null>(null);
  const [listAmountArchived, setListAmountArchived] =
    useState<IListInterface<IAmount> | null>(null);

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
    listArchived && setListArchivedOnStorage(convertToInterface(listArchived));
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
