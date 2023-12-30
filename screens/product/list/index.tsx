import { useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
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
interface ItemProps {
  items: IProduct[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

export default function List({
  items,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: Readonly<ItemProps>) {

  return (
    <ListGrid
      items={items}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
}
