import { TouchableOpacity, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import {
  ItemInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../../types/types";
import {
  getTagsFromListItemInterface,
  removeUndefinedFromArray,
} from "../../utils/functions";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import EmptyList from "../../components/EmptyList";
import ListGrid from "./listGrid";
import CircleProgress from "../../components/CircleProgress";
import FilterButtons from "../../components/FilterButtons";
import { Title, Text } from "../../components/Text";
import BottomSheet, { BottomSheetProps } from "../../components/BottomSheet";
import Button from "../../components/Button";
import NewItemForm from "../../components/NewItemForm";
type TotalType = {
  amount: number;
  un: number;
};

interface ListProps {
  listId: string;
}

export default function List({ listId }: ListProps) {
  const colorScheme = useColorScheme();
  const {
    list,
    setList,
  } = useShoppingListContext();
  const selectedItem = list.find((i) => i.uuid === listId);
  const [listArr, setListArr] = useState(selectedItem);
  const [listArrItems, setListArrItems] = useState(
    removeUndefinedFromArray([])
  );

  const tagsWithoutUndefinedFromArray = removeUndefinedFromArray(listArr?.tags!);

  const [tagsWithoutTodos, setTagsWithoutTodos] = useState(
    removeUndefinedFromArray(tagsWithoutUndefinedFromArray).filter(
      (tag) => tag.name !== "Todos"
    )
  );
  const handleCloseBottomSheet = () => {
    setBottomSheetProps({ ...bottomSheetProps, isVisible: false });
  };
  const [filter, setFilter] = useState("Todos");
  const [total, setTotal] = useState<TotalType>({
    amount: 0,
    un: 0,
  });
  const router = useRouter();

  const initialBottomSheetProps: BottomSheetProps = {
    isVisible: false,
    height: "edit",
    children: (
      <NewItemForm
        onClose={handleCloseBottomSheet}
        action="addListItem"
        buttonText="add"
        listId={listId}
        tags={tagsWithoutTodos}
      />
    ),
  };

  const [bottomSheetProps, setBottomSheetProps] = useState(
    initialBottomSheetProps
  );

  useEffect(() => {
    // setListArrItems(
    //   removeUndefinedFromArray(getListItemsOfList(list[listId]?.items))
    // );
    // if (!listArr) return;
    // const listItemarr = removeUndefinedFromArray(
    //   getListItemsOfList(list[listId].items)
    // );
    // if (filter === "Todos") {
    //   setListArrItems(listItemarr);

    //   const newTotal: TotalType = {
    //     un: getTotalUn(listItemarr),
    //     amount: getTotalWithAmount(listItemarr),
    //   };
    //   setTotal(newTotal);
    //   return;
    // }

    // const newFilteredList = listItemarr.filter(
    //   (item: ItemInterface) => item.tags === filter
    // );
    // setListArrItems(newFilteredList);

    // const newTotal: TotalType = {
    //   un: getTotalUn(newFilteredList),
    //   amount: getTotalWithAmount(newFilteredList),
    // };
    // setTotal(newTotal);

    // return () => { };
  }, [filter]);

  const deleteItem = (item: ItemInterface) => {
    // const updatedList: ListItemInterface = JSON.parse(JSON.stringify(listItem));
    // handleDeleteAmountInList(updatedList[item.uuid].amount);
    // delete updatedList[item.uuid];
    // setListItem(updatedList);
    // handleDeleteItemListFromList(updatedList, item.uuid);
  };
  const handleDeleteAmountInList = (itemAmountUuid: string[]): void => {
    // const updatedList: ListItemAmountInterface = JSON.parse(
    //   JSON.stringify(itemAmountList)
    // );
    // itemAmountUuid.forEach((i) => {
    //   delete updatedList[i];
    // });
    // setItemAmountList(updatedList);
  };
  const handleDeleteItemListFromList = (
    updatedList: ListItemInterface,
    itemUuid: string
  ): void => {
    // const updatedListItem: ListType = JSON.parse(JSON.stringify(list));
    // const item = updatedListItem[listId];
    // if (item) {
    //   const newArray = item.items.filter((i) => i !== itemUuid);
    //   item.items = newArray;
    //   item.tags = getTagsFromListItemInterface(updatedList);
    //   setList(updatedListItem);
    // }
  };

  useEffect(() => {
    setBottomSheetProps({
      isVisible: false,
      height: "edit",
      children: (
        <NewItemForm
          onClose={handleCloseBottomSheet}
          action="addListItem"
          buttonText="add"
          listId={listId}
          tags={removeUndefinedFromArray(listArr!.tags).filter(
            (tag) => tag.name !== "Todos"
          )}
        />
      ),
    });
  }, [list]);

  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].headerBackgroundColor}
    >
      <Styled.ContainerHeader>
        <Styled.ContainerHeaderInnerIconBack>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome
              name="angle-left"
              size={35}
              color={Colors[colorScheme ?? "light"].white}
            />
          </TouchableOpacity>
        </Styled.ContainerHeaderInnerIconBack>
        <Styled.ContainerHeaderInnerText>
          <Title color={Colors[colorScheme ?? "light"].white}>
            {listArr?.name}
          </Title>
        </Styled.ContainerHeaderInnerText>

        <Styled.ContainerHeaderInnerProgress>
          <CircleProgress
            activeStrokeColor={
              Colors[colorScheme ?? "light"]
                .circleProgresBackgroundFilledListColor
            }
            titleColor={
              Colors[colorScheme ?? "light"].circleProgresTextListColor
            }
            circleBackgroundColor={
              Colors[colorScheme ?? "light"].circleProgresBackgroundListColor
            }
            filled={total.amount}
            progress={total.un && total.amount ? total.amount : 0}
            total={total.un}
            size={30}
          />
        </Styled.ContainerHeaderInnerProgress>
      </Styled.ContainerHeader>
      {listArr && listArr.tags.length > 0 ? (
        <Styled.ContainerHeaderInnerFilterButtons>
          <FilterButtons
            tags={tagsWithoutUndefinedFromArray}
            filter={filter}
            setFilter={setFilter}
          />
        </Styled.ContainerHeaderInnerFilterButtons>
      ) : null}

      <Styled.ContainerBody>
        <Styled.ContainerListInner>
          {listArrItems.length > 0 ? (
            <ListGrid
              tagsWithoutTodos={tagsWithoutTodos}
              setBottomSheetProps={setBottomSheetProps}
              deleteItem={deleteItem}
              listArrItems={listArrItems}
              listId={listId}
              handleCloseBottomSheet={handleCloseBottomSheet}
            />
          ) : (
            <EmptyList mensage="Você não tem nenhuma item na lista" />
          )}
        </Styled.ContainerListInner>
      </Styled.ContainerBody>
    </Styled.Container>
  );
}
