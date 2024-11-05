import { router, useGlobalSearchParams, useSearchParams } from "expo-router";

import ProductsList from "../src/screens/productsList/index";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { useEffect, useImperativeHandle, useState } from "react";
import React from "react";
import { colorTheme } from "../constants/Colors";
import { IProduct } from "../src/Model/IProduct";
import { sortArrayOfObjects } from "../src/utils/functions";
import UUIDGenerator from "react-native-uuid";
import { useProductListViewModel } from "../src/viewmodels/ProductList/ProductListViewModel";
import { ProductListView } from "../src/views/ProductList/ProductListView";
import EmptyList from "../src/components/EmptyList";
import I18n from "i18n-js";
import { TouchableHighlight } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Title } from "../src/components/Text";
import { observer } from "mobx-react-lite";
import { useStores } from "../src/context/StoreContext";

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
}

const ProductList = ({
    setActiveRouteHeader,
    setBottomSheetProps,
    handleCloseBottomSheet,
    handleCloseBottomSheetTag,
  }: ProductListTabProps) => {
    const { tagUuid } = useGlobalSearchParams();
    const { ProductRepository, TagRepository, ConfigRepository } = useStores();
    const tag = TagRepository.getItem(
      tagUuid && !Array.isArray(tagUuid) ? tagUuid : ""
    );
    const returnToTags = () => {
      handleCloseBottomSheetTag();
      router.push({ pathname: "/tags" });
    };
    useEffect(() => {
      setActiveRouteHeader({
        left: (
          <TouchableHighlight
            underlayColor={ConfigRepository.color.primary}
            style={{ marginLeft: 20, marginRight: 10 }}
            onPress={() => returnToTags()}
          >
            <FontAwesome name="angle-left" size={35} color={ConfigRepository.color.white} />
          </TouchableHighlight>
        ),
        name: <Title color={ConfigRepository.color.white}>{tag?.name}</Title>,
        right: null,
      });
      if (tag) {
        TagRepository.setTagAcitve(tag?.uuid);
        ProductRepository.load();
      }
    }, []);

    return ProductRepository.products &&
      ProductRepository.products.length > 0 ? (
      <ProductListView
        products={ProductRepository.products}
        setBottomSheetProps={setBottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheetTag}
      />
    ) : (
      <EmptyList  mensage={I18n.t("noProducts")} />
    );
  };

export default ProductList;
