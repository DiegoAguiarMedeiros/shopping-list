import { TouchableOpacity, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import {
  useShoppingListArchivedContext,
  useShoppingListContext,
} from "../../context/ShoppingList";
import { ItemInterface } from "../../types/types";
import { removeUndefinedFromArray } from "../../utils/functions";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import EmptyList from "./emptyList";
import ListGrid from "./listGrid";
import CircleProgress from "../../components/CircleProgress";
import FilterButtons from "../../components/FilterButtons";
type TotalType = {
  amount: number;
  un: number;
};

interface ListProps {
  listId: string;
}

export default function ListArchived({ listId }: ListProps) {
  const colorScheme = useColorScheme();
  const {
    listArchived,
    itemAmountListArchived,
    getListItemsOfListArchived,
    getTotalWithAmountArchived,
    getTotalUnArchived,
  } = useShoppingListArchivedContext();
  const [filter, setFilter] = useState("Todos");
  const listArr = listArchived[listId];
  const listArrItems = removeUndefinedFromArray(
    getListItemsOfListArchived(listArr.items)
  );

  const [total, setTotal] = useState<TotalType>({
    amount: getTotalWithAmountArchived(listArrItems),
    un: getTotalUnArchived(listArrItems),
  });
  const getTotalAmountAndUnity = (list: ItemInterface[]) => {
    setTotal({
      un: getTotalUnArchived(list),
      amount: getTotalWithAmountArchived(list),
    });
  };
  const router = useRouter();
  useEffect(() => {
    const newFilteredList = listArrItems.filter(
      (item: ItemInterface) => item.tags === filter
    );
    newFilteredList.length > 0
      ? getTotalAmountAndUnity(newFilteredList)
      : getTotalAmountAndUnity(listArrItems);
  }, [filter, itemAmountListArchived]);

  return (
    <Styled.Container background={Colors[colorScheme ?? "light"].background}>
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
          <Styled.ListTitle text={Colors[colorScheme ?? "light"].text}>
            {listArr.name}
          </Styled.ListTitle>
        </Styled.ContainerHeaderInnerText>
      </Styled.ContainerHeader>
      <Styled.ContainerBody>
        {listArrItems.length > 0 ? (
          <ListGrid filter={filter} listId={listId} />
        ) : (
          <EmptyList list={listArr.uuid} />
        )}
      </Styled.ContainerBody>
    </Styled.Container>
  );
}
