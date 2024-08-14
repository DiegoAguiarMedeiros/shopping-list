import Home from "../src/screens/home/Home";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { colorTheme } from "../constants/Colors";
import { useState, useImperativeHandle, useEffect } from "react";
import React from "react";
import { useShoppingListContext } from "../src/context/ShoppingList";
import { IList } from "../src/Model/IList";
import { ListView } from "../src/views/List/ListView";
import { useListViewModel } from "../src/viewmodels/ListViewModel";
import UUIDGenerator from "react-native-uuid";
import EmptyList from "../src/components/EmptyList";
import I18n from "i18n-js";
interface HomeContainerProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  listItemRef: React.MutableRefObject<{
    handleAddItem: (list: IList) => void;
  } | null>;
  color: colorTheme;
}

const HomeContainer = React.forwardRef(
  (
    {
      setBottomSheetProps,
      handleCloseBottomSheet,
      color,
      listItemRef,
    }: Readonly<HomeContainerProps>,
    ref: any
  ) => {
    const { getLists, getListArchived } = useShoppingListContext();
    const [lists, setLists] = useState<string[]>(getLists());

    const { items, addItem, removeItem, editItem, copyItem } =
      useListViewModel();

    const handleAddItem = (name: string) => {
      const newItem: IList = {
        uuid: String(UUIDGenerator.v4()),
        name: name,
        tags: [],
        items: [],
        createAt: new Date().getTime(),
      };
      addItem(newItem);
    };
    const handleRemoveItem = (uuid: string) => {
      removeItem(uuid);
    };
    const handleEditItem = (uuid: string, name: string) => {
      editItem(uuid, name);
    };
    const handleCopyItem = (uuid: string, name: string) => {
      copyItem(uuid, name);
    };

    useEffect(() => {
      // console.log("useEffect items: ", items);
    }, [items]);

    useImperativeHandle(ref, () => ({
      handleAddNewList(list: string) {
        handleAddItem(list);
      },
      handleRemoveItem(uuid: string) {
        handleRemoveItem(uuid);
      },
      handleEditItem(uuid: string, name: string) {
        handleEditItem(uuid, name);
      },
      handleCopyItem(uuid: string, name: string) {
        handleCopyItem(uuid, name);
      },
    }));

    return items && items.length > 0 ? (
      <ListView
        listItemRef={listItemRef}
        listRef={ref}
        lists={items}
        color={color}
        setBottomSheetProps={setBottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
    ) : (
      <EmptyList color={color} mensage={I18n.t("noListCreated")} />
    );
  }
);

export default HomeContainer;
