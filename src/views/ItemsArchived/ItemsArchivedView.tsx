// views/ListView.tsx
import React, { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { IList } from "../../Model/IList";
import ListGridItem from "../../screens/listArchived/listGrid/listGridItem";
import { colorTheme } from "../../../constants/Colors";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { IProduct } from "../../Model/IProduct";
import Header from "../../components/Header";
import { useStores } from "../../context/StoreContext";
import FilterButtons from "../../components/FilterButtons";
import Total from "../../components/total";
import { FlashList, ListRenderItem } from "@shopify/flash-list";

interface ItemsArchivedViewProps {
  lists: IProduct[];
}

const CustomFlatList = React.memo(
  ({ lists }: ItemsArchivedViewProps) => {
    const { ListRepository, ConfigRepository } = useStores();

    const renderItem: ListRenderItem<IProduct> = ({ item }) => (
      <ListGridItem
        item={item}
        listId={ListRepository.listActive ? ListRepository.listActive.uuid : ""}
      />
    );

    return (
      <Container background={ConfigRepository.color.backgroundPrimary}>
        <ContainerInner height="100" background={ConfigRepository.color.backgroundPrimary}>
          <FlashList
            style={{ flex: 1, width: "100%", marginTop: -15 }}
            contentContainerStyle={{
              width: "100%",
            }}
            data={lists}
            renderItem={renderItem}
            keyExtractor={(item) => "ListGridItem-" + item.uuid}
            ListFooterComponent={<View style={{ height: 250 }} />}
          />
          <Total
            height={3}
            total={
              ListRepository?.listActive?.total
                ? ListRepository.listActive.total
                : 0
            }
            un={
              ListRepository?.listActive?.totalUn
                ? ListRepository.listActive.totalUn
                : 0
            }
          />
        </ContainerInner>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    return (
      isEqual(prevProps.lists, nextProps.lists)
    );
  }
);

export const ItemsArchivedView = ({ lists }: ItemsArchivedViewProps) => {
  return <CustomFlatList lists={lists} />;
};
