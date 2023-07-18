import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import React, { lazy, useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import { ItemInterface } from "../../types/types";
import { removeUndefinedFromArray } from "../../utils/functions";

const EmptyList = lazy(() => import("./emptyList"));
const ListGrid = lazy(() => import("./listGrid"));
const CircleProgress = lazy(() => import("../../components/CircleProgress"));
const FilterButtons = lazy(() => import("../../components/FilterButtons"));
type TotalType = {
  amount: number;
  un: number;
};

interface ListProps {
  listId: string;
}

export default function List({ listId }: ListProps) {
  const colorScheme = useColorScheme();
  const { list, getListItemsOfList, getTotalWithAmount, getTotalUn } =
    useShoppingListContext();
  const [filter, setFilter] = useState("Todos");
  const listArr = list[listId];
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
  useEffect(() => {
    const newFilteredList = listArrItems.filter(
      (item: ItemInterface) => item.tags === filter
    );
    newFilteredList.length > 0
      ? getTotalAmountAndUnity(newFilteredList)
      : getTotalAmountAndUnity(listArrItems);
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
          tags={removeUndefinedFromArray(listArr.tags)}
          filter={filter}
          setFilter={setFilter}
        />
      </Styled.ContainerHeaderInnerFilterButtons>
      <Styled.ContainerBody>
        {listArrItems.length > 0 ? (
          <ListGrid
            filter={filter}
            listId={Array.isArray(listId) ? "" : listId!}
          />
        ) : (
          <EmptyList list={listArr.uuid} />
        )}
      </Styled.ContainerBody>
    </Styled.Container>
  );
}
