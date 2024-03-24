import { useGlobalSearchParams, useSearchParams } from "expo-router";
import { Text } from "../components/Text";

import ProductsList from "../screens/productsList";
import { BottomSheetProps } from "../components/BottomSheet";
import { useImperativeHandle, useState } from "react";
import React from "react";
import { useShoppingListContext } from "../context/ShoppingList";

interface ProductListTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: (tagUuid: string) => void;
  handleCloseBottomSheetTag: () => void;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
}

const ProductList = React.forwardRef(
  (
    {
      setActiveRouteHeader,
      setBottomSheetProps,
      bottomSheetProps,
      handleCloseBottomSheet,
      handleCloseBottomSheetTag,
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
        tag={tag}
        products={products}
        setBottomSheetProps={setBottomSheetProps}
        bottomSheetProps={bottomSheetProps}
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
