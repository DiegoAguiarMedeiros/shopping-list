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
import { useStores } from "../../context/StoreContext";

interface HistoryViewProps {
  lists: IList[];
}

const CustomFlatList = React.memo(
  ({
    lists,
  }: HistoryViewProps) => {
    const { ConfigRepository } = useStores();
    const renderItem: ListRenderItem<IList> = ({ item }) => (
      <ListGridItem
        list={item}
      />
    );

    return (
      <Container background={ConfigRepository.color.backgroundPrimary}>
        <ContainerInner background={ConfigRepository.color.backgroundPrimary}>
          <FlatList
            data={lists}
            renderItem={renderItem}
            keyExtractor={(item) => "ListGridItem-" + item.uuid}
            ListFooterComponent={<View style={{ height: 250 }} />}
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
  lists,
}: HistoryViewProps) => {
  return (
    <CustomFlatList
      lists={lists}
    />
  );
};
