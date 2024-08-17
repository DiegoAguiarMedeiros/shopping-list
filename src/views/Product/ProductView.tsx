import React, { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  ListRenderItem,
} from "react-native";
import { useProductViewModel } from "../../viewmodels/Product/ProductViewModel";
import { IList } from "../../Model/IList";
import ListGridItem from "../../screens/product/list/listGrid/listGridItem";
import { colorTheme } from "../../../constants/Colors";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { IProduct } from "../../Model/IProduct";
import { ItemInterface } from "../../types/types";

interface ProductViewProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  products: IProduct[];
  productRef: React.RefObject<{
    handleAddProduct: (product: string) => void;
    handleRemoveProduct: (uuid: string) => void;
    handleEditProduct: (uuid: string, name: string, tag?: string) => void;
  }>;
}

const CustomFlatList = React.memo(
  ({
    setBottomSheetProps,
    handleCloseBottomSheet,
    color,
    products,
    productRef,
  }: ProductViewProps) => {
    const renderItem: ListRenderItem<IProduct> = ({ item }) => (
      <ListGridItem
        productRef={productRef}
        color={color}
        handleCloseBottomSheet={handleCloseBottomSheet}
        setBottomSheetProps={setBottomSheetProps}
        item={item}
      />
    );

    return (
      <Container background={color.backgroundPrimary}>
        <ContainerInner background={color.backgroundPrimary}>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => "ListGridItem-" + item.uuid}
          />
        </ContainerInner>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.products, nextProps.products);
  }
);

export const ProductView = ({
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  products,
  productRef,
}: ProductViewProps) => {
  return (
    <CustomFlatList
      productRef={productRef}
      products={products}
      color={color}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
};
