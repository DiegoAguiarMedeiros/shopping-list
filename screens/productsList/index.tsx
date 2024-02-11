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
import getListProductController from "../../Domain/UseCases/ListProduct/GetListProductByUuid";
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
type TotalType = {
  amount: number;
  un: number;
};

interface ProductsListProps {
  tagUuid: string;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
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
  tagUuid,
  setActiveRouteHeader,
  bottomSheetProps,
  setBottomSheetProps,
  handleCloseBottomSheet,
  handleCloseBottomSheetTag,
}: Readonly<ProductsListProps>) {
  const colorScheme = useColorScheme();
  const { listProduct, getTheme, getColor } = useShoppingListContext();
  const tag = getTagByUuidController.handle(tagUuid);

  const [listArrItems, setListArrItems] = useState<IProduct[]>(
    getListProductsByTagUuidUseCase.handle(tagUuid)
  );

  useEffect(() => {
    setListArrItems(getListProductsByTagUuidUseCase.handle(tagUuid));
  }, [listProduct]);

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
        {listArrItems && listArrItems.length > 0 ? (
          <ListGrid
            setBottomSheetProps={setBottomSheetProps}
            deleteItem={deleteItem}
            listArrItems={listArrItems}
            tagUuid={tagUuid}
            handleCloseBottomSheet={handleCloseBottomSheet}
          />
        ) : (
          <EmptyList mensage={I18n.t("noProductsInThisCategory")} />
        )}
      </ContainerInner>
    </Container>
  );
}

