import { useNavigation } from "expo-router";
import { colorTheme } from "../constants/Colors";
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
  route: string
}

const Items = ({
  handleCloseBottomSheetList,
  setActiveRouteHeader,
  route
}: ItemsListProps) => {
  const { ListRepository, ProductRepository, TagRepository, ConfigRepository } = useStores();
  const navigation = useNavigation<any>();
  const returnToHome = () => {
    handleCloseBottomSheetList();
    ProductRepository.setTagFilter(I18n.t("all"));
    ProductRepository.updateTotal();
    ProductRepository.updateTotalUn();
    ProductRepository.updateTotalWithAmount();
    ProductRepository.updateTotalWithoutAmount();
    ListRepository.setListActiveNull();
    navigation.navigate("home");
  };

  useEffect(() => {
    ProductRepository.load();
  }, [])

  useEffect(() => {
    if (route == 'home') {
      setActiveRouteHeader({
        left: (
          <TouchableHighlight
            underlayColor={ConfigRepository.color.primary}
            style={{ marginLeft: 20, marginRight: 10 }}
            onPress={() => returnToHome()}
          >
            <FontAwesome name="angle-left" size={35} color={ConfigRepository.color.onPrimary} />
          </TouchableHighlight>
        ),
        name: (
          <Title color={ConfigRepository.color.onPrimary}>{ListRepository?.listActive?.name}</Title>
        ),
        right: (
          <ContainerCP>
          <CircleProgress
            activeStrokeColor={ConfigRepository.color.onPrimary}
            circleBackgroundColor={ConfigRepository.color.primary}
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
    }

  }, [
    ListRepository?.listActive?.totalWithoutAmount,
    ListRepository?.listActive?.totalUn,
  ]);

  const validateFilterButtons = (products: number): React.ReactNode => {
    if (products > 0) {
      return <FilterButtons
        filter={TagRepository.tagFilter}
        tags={ListRepository.listActive?.tags ?? []}
      />
    }
    return <></>
  }
  const validateProducts = (
    productRepository: number,
    tagRepository: string
  ): boolean => {
    if (productRepository) {
      return true;
    }
    if (!productRepository && tagRepository && tagRepository != I18n.t("all")) {
      return true;
    }
    return false;
  }

  return validateProducts(ProductRepository.products.length, TagRepository.tagFilter) ? (
    <>
      <Header
        background={ConfigRepository.color.backgroundPrimary}
        bottom={validateFilterButtons(ProductRepository.products.length)}
      />
      <ItemsView lists={ProductRepository.products} tagRepository={TagRepository.tagFilter} />
    </>
  ) : (
    <EmptyList mensage={I18n.t("noItemsInTheList")} />
  );
};

export default Items;
