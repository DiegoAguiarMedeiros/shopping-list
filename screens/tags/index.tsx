import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

import * as Styled from "./styles";
import BottomSheet, { BottomSheetProps } from "../../components/BottomSheet";
import { useEffect, useRef, useState } from "react";
import NewListForm from "../../components/NewListForm";
import Button from "../../components/Button";
import ListComponent from "./list";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import I18n from "i18n-js";
import ITag from "../../Domain/Model/ITag";

interface TagsProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
  tags: string[];
}

export default function Tags({
  bottomSheetProps,
  setBottomSheetProps,
  handleCloseBottomSheet,
  tags,
}: TagsProps) {
  const colorScheme = useColorScheme();
  const { getColor } = useShoppingListContext();

  return (
    <Container background={getColor().backgroundPrimary}>
      <ContainerInner background={getColor().backgroundPrimary}>
        {tags && tags.length > 0 ? (
          <ListComponent
            tags={tags}
            setBottomSheetProps={setBottomSheetProps}
            handleCloseBottomSheet={handleCloseBottomSheet}
          />
        ) : (
          <EmptyList mensage={I18n.t("noCategories")} />
        )}
      </ContainerInner>
    </Container>
  );
}
