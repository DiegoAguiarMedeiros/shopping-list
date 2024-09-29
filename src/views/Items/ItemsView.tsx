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
import ListGridItem from "../../screens/list/listGrid/listGridItem";
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
  color: colorTheme;
  lists: IProduct[];
}

const CustomFlatList = React.memo(
  ({ color, lists }: ItemsViewProps) => {
    const { ListRepository, TagRepository } = useStores();
    const [active, setActive] = useState("");
    const handleOpen = (uuid: string) => {
      setActive(uuid);
    };
    const handleClose = () => {
      setActive("");
    };

    const renderItem: ListRenderItem<IProduct> = ({ item }) => (
      <ListGridItem
        color={color}
        item={item}
        listId={ListRepository.listActive ? ListRepository.listActive.uuid : ""}
        filter={""}
        handleOpen={handleOpen}
        handleClose={handleClose}
        active={active === item.uuid}
        totalUpdate={function (
          total: number,
          amount: number,
          un: number
        ): void {}}
        setList={function (value: React.SetStateAction<IList>): void {}}
      />
    );

    return (
      <Container background={color.backgroundPrimary}>
        <Header
          background={color.backgroundPrimary}
          bottom={
            ListRepository.listActive &&
            ListRepository.listActive.tags.length > 0 ? (
              <FilterButtons
                getTagByUuid={TagRepository.getItem}
                color={color}
                tags={ListRepository.listActive.tags}
                // filter={filter}
                // setFilter={setFilter}
              />
            ) : null
          }
        />
        <ContainerInner background={color.backgroundPrimary}>
          <FlatList
            data={lists}
            renderItem={renderItem}
            keyExtractor={(item) => "ListGridItem-" + item.uuid}
          />
          <Total
            color={color}
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
    return isEqual(prevProps.lists, nextProps.lists);
  }
);

export const ItemsView = ({ color, lists }: ItemsViewProps) => {
  return <CustomFlatList lists={lists} color={color} />;
};
