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
import { colorTheme } from "../../constants/Colors";

interface HomeProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
}
export default function Home({
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
}: Readonly<HomeProps>) {
  const isFocused = useIsFocused();
  const list: string | any[] = [];
  // console.log("list", list);
  // console.log("listProduct", listProduct);
  // console.log("amount", amount);
  // console.log("tags", getTags());
  // console.log("listArchived", listArchived);
  return (
    <Container background={color.backgroundPrimary}>
      <ContainerInner background={color.backgroundPrimary}>
        {isFocused &&
          (list && list.length > 0 ? (
            <ListComponent
              items={[]}
              setBottomSheetProps={setBottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheet}
            />
          ) : (
            <EmptyList color={color} mensage={I18n.t("noListCreated")} />
          ))}
      </ContainerInner>
    </Container>
  );
}
