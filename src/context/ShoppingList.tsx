import React, { createContext, useContext, useEffect, useState } from "react";
import { IList, IListInterface } from "../Model/IList";
import IAmount from "../Model/IAmount";
import getListsController from "../UseCases/List/GetLists";
import getTagsController from "../UseCases/Tag/GetTags";
import saveListsController from "../UseCases/List/SaveLists";
import getListsArchivedController from "../UseCases/ListArchived/GetListArchived";
import saveListArchivedByUuidController from "../UseCases/ListArchived/SaveListArchivedByUuid";
import ITag from "../Model/ITag";
import { IProduct, ITagsProductsMultiSelect } from "../Model/IProduct";
import GetAmountsController from "../UseCases/Amount/GetAmounts";

import UUIDGenerator from "react-native-uuid";
import saveListByUuidController from "../UseCases/List/SaveListByUuid";
import addProductToListByUuidController from "../UseCases/List/AddProductToListByUuid";
import getProductByUuidController from "../UseCases/ListProduct/GetProductByUuid";
import saveListProductByUuidController from "../UseCases/ListProduct/SaveListProductByUuid";
import saveTagByUuidController from "../UseCases/Tag/SaveTagByUuid";
import saveAmountByUuidController from "../UseCases/Amount/SaveAmountByUuid";
import deleteListByUuidController from "../UseCases/List/DeleteListByUuid";
import deleteListArchivedByUuidController from "../UseCases/ListArchived/DeleteListByUuid";
import deleteProductFromListByUuidController from "../UseCases/List/DeleteProductFromListByUuid";
import DeleteProductByUuid from "../UseCases/ListProduct/DeleteProductByUuid";
import deleteAmountByUuidController from "../UseCases/Amount/DeleteAmountByUuid";
import deleteTagByUuidController from "../UseCases/Tag/DeleteTagByUuid";
import getAmountByListProductUuidController from "../UseCases/Amount/GetAmountByListProductUuid";
import { sortArrayOfObjects } from "../utils/functions";
import { ToastAndroid, useColorScheme } from "react-native";
import saveThemeController from "../UseCases/Config/SaveTheme";
import getThemeController from "../UseCases/Config/GetTheme";
import getLanguageController from "../UseCases/Config/GetLanguage";
import saveLanguageController from "../UseCases/Config/SaveLanguage";
import getCurrencyController from "../UseCases/Config/GetCurrency";
import saveCurrencyController from "../UseCases/Config/SaveCurrency";
import getColorController from "../UseCases/Config/GetColor";
import saveColorController from "../UseCases/Config/SaveColor";
import {
  ColorList,
  Colors,
  colorTheme,
  colors,
  typeTheme,
} from "../../constants/Colors";
import I18n from "i18n-js";
import getLastPricesByProductUuidController from "../UseCases/ListArchived/GetLastPricesByProductUuid";
import getTagByUuidController from "../UseCases/Tag/GetTagByUuid";
import getListProductsByTagUuidController from "../UseCases/ListProduct/GetListProductsByTagUuid";
import getAllProductsController from "../UseCases/ListProduct/GetAllProducts";
import getAllProductsObjectsController from "../UseCases/ListProduct/GetAllProductsObjects";
import getListByUuidController from "../UseCases/List/GetListByUuid";
import getTotalAmountByListUuidController from "../UseCases/List/GetTotalAmountByListUuid";
import getTotalQuantityWithoutAmountByListUuidController from "../UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
import getTotalQuantityAmountByListUuidController from "../UseCases/List/GetTotalQuantityAmountByListUuid";
import removeListByUuidController from "../UseCases/List/RemoveListByUuid";
import getNumberOfProductsByTagsUuidController from "../UseCases/ListProduct/GetNumberOfProductsByTagsUuid";
import getTagUuidByTagNameController from "../UseCases/Tag/GetTagUuidByTagName";
import getAmountByUuidController from "../UseCases/Amount/GetAmountByUuid";
import getTotalAmountByListProductUuidController from "../UseCases/Amount/GetTotalAmountByListProductUuid";
import getProductsToSelectByListUuidController from "../UseCases/ListProduct/GetProductsToSelectByListUuid";
import { languageType } from "../types/types";
import getTagsObjectController from "../UseCases/Tag/GetTagsObject";

type ShoppingListProviderProps = {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  lang: languageType;
  handleLanguageChange: (newLanguage: languageType) => void;
  children: React.ReactNode;
  color: ColorList;
  setColor: React.Dispatch<React.SetStateAction<ColorList>>;
};

type ShoppingListContextType = {
  getLists: () => string[];
  getListsObject: () => IList[];
  getAllProducts: () => string[];
  getAllProductsObjects: () => IProduct[];
  getTags: () => string[];
  getTagsObject: () => ITag[];
  getTagUuidByTagName: (name: string) => string;
  getProductsByTagUuid: (tag: string) => IProduct[];
  getProductsToSelectByListUuid: (
    listUuid: string
  ) => ITagsProductsMultiSelect[];
  getProductByUuid: (tag: string) => IProduct | null;
  getListItemsByListUuid: (uuid: string) => string[];
  getListByUuid: (uuid: string) => IList;
  getTagByUuid: (uuid: string) => ITag;
  getAmountByUuid: (amountUuid: string) => IAmount;
  getAmountByListProductUuid: (listProductUuid: string) => IAmount[];
  getListAmount: () => IAmount[];
  getListArchived: () => string[];
  getListAmountArchived: () => IAmount[];
  handleAddList: (list: string) => IList;
  handleCopyList: (listUuid: string, listName: string) => IList;
  handleEditList: (listUuid: string, listName: string) => void;
  handleAddListItem: (listUuid: string, itemUuid: string[]) => IList;
  handleAddListProduct: (productName: string, tag: string) => IProduct;
  handleEditListProduct: (
    listUuid: string,
    productName: string,
    tag: string
  ) => void;
  handleAddTag: (tag: string) => ITag;
  handleEditTag: (tagUuid: string, tag: string) => void;
  handleAddAmount: (newAmount: string, listProductUuid: string) => newListItem;
  handleDeleteList: (
    listUuid: string,
    listRef: React.MutableRefObject<{
      handleAddNewList: (uuid: string) => void;
      handleAddNewListArray: (list: string[]) => void;
    } | null>
  ) => void;
  handleDeleteListArchived: (listUuid: string) => void;
  handleArchived: (
    listUuid: string,
    listRef: React.MutableRefObject<{
      handleAddNewList: (uuid: string) => void;
      handleAddNewListArray: (list: string[]) => void;
    } | null>
  ) => void;
  handleDeleteTag: (tagUuid: string) => void;
  handleDeleteProductFromList: (listUuid: string, productUuid: string) => void;
  handleDeleteProduct: (prodcutUuid: string) => void;
  handleEditItemsAmount: (amountUuid: string, type: boolean) => void;
  handleDeleteAmountInList: (amountUuid: string) => void;
  changeAmountQuantity: (newQuantity: string, amountUuid: string) => IAmount;
  handleAmountInputChange: (value: string, amountUuid: string) => IAmount;
  getTheme(): "light" | "dark";
  saveTheme(theme: "light" | "dark"): void;
  getLang(): languageType;
  saveLang: (lang: languageType) => void;
  getCurrency: () => string;
  saveCurrency: (currency: string) => void;
  getColor: () => colorTheme;
  getNewLoadColor: () => colorTheme;
  saveColor: (color: ColorList) => void;
  getLastPrices: (productUuid: string) => string[];
  getTotalAmountByListUuid: (uuid: string, productsList?: IProduct[]) => number;
  getTotalAmountByListProductUuid: (
    uuid: string,
    productsList?: IProduct[]
  ) => number;
  getTotalQuantityWithoutAmountByListUuid: (
    uuid: string,
    productsList?: IProduct[]
  ) => number;
  getTotalQuantityAmountByListUuid: (
    uuid: string,
    productsList?: IProduct[]
  ) => number;
  getNumberOfProductsByTagsUuid: (uuid: string) => number;
};

const getListsFromStorage = (): string[] => {
  return getListsController.handle();
};
const getListsObjectFromStorage = (): IList[] => {
  return getListsController.handle();
};
const getTotalAmountByListUuidFromStorage = (
  uuid: string,
  productsList?: IProduct[]
): number => {
  return getTotalAmountByListUuidController.handle(uuid, productsList);
};
const getTotalAmountByListProductUuidFromStorage = (uuid: string): number => {
  return getTotalAmountByListProductUuidController.handle(uuid);
};
const getTotalQuantityWithoutAmountByListUuidFromStorage = (
  uuid: string,
  productsList?: IProduct[]
): number => {
  return getTotalQuantityWithoutAmountByListUuidController.handle(
    uuid,
    productsList
  );
};
const getListItemsByListUuidFromStorage = (uuid: string): string[] => {
  return [];
};
const getTotalQuantityAmountByListUuidFromStorage = (
  uuid: string,
  productsList?: IProduct[]
): number => {
  return getTotalQuantityAmountByListUuidController.handle(uuid, productsList);
};
const getNumberOfProductsByTagsUuidFromStorage = (uuid: string): number => {
  return getNumberOfProductsByTagsUuidController.handle(uuid);
};
const getTagsFromStorage = (): string[] => {
  return getTagsController.handle();
};
const getTagUuidByTagNameFromStorage = (name: string): string => {
  return getTagUuidByTagNameController.handle(name);
};
const getTagsObjectFromStorage = (): ITag[] => {
  return getTagsObjectController.handle();
};
const getProductsToSelectByListUuidFromStorage = (
  listUuid: string
): ITagsProductsMultiSelect[] => {
  const result = getProductsToSelectByListUuidController.handle(listUuid);
  return result;
};
const getProductsByTagUuidFromStorage = (tag: string): IProduct[] => {
  return getListProductsByTagUuidController.handle(tag);
};
const getAllProductsFromStorage = (): string[] => {
  return getAllProductsController.handle();
};
const getAllProductsObjectsFromStorage = (): IProduct[] => {
  return getAllProductsObjectsController.handle();
};
const getProductsByUuidFromStorage = (product: string): IProduct | null => {
  return getProductByUuidController.handle(product);
};
const getListsByUuidFromStorage = (uuid: string): IList => {
  return getListByUuidController.handle(uuid);
};
const getTagsByUuidFromStorage = (uuid: string): ITag => {
  return getTagByUuidController.handle(uuid);
};
// const getListProductFromStorage = (): IProduct[] => {
//   return GetListProducts.handle();
// };
const getAmountByUuidFromStorage = (amountUuid: string): IAmount => {
  return getAmountByUuidController.handle(amountUuid);
};
const getAmountByListProductUuidFromStorage = (
  listProductUuid: string
): IAmount[] => {
  return getAmountByListProductUuidController.handle(listProductUuid);
};
const getListAmountFromStorage = (): IAmount[] => {
  return GetAmountsController.handle();
};

const getListArchivedFromStorage = (): string[] => {
  return getListsArchivedController.handle();
};
// const getListProductArchivedFromStorage = (): IProduct[] => {
//   return GetListProducts.handle();
// };
const getItemAmountArchivedFromStorage = (): IAmount[] => {
  return GetAmountsController.handle();
};

const saveNewList = (newList: IList): void => {
  saveListByUuidController.handle(newList);
};

const addProductToListByUuid = (listUuid: string, itemUuid: string[]) => {
  addProductToListByUuidController.handle(listUuid, itemUuid);
};

const saveNewProduct = (newProduct: IProduct): void => {
  saveListProductByUuidController.handle(newProduct);
};
const saveNewTag = (newTag: ITag): void => {
  saveTagByUuidController.handle(newTag);
};
const saveNewAmount = (newAmount: IAmount): void => {
  saveAmountByUuidController.handle(newAmount);
};
const saveNewListArchived = (newList: string): void => {
  saveListArchivedByUuidController.handle(newList);
};

const calculateAverageAmount = (items: IAmount[]): number => {
  const amounts: number[] = items.map((item) => parseFloat(item.amount));

  if (amounts.length === 0) {
    return 0; // Return 0 for an empty array, or handle this case differently
  }

  const sum = amounts.reduce((total, amount) => total + amount, 0);
  const average = sum / amounts.length;
  return average;
};

const deleteList = (listUuid: string): void => {
  deleteListByUuidController.handle(listUuid);
};
const deleteProduct = (productUuid: string): void => {
  DeleteProductByUuid.handle(productUuid);
};
const deleteTag = (tagUuid: string): void => {
  deleteTagByUuidController.handle(tagUuid);
};
const deleteProductFromList = (listUuid: string, productUuid: string): void => {
  deleteProductFromListByUuidController.handle(listUuid, productUuid);
};
const deleteListArchived = (listUuid: string): void => {
  deleteListArchivedByUuidController.handle(listUuid);
};
const deleteAmount = (amountUuid: string): void => {
  deleteAmountByUuidController.handle(amountUuid);
};

const returnNewList = (listName: string): IList => {
  const item: IList = {
    uuid: String(UUIDGenerator.v4()),
    name: listName,
    tags: [],
    items: [],
    createAt: new Date().getTime(),
  };
  return item;
};

const returnNewProduct = (productName: string, tag: string): IProduct => {
  const item: IProduct = {
    uuid: String(UUIDGenerator.v4()),
    name: productName,
    tag: tag,
    amount: [],
    unit: "Un",
  };
  return item;
};

const returnNewItemAmount = (
  newAmount: string,
  listProductUuid: string
): IAmount => {
  const amount: IAmount = {
    uuid: String(UUIDGenerator.v4()),
    amount: newAmount,
    type: false,
    quantity: "1",
    listProductUuid,
  };
  return amount;
};
const returnNewTag = (tag: string): ITag => {
  const item: ITag = {
    uuid: String(UUIDGenerator.v4()),
    name: tag,
  };
  return item;
};

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

const showToast = (message: string) => {
  ToastAndroid.showWithGravity(
    I18n.t(message),
    ToastAndroid.LONG,
    ToastAndroid.CENTER
  );
};

const ShoppingListProvider: React.FC<ShoppingListProviderProps> = ({
  theme,
  setTheme,
  lang,
  handleLanguageChange,
  children,
  color,
  setColor,
}) => {
  const colorScheme = useColorScheme();

  const getLists = (): string[] => {
    return getListsFromStorage();
  };
  const getListsObject = (): IList[] => {
    return getListsObjectFromStorage();
  };
  const getTotalAmountByListUuid = (
    uuid: string,
    productsList?: IProduct[]
  ): number => {
    return getTotalAmountByListUuidFromStorage(uuid, productsList);
  };
  const getTotalAmountByListProductUuid = (uuid: string): number => {
    return getTotalAmountByListProductUuidFromStorage(uuid);
  };
  const getTotalQuantityWithoutAmountByListUuid = (
    uuid: string,
    productsList?: IProduct[]
  ): number => {
    return getTotalQuantityWithoutAmountByListUuidFromStorage(
      uuid,
      productsList
    );
  };
  const getTotalQuantityAmountByListUuid = (
    uuid: string,
    productsList?: IProduct[]
  ): number => {
    return getTotalQuantityAmountByListUuidFromStorage(uuid, productsList);
  };
  const getNumberOfProductsByTagsUuid = (uuid: string): number => {
    return getNumberOfProductsByTagsUuidFromStorage(uuid);
  };
  const getListItemsByListUuid = (listUuid: string): string[] => {
    return getListItemsByListUuidFromStorage(listUuid);
  };
  const getAmountByListProductUuid = (listProductUuid: string): IAmount[] => {
    return getAmountByListProductUuidFromStorage(listProductUuid);
  };
  const getAmountByUuid = (amountUuid: string): IAmount => {
    return getAmountByUuidFromStorage(amountUuid);
  };
  const getListAmount = (): IAmount[] => {
    return getListAmountFromStorage();
  };
  const getTags = (): string[] => {
    return getTagsFromStorage();
  };
  const getTagUuidByTagName = (name: string): string => {
    return getTagUuidByTagNameFromStorage(name);
  };
  const getTagsObject = (): ITag[] => {
    return getTagsObjectFromStorage();
  };
  const getProductsToSelectByListUuid = (
    listUuid: string
  ): ITagsProductsMultiSelect[] => {
    return getProductsToSelectByListUuidFromStorage(listUuid);
  };
  const getProductsByTagUuid = (tag: string): IProduct[] => {
    return getProductsByTagUuidFromStorage(tag);
  };
  const getAllProducts = (): string[] => {
    return getAllProductsFromStorage();
  };
  const getAllProductsObjects = (): IProduct[] => {
    return getAllProductsObjectsFromStorage();
  };
  const getProductByUuid = (product: string): IProduct | null => {
    return getProductsByUuidFromStorage(product);
  };
  const getListByUuid = (uuid: string): IList => {
    return getListsByUuidFromStorage(uuid);
  };
  const getTagByUuid = (uuid: string): ITag => {
    return getTagsByUuidFromStorage(uuid);
  };

  const getListArchived = (): string[] => {
    return getListArchivedFromStorage();
  };
  // const getListProductArchived = (): IProduct[] => {
  //   return getListProductArchivedFromStorage();
  // };
  const getListAmountArchived = (): IAmount[] => {
    return getItemAmountArchivedFromStorage();
  };

  const handleCopyList = (listUuid: string, listName: string): IList => {
    const newList = returnNewList(listName);
    const list = getListByUuid(listUuid);
    newList.items = list.items;
    newList.tags = list.tags;
    saveNewList(newList);
    showToast("listCopiedSuccessfully");
    return newList;
  };

  const handleEditList = (listUuid: string, listName: string): void => {
    const list = getListByUuid(listUuid);
    const newList: IList = {
      ...list,
      name: listName,
    };
    saveNewList(newList);
    showToast("listEditedSuccessfully");
  };

  const handleAddListItem = (listUuid: string, itemUuid: string[]): IList => {
    addProductToListByUuid(listUuid, itemUuid);
    showToast("productAddedSuccessfully");
    return getListByUuid(listUuid);
  };

  const handleAddListProduct = (productName: string, tag: string): IProduct => {
    const newProduct = returnNewProduct(productName, tag);
    saveNewProduct(newProduct);
    showToast("productCreatedSuccessfully");
    return newProduct;
  };

  const handleEditListProduct = (
    listUuid: string,
    productName: string,
    tag: string
  ): void => {
    // const updatedList: IProduct[] = JSON.parse(JSON.stringify(listProduct));
    // const selectedItem = listProduct.find((item) => item.uuid === listUuid);
    // if (selectedItem) {
    //   selectedItem.name = productName;
    //   if (selectedItem.tag !== tag) {
    //     selectedItem.tag = tag;
    //   }
    //   const newUpdatedList = updatedList.map((item) =>
    //     item.uuid === selectedItem.uuid ? selectedItem : item
    //   );
    //   saveNewProduct(selectedItem);
    //   setListProduct(sortArrayOfObjects(newUpdatedList, "name"));
    //   if (selectedItem.tag === tag) {
    //     const listToUpdateTags = getListByProductUuidController.handle(
    //       selectedItem.uuid
    //     );
    //     const newList = list.map((l) => {
    //       if (listToUpdateTags.includes(l.uuid)) {
    //         l.tags = getTagsByProductUuidArrayController.handle(l.items);
    //       }
    //       return l;
    //     });
    //     setList([...newList]);
    //   }
    //   showToast("productEditedSuccessfully");
    // }
  };

  const handleAddList = (list: string): IList => {
    const newListItem = returnNewList(list);
    saveNewList(newListItem);
    showToast("listCreatedSuccessfully");
    return newListItem;
  };

  const handleAddTag = (tag: string): ITag => {
    const newTag = returnNewTag(tag);
    saveNewTag(newTag);
    showToast("categoryCreatedSuccessfully");
    return newTag;
  };

  const handleEditTag = (tagUuid: string, tag: string): void => {
    const newTag: ITag = {
      name: tag,
      uuid: tagUuid,
    };
    saveNewTag(newTag);
    showToast("categoryEditedSuccessfully");
  };

  const handleAddAmount = (
    newAmount: string,
    listProductUuid: string
  ): IAmount => {
    const newListItem = returnNewItemAmount(newAmount, listProductUuid);
    saveAmountByUuidController.handle(newListItem);
    saveNewAmount(newListItem);
    return newListItem;
  };

  const handleDeleteList = (
    listUuid: string,
    listRef: React.MutableRefObject<{
      handleAddNewList: (uuid: string) => void;
      handleAddNewListArray: (list: string[]) => void;
    } | null>
  ) => {
    deleteList(listUuid);
    listRef.current?.handleAddNewListArray(getLists());
    showToast("listDeletedSuccessfully");
  };

  const handleDeleteProduct = (productUuid: string) => {
    deleteProduct(productUuid);
    showToast("productDeletedSuccessfully");
  };

  const handleDeleteProductFromList = (
    listUuid: string,
    productUuid: string
  ) => {
    deleteProductFromList(listUuid, productUuid);
    showToast("productDeletedSuccessfully");
  };

  const handleArchived = (
    listUuid: string,
    listRef: React.MutableRefObject<{
      handleAddNewList: (uuid: string) => void;
      handleAddNewListArray: (list: string[]) => void;
    } | null>
  ): void => {
    removeListByUuidController.handle(listUuid);
    saveListArchivedByUuidController.handle(listUuid);

    listRef.current?.handleAddNewListArray(getLists());
    // const archivedList: IList[] = JSON.parse(JSON.stringify(list));
    // const selectedItem = archivedList.find((i) => i.uuid === listUuid);
    // if (selectedItem) {
    //   handleDeleteList(listUuid, false);
    //   saveNewListArchived(selectedItem);
    //   selectedItem.createAt = new Date().getTime();
    //   const newList = listArchived
    //     ? [selectedItem, ...listArchived]
    //     : [selectedItem];
    //   const newListToSorted = sortArrayOfObjects(newList, "name");
    //   setListArchived(newListToSorted);
    showToast("listArchivedSuccessfully");
    // }
  };

  const handleDeleteListArchived = (listUuid: string) => {
    deleteListArchived(listUuid);
    showToast("archivedListSuccessfullyDeleted");
  };

  const handleEditItemsAmount = (amountUuid: string, type: boolean): void => {
    const amount = getAmountByUuid(amountUuid);
    amount.type = type;
    saveNewAmount(amount);
  };

  const handleDeleteAmountInList = (amountUuid: string): void => {
    deleteAmount(amountUuid);
  };

  const changeAmountQuantity = (
    newQuantity: string,
    amountUuid: string
  ): IAmount => {
    const amount = getAmountByUuid(amountUuid);
    amount.quantity = newQuantity;
    saveNewAmount(amount);
    return amount;
  };

  const handleAmountInputChange = (
    value: string,
    amountUuid: string
  ): IAmount => {
    const amount = getAmountByUuid(amountUuid);
    amount.quantity = value;
    saveNewAmount(amount);
    return amount;
  };

  const handleDeleteTag = (tagUuid: string) => {
    deleteTag(tagUuid);
    showToast("categoryDeletedSuccessfully");
  };

  const loadTheme = (): void => {
    const loadedTheme = getThemeController.handle();
    if (loadedTheme === "light" || loadedTheme === "dark") {
      setTheme(loadedTheme);
    } else {
      setTheme("light");
    }
  };
  const getTheme = (): "light" | "dark" => {
    const loadedTheme = getThemeController.handle();
    if (colorScheme) setTheme(colorScheme);
    if (loadedTheme === "light" || loadedTheme === "dark") return loadedTheme;
    return "light";
  };
  const saveTheme = (theme: "light" | "dark"): void => {
    setTheme(theme);
    saveThemeController.handle(theme);
  };
  const getLang = (): languageType => {
    return lang;
  };
  const loadLang = (): void => {
    const loadedLang = getLanguageController.handle();
    handleLanguageChange(loadedLang);
  };
  const saveLang = (lang: languageType): void => {
    handleLanguageChange(lang);
    saveLanguageController.handle(lang);
  };
  const getCurrency = (): string => {
    return getCurrencyController.handle();
  };

  const saveCurrency = (currency: string): void => {
    saveCurrencyController.handle(currency);
  };
  const getColor = (): colorTheme => {
    return Colors[color][getTheme()];
  };
  const getNewLoadColor = (): colorTheme => {
    loadColor();
    return Colors[getColorController.handle()][getTheme()];
  };
  const loadColor = (): void => {
    const loadedLang = getColorController.handle();
    setColor(loadedLang);
  };
  const saveColor = (color: ColorList): void => {
    setColor(color);
    saveColorController.handle(color);
  };

  const getLastPrices = (productUuid: string): string[] => {
    return getLastPricesByProductUuidController.handle(productUuid);
  };

  useEffect(() => {
    loadLang();
    loadColor();
    loadTheme();
  }, []);

  return (
    <ShoppingListContext.Provider
      value={{
        getListByUuid: getListByUuid,
        getAllProducts: getAllProducts,
        getAllProductsObjects: getAllProductsObjects,
        getListItemsByListUuid: getListItemsByListUuid,
        getLists: getLists,
        getListsObject: getListsObject,
        getListAmount: getListAmount,
        getProductByUuid: getProductByUuid,
        getTags: getTags,
        getTagsObject: getTagsObject,
        getProductsByTagUuid: getProductsByTagUuid,
        getProductsToSelectByListUuid: getProductsToSelectByListUuid,
        getTagByUuid: getTagByUuid,
        getTagUuidByTagName: getTagUuidByTagName,
        getListArchived: getListArchived,
        getAmountByUuid: getAmountByUuid,
        getAmountByListProductUuid: getAmountByListProductUuid,
        getListAmountArchived: getListAmountArchived,
        handleAddList: handleAddList,
        handleCopyList: handleCopyList,
        handleEditList: handleEditList,
        handleAddListItem: handleAddListItem,
        handleAddListProduct: handleAddListProduct,
        handleEditListProduct: handleEditListProduct,
        handleAddTag: handleAddTag,
        handleEditTag: handleEditTag,
        handleAddAmount: handleAddAmount,
        handleDeleteList: handleDeleteList,
        handleDeleteListArchived: handleDeleteListArchived,
        handleArchived: handleArchived,
        handleDeleteProductFromList: handleDeleteProductFromList,
        handleDeleteProduct: handleDeleteProduct,
        handleEditItemsAmount: handleEditItemsAmount,
        handleDeleteAmountInList: handleDeleteAmountInList,
        changeAmountQuantity: changeAmountQuantity,
        handleAmountInputChange: handleAmountInputChange,
        handleDeleteTag: handleDeleteTag,
        getTheme: getTheme,
        saveTheme: saveTheme,
        getLang: getLang,
        saveLang: saveLang,
        getCurrency: getCurrency,
        saveCurrency: saveCurrency,
        saveColor: saveColor,
        getColor: getColor,
        getNewLoadColor: getNewLoadColor,
        getLastPrices: getLastPrices,
        getTotalAmountByListUuid: getTotalAmountByListUuid,
        getTotalAmountByListProductUuid: getTotalAmountByListProductUuid,
        getTotalQuantityWithoutAmountByListUuid:
          getTotalQuantityWithoutAmountByListUuid,
        getTotalQuantityAmountByListUuid: getTotalQuantityAmountByListUuid,
        getNumberOfProductsByTagsUuid: getNumberOfProductsByTagsUuid,
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

export { ShoppingListProvider, useShoppingListContext };
