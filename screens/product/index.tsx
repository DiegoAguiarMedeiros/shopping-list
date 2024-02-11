import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

import * as Styled from "./styles";
import BottomSheet, { BottomSheetProps } from "../../components/BottomSheet";
import React, { useState } from "react";
import NewListForm from "../../components/NewListForm";
import Button from "../../components/Button";
import ListComponent from "./list";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import I18n from "i18n-js";

interface ProductProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
  search: string;
}

export default function Product({
  setBottomSheetProps,
  handleCloseBottomSheet,
  search,
}: Readonly<ProductProps>) {
  const colorScheme = useColorScheme();
  const { listProduct, getTheme, getColor } = useShoppingListContext();
  return (
    <Container background={getColor().backgroundPrimary}>
      <ContainerInner background={getColor().backgroundPrimary}>
        {listProduct && listProduct.length > 0 ? (
          <ListComponent
            items={
              search != ""
                ? listProduct.filter((product) =>
                    product.name.toLowerCase().includes(search.toLowerCase())
                  )
                : listProduct
            }
            setBottomSheetProps={setBottomSheetProps}
            handleCloseBottomSheet={handleCloseBottomSheet}
          />
        ) : (
          <EmptyList mensage={I18n.t("noProductsRegistered")} />
        )}
      </ContainerInner>
    </Container>
  );
}
