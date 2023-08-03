import { TouchableOpacity, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
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

export default function List({ listId }: ListProps) {
  const colorScheme = useColorScheme();
  const {
    list,
    itemAmountList,
    getListItemsOfList,
    getTotalWithAmount,
    getTotalUn,
  } = useShoppingListContext();
  const [filter, setFilter] = useState("Todos");
  const listArr = list[listId];
  if (!listArr) return null;
  const listArrItems = removeUndefinedFromArray(
    getListItemsOfList(listArr.items)
  );

  const [total, setTotal] = useState<TotalType>({
    amount: getTotalWithAmount(listArrItems),
    un: getTotalUn(listArrItems),
  });
  const getTotalAmountAndUnity = (list: ItemInterface[]) => {
    setTotal({
      un: getTotalUn(list),
      amount: getTotalWithAmount(list),
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
  }, [filter, itemAmountList]);

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
          <Styled.ListTitle text={Colors[colorScheme ?? "light"].text}>
            {listArr.name}
          </Styled.ListTitle>
        </Styled.ContainerHeaderInnerText>
        <Styled.ContainerHeaderInnerProgress>
          <CircleProgress
            filled={total.amount}
            progress={total.un && total.amount ? total.amount : 0}
            total={total.un}
            size={40}
          />
        </Styled.ContainerHeaderInnerProgress>
      </Styled.ContainerHeader>
      <Styled.ContainerHeaderInnerFilterButtons>
        <FilterButtons
          tags={removeUndefinedFromArray(listArr.tags)}
          filter={filter}
          setFilter={setFilter}
        />
      </Styled.ContainerHeaderInnerFilterButtons>
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
