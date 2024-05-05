import { TouchableHighlight, useColorScheme } from "react-native";

import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import { ItemInterface, ListItemInterface } from "../../types/types";

import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import EmptyList from "../../components/EmptyList";
import ListGrid from "./listGrid";
import CircleProgress from "../../components/CircleProgress";
import FilterButtons from "../../components/FilterButtons";
import { Title } from "../../components/Text";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import Header from "../../components/Header";
import I18n from "i18n-js";
import ITag from "../../Model/ITag";
import { colorTheme } from "../../../constants/Colors";
import { IProduct } from "../../Model/IProduct";
type TotalType = {
  amount: number;
  un: number;
};

interface ProductsListProps {
  tag: ITag;
  products: IProduct[];
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
  productRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
  } | null>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export default function ProductsList({
  products,
  tag,
  setActiveRouteHeader,
  setBottomSheetProps,
  handleCloseBottomSheet,
  handleCloseBottomSheetTag,
  productRef,
  color,
  setProducts,
}: Readonly<ProductsListProps>) {
  const router = useRouter();

  function deleteItem(item: ItemInterface): void {
    throw new Error("Function not implemented.");
  }

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
  }, []);

  return (
    <Container background={color.backgroundPrimary} noPadding>
      <ContainerInner justify="center" background={color.backgroundPrimary}>
        {products && products.length > 0 ? (
          <ListGrid
            setProducts={setProducts}
            color={color}
            productRef={productRef}
            setBottomSheetProps={setBottomSheetProps}
            deleteItem={deleteItem}
            products={products}
            tagUuid={tag.uuid}
            handleCloseBottomSheet={handleCloseBottomSheet}
          />
        ) : (
          <EmptyList
            color={color}
            mensage={I18n.t("noProductsInThisCategory")}
          />
        )}
      </ContainerInner>
    </Container>
  );
}

