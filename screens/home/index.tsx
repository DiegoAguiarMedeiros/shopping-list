import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import BottomSheet, { BottomSheetProps } from "../../components/BottomSheet";
import { useState } from "react";
import NewListForm from "../../components/NewListForm";
import Button from "../../components/Button";

interface HomeProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
}
export default function Home({
  bottomSheetProps,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: HomeProps) {
  const colorScheme = useColorScheme();
  const { list, listProduct, amount, tags } = useShoppingListContext();
  const isFocused = useIsFocused();
  // console.log("list", list);
  // console.log("listProduct", listProduct);
  // console.log("amount", amount);
  // console.log("tags", tags);
  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerListInner>
        {isFocused &&
          (list && list.length > 0 ? (
            <ListComponent
              items={list}
              setBottomSheetProps={setBottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheet}
            />
          ) : (
            <EmptyList mensage="Você não tem nenhuma lista criada" />
          ))}
      </Styled.ContainerListInner>
    </Styled.Container>
  );
}
