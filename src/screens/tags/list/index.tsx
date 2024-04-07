import { useColorScheme } from "react-native";
import * as Styled from "./styles";
import { useState } from "react";
import { ListInterface } from "../../../types/types";
import { BottomSheetProps } from "../../../components/BottomSheet";
import Button from "../../../components/Button";
import ListGrid from "./listGrid";
import BottomSheet from "../../../components/BottomSheet";
import { Text } from "../../../components/Text";
import NewListForm from "../../../components/NewListForm";
import ITag from "../../../Domain/Model/ITag";
import Container from "../../../components/Container";
import ContainerInner from "../../../components/ContainerInner";
interface ItemProps {
  tags: string[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (uuid: string) => void;
  } | null>;

  tagRef: React.RefObject<{ handleAddNewTag: (tag: string) => void }>;
}

export default function List({
  tags,
  setBottomSheetProps,
  handleCloseBottomSheet,
  productListRef,
  tagRef,
}: ItemProps) {
  const colorScheme = useColorScheme();

  return (
    <ListGrid
      tagRef={tagRef}
      productListRef={productListRef}
      tags={tags}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
}
