import { router, useGlobalSearchParams, useSearchParams } from "expo-router";

import ProductsList from "../src/screens/productsList/index";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { useEffect, useImperativeHandle, useState } from "react";
import React from "react";
import { colorTheme } from "../constants/Colors";
import { IProduct } from "../src/Model/IProduct";
import { sortArrayOfObjects } from "../src/utils/functions";
import UUIDGenerator from "react-native-uuid";
import { useProductViewModel } from "../src/viewmodels/Product/ProductViewModel";
import { ProductView } from "../src/views/Product/ProductView";
import EmptyList from "../src/components/EmptyList";
import I18n from "i18n-js";
import { TouchableHighlight } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Title } from "../src/components/Text";
import ITag from "../src/Model/ITag";
import { useStores } from "../src/context/StoreContext";
import { observer } from "mobx-react-lite";

interface ProductTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  search: string;
}

const Product = ({ setBottomSheetProps, handleCloseBottomSheet, search }: ProductTabProps) => {
  const { ListRepository, ProductRepository } = useStores();
  useEffect(() => {
    ListRepository.setListActiveNull();
    ProductRepository.loadAll();
  }, []);

  return ProductRepository.allProducts &&
    ProductRepository.allProducts.length > 0 ? (
    <ProductView
      products={
        search != ""
          ? ProductRepository.allProducts.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          )
          : ProductRepository.allProducts

      }
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  ) : (
    <EmptyList mensage={I18n.t("noProducts")} />
  );
};

export default Product;
