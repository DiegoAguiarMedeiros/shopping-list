import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import React, { lazy, useEffect, useState } from "react";
import { useSearchParams } from "expo-router";
import { useShoppingListContext } from "../../context/ShoppingList";
import { ItemInterface, TotalType } from "../../types/types";
import {
  getTotalUn,
  getTotalWithAmount,
  removeItem,
  removeUndefinedFromArray,
} from "../../utils/functions";

const EmptyList = lazy(() => import("./emptyList"));
const ListGrid = lazy(() => import("./listGrid"));
const CircleProgress = lazy(() => import("../../components/CircleProgress"));
const FilterButtons = lazy(() => import("../../components/FilterButtons"));

export default function List() {
  const {
    list,
    setList,
    listItem,
    setListItem,
    getListItemsOfList,
    getAmountOfListItems,
  } = useShoppingListContext();
  const { listId } = useSearchParams();
  const [filteredList, setFilteredList] = useState<ItemInterface[]>();
  const [filter, setFilter] = useState("Todos");
  const listArr = list[Array.isArray(listId) ? "" : listId!];
  const listArrItems = getListItemsOfList(listArr.items);

  const total: TotalType = {
    amount: 0,
    un: 0,
  };

  const getTotalAmount = () => {
    total.amount = listArrItems
      .map((item) =>
        getTotalWithAmount(
          removeUndefinedFromArray(getAmountOfListItems(item.amount))
        )
      )
      .reduce((accumulator, currentValue) => {
        return currentValue
          ? accumulator + 1
          : accumulator + Number(currentValue);
      }, 0);
  };
  const getTotalUnity = () => {
    total.un = listArrItems
      .map((item) =>
        getTotalUn(removeUndefinedFromArray(getAmountOfListItems(item.amount)))
      )
      .reduce((accumulator, currentValue) => {
        return currentValue
          ? accumulator + 1
          : accumulator + Number(currentValue);
      }, 0);
  };

  const colorScheme = useColorScheme();
  // const totalWithAmount = listArr.items ? getTotalWithAmount(filteredList !== undefined && filteredList.length > 0 ? filteredList : listArrItems) : 0;
  // const totalUn = listArr.items ? getTotalUn(filteredList !== undefined && filteredList.length > 0 ? filteredList : listArrItems) : 0;

  const handleDeleteItemList = (uuid: string): void => {
    const newList = removeItem(list, listArr.uuid, uuid);
    setList(newList);
  };

  useEffect(() => {
    getTotalAmount();
    getTotalUnity();
  }, []);
  useEffect(() => {
    const newFilteredList = listArrItems.filter(
      (item: ItemInterface) => item.tags === filter
    );
    setFilteredList(newFilteredList);
  }, [filter]);

  return (
    <Styled.Container background={Colors[colorScheme ?? "light"].background}>
      <Styled.ContainerHeader>
        <Styled.ContainerHeaderInnerText>
          <Styled.ListTitle text={Colors[colorScheme ?? "light"].text}>
            {listArr.name}
          </Styled.ListTitle>
        </Styled.ContainerHeaderInnerText>
        <Styled.ContainerHeaderInnerProgress>
          <CircleProgress
            filled={total.amount}
            progress={
              total.un && total.amount ? Number(total.amount / total.un) : 0
            }
            total={total.un}
            size={60}
          />
        </Styled.ContainerHeaderInnerProgress>
      </Styled.ContainerHeader>
      <Styled.ContainerHeaderInnerFilterButtons>
        <FilterButtons
          tags={listArr.tags}
          filter={filter}
          setFilter={setFilter}
        />
      </Styled.ContainerHeaderInnerFilterButtons>
      <Styled.ContainerBody>
        {listArr.items.length ? (
          <ListGrid
            filter={filter}
            listId={Array.isArray(listId) ? "" : listId!}
            deleteItemList={handleDeleteItemList}
          />
        ) : (
          <EmptyList list={listArr.uuid} />
        )}
      </Styled.ContainerBody>
    </Styled.Container>
  );
}
