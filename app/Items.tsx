import { router, useGlobalSearchParams } from "expo-router";
import List from "../src/screens/list/index";
import { colorTheme } from "../constants/Colors";
import { useShoppingListContext } from "../src/context/ShoppingList";
import { useEffect, useImperativeHandle, useState } from "react";
import { IList } from "../src/Model/IList";
import { IProduct } from "../src/Model/IProduct";
import React from "react";
import { observer } from "mobx-react-lite";
import EmptyList from "../src/components/EmptyList";
import I18n from "i18n-js";
import { ItemsView } from "../src/views/Items/ItemsView";
import { useStores } from "../src/context/StoreContext";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native";
import { Title } from "../src/components/Text";
import CircleProgress from "../src/components/CircleProgress";
import ContainerCP from "../src/components/ContainerCP";
import Header from "../src/components/Header";
import FilterButtons from "../src/components/FilterButtons";

interface ItemsListProps {
  handleCloseBottomSheetList: () => void;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
  color: colorTheme;
}

const Items = observer(
  ({
    handleCloseBottomSheetList,
    setActiveRouteHeader,
    color,
  }: ItemsListProps) => {
    const { ListRepository, ProductRepository, TagRepository } = useStores();
    const returnToHome = () => {
      handleCloseBottomSheetList();
      ProductRepository.setTagFilter('Todos');
      ProductRepository.updateTotal();
      ProductRepository.updateTotalUn();
      ProductRepository.updateTotalWithAmount();
      ProductRepository.updateTotalWithoutAmount();
      ListRepository.setListActiveNull();
      router.push({ pathname: "/home" });
    };

    useEffect(() => {
      setActiveRouteHeader({
        left: (
          <TouchableHighlight
            underlayColor={color.primary}
            style={{ marginLeft: 20, marginRight: 10 }}
            onPress={() => returnToHome()}
          >
            <FontAwesome name="angle-left" size={35} color={color.white} />
          </TouchableHighlight>
        ),
        name: (
          <Title color={color.white}>{ListRepository?.listActive?.name}</Title>
        ),
        right: (
          <ContainerCP>
            <CircleProgress
              activeStrokeColor={color.circularHeaderFilled}
              titleColor={color.circularHeaderText}
              circleBackgroundColor={color.circularHeaderBackground}
              filled={0}
              progress={
                ListRepository?.listActive?.totalWithoutAmount
                  ? ListRepository?.listActive?.totalWithoutAmount
                  : 0
              }
              total={
                ListRepository?.listActive?.totalUn
                  ? ListRepository?.listActive?.totalUn
                  : 0
              }
              size={24}
            />
          </ContainerCP>
        ),
      });
    }, [
      ListRepository?.listActive?.totalWithoutAmount,
      ListRepository?.listActive?.totalUn,
    ]);

    function validateProducts(
      productRepository: number,
      tagRepository: string
    ): boolean {
      if (productRepository) {
        return true;
      }
      if (!productRepository && tagRepository) {
        return true;
      }
      return false;
    }
    return validateProducts(ProductRepository.products.length, TagRepository.tagFilter) ? (
      <>
        <Header
          background={color.backgroundPrimary}
          bottom={<FilterButtons
            filter={TagRepository.tagFilter}
            color={color}
            tags={ListRepository.listActive?.tags ?? []}
          />}
        />
        <ItemsView lists={ProductRepository.products} color={color} />
      </>
    ) : (
      <EmptyList color={color} mensage={I18n.t("noItemsInTheList")} />
    );
  }
);

export default Items;
