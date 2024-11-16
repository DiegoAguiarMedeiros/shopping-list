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
import { useTagViewModel } from "../../viewmodels/Tag/TagViewModel";
import { IList } from "../../Model/IList";
import ListGridItem from "../../screens/tags/list/listGrid/listGridItem";
import { colorTheme } from "../../../constants/Colors";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { IProduct } from "../../Model/IProduct";
import ITag from "../../Model/ITag";
import { useStores } from "../../context/StoreContext";

interface TagViewProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  tags: ITag[];
}

const CustomFlatList = React.memo(
  ({
    setBottomSheetProps,
    handleCloseBottomSheet,
    tags,
  }: TagViewProps) => {
    const { ConfigRepository } = useStores();
    const renderItem: ListRenderItem<ITag> = ({ item }) => (
      <ListGridItem
        handleCloseBottomSheet={handleCloseBottomSheet}
        setBottomSheetProps={setBottomSheetProps}
        tag={item}
      />
    );

    return (
      <Container background={ConfigRepository.color.backgroundPrimary}>
        <ContainerInner background={ConfigRepository.color.backgroundPrimary}>
          <FlatList
            data={tags}
            renderItem={renderItem}
            keyExtractor={(item) => "ListGridItem-" + item.uuid}
            ListFooterComponent={<View style={{ height: 250 }} />}

          />
        </ContainerInner>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.tags, nextProps.tags);
  }
);

export const TagView = ({
  setBottomSheetProps,
  handleCloseBottomSheet,
  tags,
}: TagViewProps) => {
  return (
    <CustomFlatList
      tags={tags}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
};
