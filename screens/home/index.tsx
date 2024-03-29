import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";
import { useIsFocused } from "@react-navigation/native";

import * as Styled from "./styles";
import BottomSheet, { BottomSheetProps } from "../../components/BottomSheet";
import { useEffect, useState } from "react";
import NewListForm from "../../components/NewListForm";
import Button from "../../components/Button";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import I18n from "i18n-js";

interface HomeProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
}
export default function Home({
  bottomSheetProps,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: Readonly<HomeProps>) {
  const colorScheme = useColorScheme();
  const { list, listProduct, amount, tags, listArchived, getTheme, getColor } =
    useShoppingListContext();
  const isFocused = useIsFocused();

  // console.log("list", list);
  // console.log("listProduct", listProduct);
  // console.log("amount", amount);
  // console.log("tags", tags);
  // console.log("listArchived", listArchived);
  return (
    <Container background={getColor().backgroundPrimary}>
      <ContainerInner background={getColor().backgroundPrimary}>
        {isFocused &&
          (list && list.length > 0 ? (
            <ListComponent
              items={list}
              setBottomSheetProps={setBottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheet}
            />
          ) : (
            <EmptyList mensage={I18n.t("noListCreated")} />
          ))}
      </ContainerInner>
    </Container>
  );
}
