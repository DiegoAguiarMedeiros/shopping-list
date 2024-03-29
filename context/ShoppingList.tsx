import React, { createContext, useContext, useEffect, useState } from "react";
import { IList, IListInterface } from "../Domain/Model/IList";
import IAmount from "../Domain/Model/IAmount";
import getListsController from "../Domain/UseCases/List/GetLists";
import getTagsController from "../Domain/UseCases/Tag/GetTags";
import saveListsController from "../Domain/UseCases/List/SaveLists";
import getListsArchivedController from "../Domain/UseCases/ListArchived/GetLists";
import saveListArchivedByUuidController from "../Domain/UseCases/ListArchived/SaveListByUuid";
import GetListProducts from "../Domain/UseCases/ListProduct/GetListProducts";
import ITag from "../Domain/Model/ITag";
import { IProduct } from "../Domain/Model/IProduct";
import GetAmountsController from "../Domain/UseCases/Amount/GetAmounts";

import UUIDGenerator from "react-native-uuid";
import saveListByUuidController from "../Domain/UseCases/List/SaveListByUuid";
import addProductToListByUuidController from "../Domain/UseCases/List/AddProductToListByUuid";
import getListProductController from "../Domain/UseCases/ListProduct/GetListProductByUuid";
import saveListProductByUuidController from "../Domain/UseCases/ListProduct/SaveListProductByUuid";
import saveTagByUuidController from "../Domain/UseCases/Tag/SaveTagByUuid";
import saveAmountByUuidController from "../Domain/UseCases/Amount/SaveAmountByUuid";
import deleteListByUuidController from "../Domain/UseCases/List/DeleteListByUuid";
import deleteListArchivedByUuidController from "../Domain/UseCases/ListArchived/DeleteListByUuid";
import deleteProductFromListByUuidController from "../Domain/UseCases/List/DeleteProductFromListByUuid";
import getTagsByProductUuidArrayController from "../Domain/UseCases/ListProduct/GetTagsByProductUuidArray";
import DeleteProductByUuid from "../Domain/UseCases/ListProduct/DeleteProductByUuid";
import deleteAmountByUuidController from "../Domain/UseCases/Amount/DeleteAmountByUuid";
import deleteTagByUuidController from "../Domain/UseCases/Tag/DeleteTagByUuid";
import getAmountByListProductUuidController from "../Domain/UseCases/Amount/GetAmountByListProductUuid";
import { sortArrayOfObjects } from "../utils/functions";
import { ToastAndroid, useColorScheme } from "react-native";
import saveThemeController from "../Domain/UseCases/Config/SaveTheme";
import getThemeController from "../Domain/UseCases/Config/GetTheme";
import { languageType } from "../types/types";
import getLanguageController from "../Domain/UseCases/Config/GetLanguage";
import saveLanguageController from "../Domain/UseCases/Config/SaveLanguage";
import getCurrencyController from "../Domain/UseCases/Config/GetCurrency";
import saveCurrencyController from "../Domain/UseCases/Config/SaveCurrency";
import getColorController from "../Domain/UseCases/Config/GetColor";
import saveColorController from "../Domain/UseCases/Config/SaveColor";
import {
  ColorList,
  Colors,
  colorTheme,
  colors,
  typeTheme,
} from "../constants/Colors";
import getListByProductUuidController from "../Domain/UseCases/List/GetListByProductUuid";
import I18n from "i18n-js";
import getLastPricesByProductUuidController from "../Domain/UseCases/ListArchived/GetLastPricesByProductUuid";

type ShoppingListProviderProps = {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  lang: languageType;
  handleLanguageChange: (newLanguage: languageType) => void;
  children: React.ReactNode;
};

type ShoppingListContextType = {
  list: IList[];
  listProduct: IProduct[];
  tags: ITag[];
  amount: IAmount[];
  listArchived: IList[];
  listProductArchived: IProduct[];
  listAmountArchived: IAmount[];
  handleAddList: (listName: string) => void;
  handleCopyList: (listUuid: string, listName: string) => void;
  handleEditList: (listUuid: string, listName: string) => void;
  handleAddListItem: (listUuid: string, listName: string) => void;
  handleAddListProduct: (productName: string, tag: string) => void;
  handleEditListProduct: (
    listUuid: string,
    productName: string,
    tag: string
  ) => void;
  handleAddTag: (tag: string) => void;
  handleEditTag: (tagUuid: string, tag: string) => void;
  handleAddAmount: (newAmount: string, listProductUuid: string) => void;
  handleDeleteList: (listUuid: string) => void;
  handleDeleteListArchived: (listUuid: string) => void;
  handleArchived: (listUuid: string) => void;
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
};

const getListsFromStorage = (): IList[] => {
  return getListsController.handle();
};
const getTagsFromStorage = (): ITag[] => {
  return getTagsController.handle();
};
const getListProductFromStorage = (): IProduct[] => {
  return GetListProducts.handle();
};
const getListAmountFromStorage = (): IAmount[] => {
  return GetAmountsController.handle();
};

const getListArchivedFromStorage = (): IList[] => {
  return getListsArchivedController.handle();
};
const getListProductArchivedFromStorage = (): IProduct[] => {
  return GetListProducts.handle();
};
const getItemAmountArchivedFromStorage = (): IAmount[] => {
  return GetAmountsController.handle();
};

const saveNewList = (newList: IList): void => {
  saveListByUuidController.handle(newList);
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
const saveNewListArchived = (newList: IList): void => {
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

const returnNewTag = (tag: string): ITag => {
  const item: ITag = {
    uuid: String(UUIDGenerator.v4()),
    name: tag,
  };
  return item;
};

const returnNewItemAmount = (
  newAmount: string,
  listProductUuid: string
): IAmount => {
  const item: IAmount = {
    uuid: String(UUIDGenerator.v4()),
    amount: newAmount,
    type: false,
    quantity: "1",
    listProductUuid,
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
}) => {
  const [list, setList] = useState<IList[]>([]);
  const [currency, setCurrency] = useState<string>("");
  const [color, setColor] = useState<ColorList>("#43BCAE");
  const [tags, setTags] = useState<ITag[]>([]);
  const [listProduct, setListProduct] = useState<IProduct[]>([]);
  const [amount, setAmount] = useState<IAmount[]>([]);
  const [listArchived, setListArchived] = useState<IList[]>([]);

  const colorScheme = useColorScheme();
  const [listProductArchived, setListProductArchived] = useState<IProduct[]>(
    []
  );
  const [listAmountArchived, setListAmountArchived] = useState<IAmount[]>([]);

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

  const loadListArchived = (): void => {
    const listArr = getListArchivedFromStorage();
    setListArchived(listArr);
  };
  const loadListProductArchived = (): void => {
    const listItemArr = getListProductArchivedFromStorage();
    setListProductArchived(listItemArr);
  };
  const loadListAmountArchived = (): void => {
    const listAmountArr = getItemAmountArchivedFromStorage();
    setListAmountArchived(listAmountArr);
  };

  const handleAddList = (listName: string): void => {
    const newListItem = returnNewList(listName);
    saveNewList(newListItem);

    const newList = list ? [newListItem, ...list] : [newListItem];
    const newListToSorted = sortArrayOfObjects(newList, "name");
    setList(newListToSorted);

    showToast("listCreatedSuccessfully");
  };

  const handleCopyList = (listUuid: string, listName: string): void => {
    const newList = returnNewList(listName);
    const selectedItem = list.find((item) => item.uuid === listUuid);
    if (selectedItem) {
      newList.items = selectedItem.items;
      newList.tags = selectedItem.tags;
      saveNewList(newList);
      setList(sortArrayOfObjects([newList, ...list], "name"));

      showToast("listCopiedSuccessfully");
    }
  };

  const handleEditList = (listUuid: string, listName: string): void => {
    const updatedList: IList[] = JSON.parse(JSON.stringify(list));
    const selectedItem = list.find((item) => item.uuid === listUuid);
    if (selectedItem) {
      selectedItem.name = listName;

      const newUpdatedList = updatedList.map((item) =>
        item.uuid === selectedItem.uuid ? selectedItem : item
      );
      saveNewList(selectedItem);
      setList(sortArrayOfObjects(newUpdatedList, "name"));

      showToast("listEditedSuccessfully");
    }
  };

  const handleAddListItem = (listUuid: string, item: string): void => {
    addProductToListByUuidController.handle(listUuid, item);
    const product = getListProductController.handle([item]);

    const newProductList = listProduct.map((l) => {
      if (l.uuid === listUuid) {
        return product[0];
      }
      return l;
    });
    setListProduct(sortArrayOfObjects(newProductList, "name"));

    const newList = list.map((l) => {
      if (l.uuid === listUuid) {
        l.items.push(item);
        if (!l.tags.includes(product[0].tag)) l.tags.push(product[0].tag);
      }
      return l;
    });
    setList([...newList]);
    showToast("productAddedSuccessfully");
  };

  const handleAddListProduct = (productName: string, tag: string): void => {
    const newProduct = returnNewProduct(productName, tag);
    saveNewProduct(newProduct);

    const newListProduct = listProduct
      ? [newProduct, ...listProduct]
      : [newProduct];
    const newListProductToSorted = sortArrayOfObjects(newListProduct, "name");
    setListProduct(newListProductToSorted);

    showToast("productCreatedSuccessfully");
  };

  const handleEditListProduct = (
    listUuid: string,
    productName: string,
    tag: string
  ): void => {
    const updatedList: IProduct[] = JSON.parse(JSON.stringify(listProduct));
    const selectedItem = listProduct.find((item) => item.uuid === listUuid);
    if (selectedItem) {
      selectedItem.name = productName;
      if (selectedItem.tag !== tag) {
        selectedItem.tag = tag;
      }

      const newUpdatedList = updatedList.map((item) =>
        item.uuid === selectedItem.uuid ? selectedItem : item
      );
      saveNewProduct(selectedItem);
      setListProduct(sortArrayOfObjects(newUpdatedList, "name"));

      if (selectedItem.tag === tag) {
        const listToUpdateTags = getListByProductUuidController.handle(
          selectedItem.uuid
        );
        const newList = list.map((l) => {
          if (listToUpdateTags.includes(l.uuid)) {
            l.tags = getTagsByProductUuidArrayController.handle(l.items);
          }
          return l;
        });
        setList([...newList]);
      }

      showToast("productEditedSuccessfully");
    }
  };

  const handleAddTag = (tag: string): void => {
    const newTag = returnNewTag(tag);
    saveNewTag(newTag);
    const newTags = tags ? [newTag, ...tags] : [newTag];
    const newTagsToSorted = sortArrayOfObjects(newTags, "name");
    setTags(newTagsToSorted);

    showToast("categoryCreatedSuccessfully");
  };

  const handleEditTag = (tagUuid: string, tag: string): void => {
    const updatedTag: ITag[] = JSON.parse(JSON.stringify(tags));
    const selectedTag = tags.find((item) => item.uuid === tagUuid);
    if (selectedTag) {
      selectedTag.name = tag;
      const newUpdatedList = updatedTag.map((item) =>
        item.uuid === selectedTag.uuid ? selectedTag : item
      );
      saveNewTag(selectedTag);
      setTags(sortArrayOfObjects(newUpdatedList, "name"));

      showToast("categoryEditedSuccessfully");
    }
  };

  const handleAddAmount = (
    newAmount: string,
    listProductUuid: string
  ): void => {
    const newListItem = returnNewItemAmount(newAmount, listProductUuid);
    saveAmountByUuidController.handle(newListItem);
    saveNewAmount(newListItem);
    amount ? setAmount([newListItem, ...amount]) : setAmount([newListItem]);
  };

  const handleDeleteList = (listUuid: string, showToastOnScreen = true) => {
    const updatedList: IList[] = JSON.parse(JSON.stringify(list));
    const newupdatedList = updatedList.filter((i) => listUuid !== i.uuid);
    deleteList(listUuid);
    setList(newupdatedList);

    if (showToastOnScreen) {
      showToast("listDeletedSuccessfully");
    }
  };

  const handleDeleteProduct = (productUuid: string) => {
    const updatedList: IProduct[] = JSON.parse(JSON.stringify(listProduct));
    const newupdatedList = updatedList.filter((i) => productUuid !== i.uuid);
    deleteProduct(productUuid);
    setListProduct(newupdatedList);
    showToast("Produto deletado com sucesso!");
  };

  const handleDeleteProductFromList = (
    listUuid: string,
    productUuid: string
  ) => {
    deleteProductFromList(listUuid, productUuid);
    const newList = list.map((l) => {
      if (l.uuid === listUuid) {
        const newItems = l.items.filter((product) => product !== productUuid);
        l.items = newItems;
        l.tags = getTagsByProductUuidArrayController.handle(newItems);
      }
      return l;
    });
    setList([...newList]);
    showToast("productDeletedSuccessfully");
  };

  const handleArchived = (listUuid: string): void => {
    const archivedList: IList[] = JSON.parse(JSON.stringify(list));
    const selectedItem = archivedList.find((i) => i.uuid === listUuid);
    if (selectedItem) {
      handleDeleteList(listUuid, false);
      saveNewListArchived(selectedItem);
      selectedItem.createAt = new Date().getTime();
      const newList = listArchived
        ? [selectedItem, ...listArchived]
        : [selectedItem];
      const newListToSorted = sortArrayOfObjects(newList, "name");
      setListArchived(newListToSorted);
      showToast("listArchivedSuccessfully");
    }
  };

  const handleDeleteListArchived = (listUuid: string) => {
    const updatedList: IList[] = JSON.parse(JSON.stringify(listArchived));
    const newupdatedList = updatedList.filter((i) => listUuid !== i.uuid);
    deleteListArchived(listUuid);
    setListArchived(newupdatedList);
    showToast("archivedListSuccessfullyDeleted");
  };

  const handleEditItemsAmount = (amountUuid: string, type: boolean): void => {
    const amountlist = amount.map((amount) => {
      if (amount.uuid === amountUuid) {
        amount.type = type;
        amount.quantity = "1";
        saveNewAmount(amount);
      }
      return amount;
    });
    setAmount(amountlist);
  };

  const handleDeleteAmountInList = (amountUuid: string): void => {
    deleteAmount(amountUuid);
    const updatedAmount: IAmount[] = JSON.parse(
      JSON.stringify(amount.filter((a) => a.uuid !== amountUuid))
    );
    setAmount(updatedAmount);
  };

  const changeAmountQuantity = (
    newQuantity: string,
    amountUuid: string
  ): IAmount => {
    const updatedAmount: IAmount[] = JSON.parse(
      JSON.stringify(amount.filter((a) => a.uuid === amountUuid))
    );
    updatedAmount[0].quantity = newQuantity;
    const amountlist = amount.map((a) => {
      if (a.uuid === updatedAmount[0].uuid) {
        saveNewAmount(updatedAmount[0]);
        return updatedAmount[0];
      }
      return a;
    });
    setAmount(amountlist);
    return updatedAmount[0];
  };

  const handleAmountInputChange = (
    value: string,
    amountUuid: string
  ): IAmount => {
    const updatedAmount: IAmount[] = JSON.parse(
      JSON.stringify(amount.filter((a) => a.uuid === amountUuid))
    );
    updatedAmount[0].quantity = value;
    const amountlist = amount.map((a) => {
      if (a.uuid === amountUuid) {
        saveNewAmount(updatedAmount[0]);
        return updatedAmount[0];
      }
      return a;
    });
    setAmount(amountlist);
    return updatedAmount[0];
  };

  const handleDeleteTag = (tagUuid: string) => {
    const updatedList: ITag[] = JSON.parse(
      JSON.stringify(tags.filter((i) => tagUuid !== i.uuid))
    );
    deleteTag(tagUuid);
    setTags(updatedList);
    showToast("categoryDeletedSuccessfully");
  };

  const loadTheme = (): void => {
    const loadedTheme = getThemeController.handle();
    if (colorScheme) setTheme(colorScheme);
    if (loadedTheme === "light" || loadedTheme === "dark")
      setTheme(loadedTheme);
  };
  const getTheme = (): "light" | "dark" => {
    return theme;
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
    return currency;
  };
  const loadCurrency = (): void => {
    const loadedLang = getCurrencyController.handle();
    setCurrency(loadedLang);
  };
  const saveCurrency = (currency: string): void => {
    setCurrency(currency);
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
    loadList();
    loadListProduct();
    loadListAmount();
    loadTags();
    loadListArchived();
    loadListProductArchived();
    loadListAmountArchived();
    loadTheme();
    loadLang();
    loadCurrency();
    loadColor();
  }, []);

  return (
    <ShoppingListContext.Provider
      value={{
        list: list!,
        listProduct: listProduct!,
        amount: amount!,
        tags: tags!,
        listArchived: listArchived!,
        listProductArchived: listProductArchived!,
        listAmountArchived: listAmountArchived!,
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


export {
  ShoppingListProvider,
  useShoppingListContext
};
