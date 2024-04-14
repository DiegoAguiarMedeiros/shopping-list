import { useGlobalSearchParams, useSearchParams } from "expo-router";

import ProductsList from "../src/screens/productsList/index";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { useImperativeHandle, useState } from "react";
import React from "react";
import { useShoppingListContext } from "../src/context/ShoppingList";
import { colorTheme } from "../constants/Colors";

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

    const { getProductsByTagUuid, getTagByUuid } = useShoppingListContext();
    const tag = getTagByUuid(tagUuid && !Array.isArray(tagUuid) ? tagUuid : "");
    const [products, setProducts] = useState<string[]>(
      getProductsByTagUuid(tagUuid && !Array.isArray(tagUuid) ? tagUuid : "")
    );

    useImperativeHandle(ref, () => ({
      handleAddProduct(product: string) {
        setProducts((prev) => [...prev, product]);
      },
    }));

    return tagUuid ? (
      <ProductsList
        productRef={ref}
        color={color}
        tag={tag}
        products={products}
        setBottomSheetProps={setBottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheet}
        handleCloseBottomSheetTag={handleCloseBottomSheetTag}
        setActiveRouteHeader={setActiveRouteHeader}
      />
    ) : (
      <></>
    );
  }
);

export default ProductList;
