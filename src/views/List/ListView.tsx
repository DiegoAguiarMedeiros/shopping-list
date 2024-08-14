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
import { useListViewModel } from "../../viewmodels/ListViewModel";
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
  listRef: React.MutableRefObject<{
    handleAddNewList: (name: string) => void;
    handleRemoveItem: (uuid: string) => void;
    handleEditItem: (uuid: string, name: string) => void;
    handleCopyItem: (uuid: string, name: string) => void;
  } | null>;
  listItemRef: React.MutableRefObject<{
    handleAddItem: (list: IList) => void;
  } | null>;
}

const CustomFlatList = React.memo(
  ({
    setBottomSheetProps,
    handleCloseBottomSheet,
    color,
    lists,
    listRef,
    listItemRef,
  }: ListViewProps) => {
    const renderItem: ListRenderItem<IList> = ({ item }) => (
      <ListGridItem
        listItemRef={listItemRef}
        listRef={listRef}
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
  listRef,
  listItemRef,
}: ListViewProps) => {
  return (
    <CustomFlatList
      listItemRef={listItemRef}
      listRef={listRef}
      lists={lists}
      color={color}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
};
