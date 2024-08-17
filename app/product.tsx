import { router, useGlobalSearchParams, useSearchParams } from "expo-router";

import ProductsList from "../src/screens/productsList/index";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { useEffect, useImperativeHandle, useState } from "react";
import React from "react";
import { useShoppingListContext } from "../src/context/ShoppingList";
import { colorTheme } from "../constants/Colors";
import { IProduct } from "../src/Model/IProduct";
import { sortArrayOfObjects } from "../src/utils/functions";
import UUIDGenerator from "react-native-uuid";
import { useProductViewModel } from "../src/viewmodels/Product/ProductViewModel";
import { ProductView } from "../src/views/Product/ProductView";
import EmptyList from "../src/components/EmptyList";
import I18n from "i18n-js";
import { TouchableHighlight } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Title } from "../src/components/Text";
import ITag from "../src/Model/ITag";

interface ProductTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheetTag: () => void;
  color: colorTheme;
  search: string;
}

const Product = React.forwardRef(
  (
    { setBottomSheetProps, handleCloseBottomSheetTag, color }: ProductTabProps,
    ref: any
  ) => {
    const { items, addItem, removeItem, editItem } = useProductViewModel();
    const handleAddItem = (name: string, tag: string) => {
      const newItem: IProduct = {
        uuid: String(UUIDGenerator.v4()),
        name: name,
        amount: [],
        unit: "Kg",
        tag: tag,
      };
      addItem(newItem);
    };
    const handleRemoveItem = (uuid: string) => {
      removeItem(uuid);
    };
    const handleEditItem = (uuid: string, name: string, tag?: string) => {
      editItem(uuid, name, tag);
    };

    useImperativeHandle(ref, () => ({
      handleAddProduct(name: string, tag: string) {
        handleAddItem(name, tag);
      },
      handleRemoveProduct(uuid: string) {
        handleRemoveItem(uuid);
      },
      handleEditProduct(uuid: string, name: string, tag?: string) {
        console.log("Product uuid", uuid);
        console.log("Product name", name);
        console.log("Product tag", tag);
        handleEditItem(uuid, name, tag);
      },
    }));

    return items && items.length > 0 ? (
      <ProductView
        products={items}
        color={color}
        setBottomSheetProps={setBottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheetTag}
        productRef={ref}
      />
    ) : (
      <EmptyList color={color} mensage={I18n.t("noProducts")} />
    );
  }
);

export default Product;
