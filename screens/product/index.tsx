import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import BottomSheet, { BottomSheetProps } from "../../components/BottomSheet";
import React, { useState } from "react";
import NewListForm from "../../components/NewListForm";
import Button from "../../components/Button";
import ListComponent from "./list";


interface ProductProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
}

export default function Product({
  bottomSheetProps,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: ProductProps) {
  const colorScheme = useColorScheme();
  const { list, listProduct, listAmount } = useShoppingListContext();
  const isFocused = useIsFocused();
  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerListInner>
        {listProduct && listProduct.length > 0 ? (
          <ListComponent
            items={listProduct}
            setBottomSheetProps={setBottomSheetProps}
            handleCloseBottomSheet={handleCloseBottomSheet}
          />
        ) :
          <EmptyList mensage="Você não tem nenhum produto cadastrado" />
        }
      </Styled.ContainerListInner>
    </Styled.Container>
  );
}
