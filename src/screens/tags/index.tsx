import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import { useIsFocused } from "expo-router/react-navigation";

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
    handleAddNewTag: (tag: string) => void;
    handleRemoveTag: (uuid: string) => void;
    handleEditTag: (uuid: string, name: string) => void;
    handleIncreaseProductQTD: (uuid: string) => void;
    handleDecreaseProductQTD: (uuid: string) => void;
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
          <EmptyList mensage={I18n.t("noCategories")} />
        )}
      </ContainerInner>
    </Container>
  );
}
