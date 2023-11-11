import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import BottomSheet, { BottomSheetProps } from "../../components/BottomSheet";
import { useState } from "react";
import NewListForm from "../../components/NewListForm";
import Button from "../../components/Button";

export default function Product() {
  const colorScheme = useColorScheme();
  const { list, listProduct, listAmount } = useShoppingListContext();
  const isFocused = useIsFocused();
  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerListInner>
        <EmptyList mensage="Você não tem nenhum produto cadastrado" />
      </Styled.ContainerListInner>
    </Styled.Container>
  );
}
