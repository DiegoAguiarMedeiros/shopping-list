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

interface ListViewProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  lists: IList[];
}

const CustomFlatList = React.memo(
  ({
    setBottomSheetProps,
    handleCloseBottomSheet,
    color,
    lists,
  }: ListViewProps) => {
    const renderItem: ListRenderItem<IList> = ({ item }) => (
      <ListGridItem
        color={color}
        handleCloseBottomSheet={handleCloseBottomSheet}
        setBottomSheetProps={setBottomSheetProps}
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

export const ListView = ({
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  lists,
}: ListViewProps) => {
  return (
    <CustomFlatList
      lists={lists}
      color={color}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
};
