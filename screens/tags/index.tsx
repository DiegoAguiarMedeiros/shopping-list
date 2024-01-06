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
import ListComponent from "./list";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";

interface TagsProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
}

export default function Tags({
  bottomSheetProps,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: TagsProps) {
  const colorScheme = useColorScheme();
  const { tags } = useShoppingListContext();
  return (
    <Container
      background={Colors[colorScheme ?? "light"].backgroundPrimary}
    >
      <ContainerInner
        background={Colors[colorScheme ?? "light"].backgroundPrimary}>
        {tags && tags.length > 0 ? (
          <ListComponent
            items={tags}
            setBottomSheetProps={setBottomSheetProps}
            handleCloseBottomSheet={handleCloseBottomSheet}
          />
        ) :
          <EmptyList mensage="Você não tem nenhuma categoria cadastrada" />}
      </ContainerInner>
    </Container>
  );
}
