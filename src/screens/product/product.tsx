import { useSearchParams } from "expo-router";
import { Text, Title } from "../../../components/Text";

import Product from "../screens/product";
import { BottomSheetProps } from "../../../components/BottomSheet";
import { useEffect, useImperativeHandle, useState } from "react";
import { Dimensions, TouchableHighlight, useColorScheme } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colorTheme } from "../../../constants/Colors";
import { useShoppingListContext } from "../../../context/ShoppingList";
import React from "react";
import { IProduct } from "../../../Domain/Model/IProduct";

interface ProductTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  search: string;
  color: colorTheme;
}

const ProductTab = React.forwardRef(
  (
    {
      setBottomSheetProps,
      color,
      handleCloseBottomSheet,
      search,
    }: ProductTabProps,
    ref: any
  ) => {
    const { getAllProductsObjects } = useShoppingListContext();

    const [products, setProducts] = useState<IProduct[]>(
      getAllProductsObjects()
    );

    useImperativeHandle(ref, () => ({
      handleAddProduct(product: IProduct) {
        setProducts((prev) => [...prev, product]);
      },
    }));

    return (
      <Product
        productRef={ref}
        products={products}
        search={search}
        setBottomSheetProps={setBottomSheetProps}
        color={color}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
    );
  }
);

export default ProductTab;
