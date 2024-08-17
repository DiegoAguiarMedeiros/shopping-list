import Tags from "../src/screens/tags";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { useImperativeHandle, useState } from "react";
import React from "react";
import { useShoppingListContext } from "../src/context/ShoppingList";
import { colorTheme } from "../constants/Colors";
import { IProduct } from "../src/Model/IProduct";
import ITag from "../src/Model/ITag";
import { useTagViewModel } from "../src/viewmodels/Tag/TagViewModel";
import EmptyList from "../src/components/EmptyList";
import I18n from "i18n-js";
import { TagView } from "../src/views/Tag/TagView";
import UUIDGenerator from "react-native-uuid";

interface TagsTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (product: string) => void;
    handleRemoveProduct: (uuid: string) => void;
    handleEditProduct: (uuid: string, name: string, tag?: string) => void;
  } | null>;
  color: colorTheme;
}

const TagsTab = React.forwardRef(
  (
    {
      setBottomSheetProps,
      handleCloseBottomSheet,
      productListRef,
      color,
    }: TagsTabProps,
    ref: any
  ) => {
    const { items, addItem, removeItem, editItem } = useTagViewModel();
    useImperativeHandle(ref, () => ({
      handleAddNewTag(name: string) {
        handleAddItem(name);
      },
      handleRemoveTag(uuid: string) {
        handleRemoveItem(uuid);
      },
      handleEditTag(uuid: string, name: string) {
        handleEditItem(uuid, name);
      },
    }));

    const handleAddItem = (name: string) => {
      const newItem: ITag = {
        uuid: String(UUIDGenerator.v4()),
        name: name,
      };
      addItem(newItem);
    };
    const handleRemoveItem = (uuid: string) => {
      removeItem(uuid);
    };
    const handleEditItem = (uuid: string, name: string) => {
      editItem(uuid, name);
    };
    return items && items.length > 0 ? (
      <TagView
        tags={items}
        productListRef={productListRef}
        tagRef={ref}
        color={color}
        setBottomSheetProps={setBottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
    ) : (
      <EmptyList color={color} mensage={I18n.t("noCategories")} />
    );
  }
);

export default TagsTab;
