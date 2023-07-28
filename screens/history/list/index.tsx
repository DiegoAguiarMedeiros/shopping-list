import { useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import * as Styled from "./styles";
import { lazy, useState } from "react";
import {
  BottomSheetProps,
  ListInterface,
  ListType,
} from "../../../types/types";
const Button = lazy(() => import("../../../components/Button"));
const ListGrid = lazy(() => import("./listGrid"));
const BottomSheetComponent = lazy(
  () => import("../../../components/BottomSheetComponent")
);
interface ItemProps {
  items: ListInterface[];
}

export default function List({ items }: ItemProps) {
  const colorScheme = useColorScheme();

  return (
    <Styled.Container background={Colors[colorScheme ?? "light"].background}>
      <Styled.ContainerListList>
        <ListGrid items={items} />
      </Styled.ContainerListList>
      <Styled.ContainerListInner></Styled.ContainerListInner>
    </Styled.Container>
  );
}
