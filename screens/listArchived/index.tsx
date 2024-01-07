import { TouchableOpacity, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import {
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
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import Header from "../../components/Header";
type TotalType = {
  amount: number;
  un: number;
};

interface ListProps {
  listId: string;
  setActiveRouteHeader: React.Dispatch<React.SetStateAction<{
    name: React.ReactNode;
    left: React.ReactNode | null;
    right: React.ReactNode | null;
  }>>
}

export default function ListArchived({ listId, setActiveRouteHeader }: ListProps) {
  const colorScheme = useColorScheme();
  const {
    listArchived
  } = useShoppingListContext();
  const listArr = listArchived.find((i) => i.uuid === listId);
  const [filter, setFilter] = useState("Todos");

  const listArrItems = getListProductController.handle(listArr?.items ? listArr?.items : []);
  const router = useRouter();

  const returnToTags = () => {
    router.push({ pathname: "/history" })
  }

  useEffect(() => {
    setActiveRouteHeader({
      left: <TouchableOpacity style={{ marginLeft: 20, marginRight: 10 }} onPress={() => returnToTags()}>
        <FontAwesome
          name="angle-left"
          size={35}
          color={Colors[colorScheme ?? "light"].white}
        />
      </TouchableOpacity>,
      name: <Title color={Colors[colorScheme ?? "light"].white}>
        {listArr?.name!}
      </Title>,
      right: null,
    });
  }, [])

  return (
    <Container
      background={Colors[colorScheme ?? "light"].backgroundPrimary}
      noPadding
    >
      <ContainerInner
        justify="center"
        background={Colors[colorScheme ?? "light"].backgroundPrimary}>
        {listArrItems.length > 0 ? (
          <ListGrid filter={filter}
            listArrItems={listArrItems}
            listId={listId} />
        ) : (
          <EmptyList mensage="Você não tem nenhum item na lista" />
        )}
      </ContainerInner>
    </Container>
  );
}
