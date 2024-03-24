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
import getListProductController from "../../Domain/UseCases/ListProduct/GetProductByUuid";
import getTotalQuantityAmountByListUuidController from "../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import getTagUuidByTagNameController from "../../Domain/UseCases/Tag/GetTagUuidByTagName";
import getTotalQuantityWithoutAmountByListUuidController from "../../Domain/UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import Header from "../../components/Header";
import getListProductsByTagUuidUseCase from "../../Domain/UseCases/ListProduct/GetListProductsByTagUuid";
import getTagByUuidController from "../../Domain/UseCases/Tag/GetTagByUuid";
import { IProduct } from "../../Domain/Model/IProduct";
import I18n from "i18n-js";
import ITag from "../../Domain/Model/ITag";
type TotalType = {
  amount: number;
  un: number;
};

interface ProductsListProps {
  tag: ITag;
  products: string[];
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

export default function ProductsList({
  products,
  tag,
  setActiveRouteHeader,
  bottomSheetProps,
  setBottomSheetProps,
  handleCloseBottomSheet,
  handleCloseBottomSheetTag,
}: Readonly<ProductsListProps>) {
  const colorScheme = useColorScheme();
  const { getTheme, getColor } = useShoppingListContext();

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
          underlayColor={getColor().primary}
          style={{ marginLeft: 20, marginRight: 10 }}
          onPress={() => returnToTags()}
        >
          <FontAwesome name="angle-left" size={35} color={getColor().white} />
        </TouchableHighlight>
      ),
      name: <Title color={getColor().white}>{tag.name}</Title>,
      right: null,
    });
  }, []);

  return (
    <Container background={getColor().backgroundPrimary} noPadding>
      <ContainerInner
        justify="center"
        background={getColor().backgroundPrimary}
      >
        {products && products.length > 0 ? (
          <ListGrid
            setBottomSheetProps={setBottomSheetProps}
            deleteItem={deleteItem}
            products={products}
            tagUuid={tag.uuid}
            handleCloseBottomSheet={handleCloseBottomSheet}
          />
        ) : (
          <EmptyList mensage={I18n.t("noProductsInThisCategory")} />
        )}
      </ContainerInner>
    </Container>
  );
}

