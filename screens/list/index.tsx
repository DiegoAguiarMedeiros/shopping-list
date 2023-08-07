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

import EmptyList from "./emptyList";
import ListGrid from "./listGrid";
import CircleProgress from "../../components/CircleProgress";
import FilterButtons from "../../components/FilterButtons";
import { Title } from "../../components/Text";
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
    listItem,
    itemAmountList,
    setList,
    setListItem,
    getListItemsOfList,
    getTotalWithAmount,
    setItemAmountList,
    getTotalUn,
  } = useShoppingListContext();
  const [listArr, setListArr] = useState(list[listId]);
  const [listArrItems, setListArrItems] = useState(
    removeUndefinedFromArray(getListItemsOfList(listArr?.items))
  );
  const [filter, setFilter] = useState("Todos");
  const [total, setTotal] = useState<TotalType>({
    amount: 0,
    un: 0,
  });
  const router = useRouter();

  useEffect(() => {
    setListArr(list[listId]);
    if (!listArr) return;
    const listItem = removeUndefinedFromArray(
      getListItemsOfList(list[listId].items)
    );
    if (filter === "Todos") {
      setListArrItems(listItem);

      const newTotal: TotalType = {
        un: getTotalUn(listItem),
        amount: getTotalWithAmount(listItem),
      };
      setTotal(newTotal);
      return;
    }

    const newFilteredList = listItem.filter(
      (item: ItemInterface) => item.tags === filter
    );
    setListArrItems(newFilteredList);

    const newTotal: TotalType = {
      un: getTotalUn(newFilteredList),
      amount: getTotalWithAmount(newFilteredList),
    };
    setTotal(newTotal);
    return () => {};
  }, [filter, listItem]);

  const deleteItem = (item: ItemInterface) => {
    const updatedList: ListItemInterface = JSON.parse(JSON.stringify(listItem));
    handleDeleteAmountInList(updatedList[item.uuid].amount);
    delete updatedList[item.uuid];
    setListItem(updatedList);
    handleDeleteItemListFromList(updatedList);
  };
  const handleDeleteAmountInList = (itemAmountUuid: string[]): void => {
    itemAmountUuid.forEach((i) => {
      const updatedList: ListItemAmountInterface = JSON.parse(
        JSON.stringify(itemAmountList)
      );
      delete updatedList[i];
      setItemAmountList(updatedList);
    });
  };
  const handleDeleteItemListFromList = (
    updatedList: ListItemInterface
  ): void => {
    const updatedListItem: ListType = JSON.parse(JSON.stringify(list));
    const item = updatedListItem[listId];
    if (item) {
      if (updatedList?.uuid) {
        const newArray = item.items.filter((i) => i !== item.uuid);
        item.items = newArray;
      }
      item.items = [];
      item.tags = getTagsFromListItemInterface(updatedList);
      setList(updatedListItem);
    }
  };

  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].backgroundHeader}
    >
      <Styled.ContainerHeader>
        <Styled.ContainerHeaderInnerIconBack>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome
              name="angle-left"
              size={35}
              color={Colors[colorScheme ?? "light"].text}
            />
          </TouchableOpacity>
        </Styled.ContainerHeaderInnerIconBack>
        <Styled.ContainerHeaderInnerText>
          <Title dark>{listArr?.name}</Title>
        </Styled.ContainerHeaderInnerText>

        <Styled.ContainerHeaderInnerProgress>
          <CircleProgress
            filled={total.amount}
            progress={total.un && total.amount ? total.amount : 0}
            total={total.un}
            size={30}
          />
        </Styled.ContainerHeaderInnerProgress>
      </Styled.ContainerHeader>
      {listArr?.tags.length > 0 ? (
        <Styled.ContainerHeaderInnerFilterButtons>
          <FilterButtons
            tags={removeUndefinedFromArray(listArr?.tags)}
            filter={filter}
            setFilter={setFilter}
          />
        </Styled.ContainerHeaderInnerFilterButtons>
      ) : null}

      <Styled.ContainerBody>
        {listArrItems.length > 0 ? (
          <ListGrid
            deleteItem={deleteItem}
            listArrItems={listArrItems}
            listId={listId}
          />
        ) : (
          <EmptyList list={listArr?.uuid} />
        )}
      </Styled.ContainerBody>
    </Styled.Container>
  );
}
