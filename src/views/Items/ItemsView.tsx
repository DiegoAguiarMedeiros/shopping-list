// views/ListView.tsx
import React, { useEffect, useRef, useState } from "react";
import { FlashList, FlashListRef, ListRenderItem } from "@shopify/flash-list";
import isEqual from "lodash.isequal";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { IList } from "../../Model/IList";
import ListGridItem from "../../screens/list/listGridItem";
import { colorTheme } from "../../../constants/Colors";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { IProduct } from "../../Model/IProduct";
import Header from "../../components/Header";
import { useStores } from "../../context/StoreContext";
import FilterButtons from "../../components/FilterButtons";
import Total from "../../components/total";

interface ItemsViewProps {
  lists: IProduct[];
  tagRepository: string;
}

const CustomFlatList = React.memo(
  ({ lists, tagRepository }: ItemsViewProps) => {
    const { ListRepository, ConfigRepository } = useStores();
    const flatListRef = useRef<FlashListRef<IProduct> | null>(null);
    const [active, setActive] = useState("");
    const handleOpen = (uuid: string, index: number) => {
      scrollToIndex(index)
      setActive(uuid);
    };
    const handleClose = () => {
      setActive("");
    };

    const ITEM_HEIGHT = 80; // Altura do item na lista (ajuste conforme necessário)

    const scrollToIndex = (index: number) => {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    };




    const renderItem: ListRenderItem<IProduct> = ({ item, index }) => (
      <ListGridItem
        item={item}
        listId={ListRepository.listActive ? ListRepository.listActive.uuid : ""}
        handleOpen={handleOpen}
        handleClose={handleClose}
        active={active === item.uuid}
        index={index}
        tagRepository={tagRepository}
      />
    );


    return (
      <Container background={ConfigRepository.color.backgroundPrimary}  height="95%" style={{paddingTop: 0}}>
        <ContainerInner height="95%" background={ConfigRepository.color.backgroundPrimary}>
          <FlashList
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{
              width: "100%",
            }}
            ref={flatListRef}
            data={lists}
            renderItem={renderItem}
            keyExtractor={(item) => "ListGridItem-" + item.uuid}
            ListFooterComponent={
              <View
                style={{
                  width: "100%",
                  height: 250,
                }}
              />}
          />


          <Total
            height="5%"
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
      isEqual(prevProps.lists, nextProps.lists) && isEqual(prevProps.tagRepository, nextProps.tagRepository)
    );
  }
);

export const ItemsView = ({ lists, tagRepository }: ItemsViewProps) => {
  return <CustomFlatList lists={lists} tagRepository={tagRepository} />;
};
