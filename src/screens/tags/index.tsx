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
import ITag from "../../Model/ITag";
import { colorTheme } from "../../../constants/Colors";
import { IProduct } from "../../Model/IProduct";

interface TagsProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  tags: ITag[];
  productListRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
    handleReloadProduct: () => void;
  } | null>;
  tagRef: React.RefObject<{
    handleAddNewTag: (tag: ITag) => void;
    handleReloadTag(): void;
  }>;
  color: colorTheme;
}

export default function Tags({
  setBottomSheetProps,
  handleCloseBottomSheet,
  tags,
  productListRef,
  tagRef,
  color,
}: Readonly<TagsProps>) {
  return (
    <Container background={color.backgroundPrimary}>
      <ContainerInner background={color.backgroundPrimary}>
        {tags && tags.length > 0 ? (
          <ListComponent
            color={color}
            productListRef={productListRef}
            tagRef={tagRef}
            tags={tags}
            setBottomSheetProps={setBottomSheetProps}
            handleCloseBottomSheet={handleCloseBottomSheet}
          />
        ) : (
          <EmptyList color={color} mensage={I18n.t("noCategories")} />
        )}
      </ContainerInner>
    </Container>
  );
}
