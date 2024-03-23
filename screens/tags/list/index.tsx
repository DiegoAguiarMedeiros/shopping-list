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
}

export default function List({
  tags,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: ItemProps) {
  const colorScheme = useColorScheme();

  return (
    <ListGrid
      tags={tags}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
}
