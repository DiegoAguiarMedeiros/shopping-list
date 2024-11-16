// views/ListView.tsx
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
import ListGridItem from "../../screens/home/list/listGrid/listGridItem";
import { colorTheme } from "../../../constants/Colors";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { useStores } from "../../context/StoreContext";

interface ListViewProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  lists: IList[];
}

const CustomFlatList = ({
  setBottomSheetProps,
  handleCloseBottomSheet,
  lists,
}: ListViewProps) => {
  const { ConfigRepository } = useStores();
  const renderItem: ListRenderItem<IList> = ({ item }) => (
    <ListGridItem
      handleCloseBottomSheet={handleCloseBottomSheet}
      setBottomSheetProps={setBottomSheetProps}
      list={item}
      theme={ConfigRepository.theme}
      colors={ConfigRepository.colors}
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
};

export const ListView = ({
  setBottomSheetProps,
  handleCloseBottomSheet,
  lists,
}: ListViewProps) => {
  return (
    <CustomFlatList
      lists={lists}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
};

