// views/HistoryView.tsx
import React, { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  ListRenderItem,
} from "react-native";
import { IList } from "../../Model/IList";
import ListGridItem from "../../screens/history/list/listGrid/listGridItem";
import { colorTheme } from "../../../constants/Colors";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";

interface HistoryViewProps {
  color: colorTheme;
  lists: IList[];
}

const CustomFlatList = React.memo(
  ({
    color,
    lists,
  }: HistoryViewProps) => {
    const renderItem: ListRenderItem<IList> = ({ item }) => (
      <ListGridItem
        color={color}
        list={item}
      />
    );

    return (
      <Container background={color.backgroundPrimary}>
        <ContainerInner background={color.backgroundPrimary}>
          <FlatList
            data={lists}
            renderItem={renderItem}
            keyExtractor={(item) => "ListGridItem-" + item.uuid}
          />
        </ContainerInner>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.lists, nextProps.lists);
  }
);

export const HistoryView = ({
  color,
  lists,
}: HistoryViewProps) => {
  return (
    <CustomFlatList
      lists={lists}
      color={color}
    />
  );
};
