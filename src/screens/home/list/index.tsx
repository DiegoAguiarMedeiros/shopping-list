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
import { IList } from "../../../Domain/Model/IList";
interface ItemProps {
  lists: string[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

export default function List({
  lists,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: ItemProps) {
  const colorScheme = useColorScheme();

  return (
    <ListGrid
      lists={lists}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
}
