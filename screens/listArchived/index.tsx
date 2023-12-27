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

import EmptyList from "../../components/EmptyList";
import ListGrid from "./listGrid";
import CircleProgress from "../../components/CircleProgress";
import FilterButtons from "../../components/FilterButtons";
import { Title } from "../../components/Text";
import getListProductController from "../../Domain/UseCases/ListProduct/GetListProductByUuid";
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
    listArchived
  } = useShoppingListArchivedContext();
  const listArr = listArchived.find((i) => i.uuid === listId);
  const [filter, setFilter] = useState("Todos");

  const listArrItems = getListProductController.handle(listArr?.items ? listArr?.items : []);
  const router = useRouter();
  // useEffect(() => {
  //   const newFilteredList = listArrItems.filter(
  //     (item: ItemInterface) => item.tags === filter
  //   );
  //   newFilteredList.length > 0
  //     ? getTotalAmountAndUnity(newFilteredList)
  //     : getTotalAmountAndUnity(listArrItems);
  // }, [filter]);

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
      </Styled.ContainerHeader>
      <Styled.ContainerBody>
        {listArrItems.length > 0 ? (
          <ListGrid filter={filter}
            listArrItems={listArrItems}
            listId={listId} />
        ) : (
          <EmptyList mensage="Você não tem nenhum item na lista" />
        )}
      </Styled.ContainerBody>
    </Styled.Container>
  );
}
