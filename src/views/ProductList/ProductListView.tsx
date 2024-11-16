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
import { useProductListViewModel } from "../../viewmodels/ProductList/ProductListViewModel";
import { IList } from "../../Model/IList";
import ListGridItem from "../../screens/productsList/listGrid/listGridItem";
import { colorTheme } from "../../../constants/Colors";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { IProduct } from "../../Model/IProduct";
import { ItemInterface } from "../../types/types";
import { useStores } from "../../context/StoreContext";

interface ProductListViewProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  products: IProduct[];
}

const CustomFlatList = React.memo(
  ({
    setBottomSheetProps,
    handleCloseBottomSheet,
    products,
  }: ProductListViewProps) => {
    const { ConfigRepository } = useStores();
    const renderItem: ListRenderItem<IProduct> = ({ item }) => (
      <ListGridItem
        handleCloseBottomSheet={handleCloseBottomSheet}
        setBottomSheetProps={setBottomSheetProps}
        products={item}
        tagUuid={""}
      />
    );

    return (
      <Container background={ConfigRepository.color.backgroundPrimary}>
        <ContainerInner background={ConfigRepository.color.backgroundPrimary}>
          <FlatList
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
    return isEqual(prevProps.products, nextProps.products);
  }
);

export const ProductListView = ({
  setBottomSheetProps,
  handleCloseBottomSheet,
  products,
}: ProductListViewProps) => {
  return (
    <CustomFlatList
      products={products}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
};
