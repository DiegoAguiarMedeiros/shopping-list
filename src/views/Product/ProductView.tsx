import React, { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
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
import { useStores } from "../../context/StoreContext";
import { FlashList, ListRenderItem } from "@shopify/flash-list";

interface ProductViewProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  products: IProduct[];
}

const CustomFlatList = React.memo(
  ({
    setBottomSheetProps,
    handleCloseBottomSheet,
    products,
  }: ProductViewProps) => {
    const { ConfigRepository } = useStores();
    const renderItem: ListRenderItem<IProduct> = ({ item }) => (
      <ListGridItem
        handleCloseBottomSheet={handleCloseBottomSheet}
        setBottomSheetProps={setBottomSheetProps}
        item={item}
      />
    );

    return (
      <Container background={ConfigRepository.color.backgroundPrimary}>
        <ContainerInner background={ConfigRepository.color.backgroundPrimary}>
          <FlashList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => "ListGridItem-" + item.uuid}
            ListFooterComponent={<View style={{ height: 250 }} />}
          />
        </ContainerInner>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    return (
      isEqual(prevProps.products, nextProps.products)
    );
  }
);

export const ProductView = ({
  setBottomSheetProps,
  handleCloseBottomSheet,
  products,
}: ProductViewProps) => {
  return (
    <CustomFlatList
      products={products}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
};
