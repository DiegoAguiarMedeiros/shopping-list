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
import { IProduct } from "../../../Domain/Model/IProduct";
import Container from "../../../components/Container";
import ContainerInner from "../../../components/ContainerInner";
import { colorTheme } from "../../../constants/Colors";
interface ItemProps {
  items: IProduct[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  productRef: React.MutableRefObject<{
    handleAddProduct: (uuid: string) => void;
  } | null>;
}

export default function List({
  items,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  productRef,
}: Readonly<ItemProps>) {
  return (
    <ListGrid
      productRef={productRef}
      color={color}
      items={items}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
}
