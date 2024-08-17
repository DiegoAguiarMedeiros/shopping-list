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
import { useProductListViewModel } from "../src/viewmodels/ProductList/ProductListViewModel";
import { ProductListView } from "../src/views/ProductList/ProductListView";
import EmptyList from "../src/components/EmptyList";
import I18n from "i18n-js";
import { TouchableHighlight } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Title } from "../src/components/Text";

interface ProductListTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: (tagUuid: string) => void;
  handleCloseBottomSheetTag: () => void;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
  color: colorTheme;
}

const ProductList = React.forwardRef(
  (
    {
      setActiveRouteHeader,
      setBottomSheetProps,
      handleCloseBottomSheet,
      handleCloseBottomSheetTag,
      color,
    }: ProductListTabProps,
    ref: any
  ) => {
    const { tagUuid } = useGlobalSearchParams();
    const { items, tag, addItem, removeItem, editItem } =
      useProductListViewModel(
        tagUuid && !Array.isArray(tagUuid) ? tagUuid : ""
      );
    const handleAddItem = (name: string) => {
      const newItem: IProduct = {
        uuid: String(UUIDGenerator.v4()),
        name: name,
        amount: [],
        unit: "Kg",
        tag: tag.uuid,
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
      handleAddProduct(name: string) {
        handleAddItem(name);
      },
      handleRemoveProduct(uuid: string) {
        handleRemoveItem(uuid);
      },
      handleEditProduct(uuid: string, name: string, tag?: string) {
        console.log("ProductList uuid", uuid);
        console.log("ProductList name", name);
        console.log("ProductList tag", tag);
        handleEditItem(uuid, name, tag);
      },
    }));
    const returnToTags = () => {
      handleCloseBottomSheetTag();
      router.push({ pathname: "/tags" });
    };
    useEffect(() => {
      setActiveRouteHeader({
        left: (
          <TouchableHighlight
            underlayColor={color.primary}
            style={{ marginLeft: 20, marginRight: 10 }}
            onPress={() => returnToTags()}
          >
            <FontAwesome name="angle-left" size={35} color={color.white} />
          </TouchableHighlight>
        ),
        name: <Title color={color.white}>{tag.name}</Title>,
        right: null,
      });
    }, [tag]);

    return items && items.length > 0 ? (
      <ProductListView
        products={items}
        color={color}
        setBottomSheetProps={setBottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheetTag}
        productListRef={ref}
      />
    ) : (
      <EmptyList color={color} mensage={I18n.t("noProducts")} />
    );
  }
);

export default ProductList;
