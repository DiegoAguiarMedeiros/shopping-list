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
}

export default function ListArchived({ listId }: ListProps) {
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

  return (
    <Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
      noPadding
    >
      <>
        <Header
          background={Colors[colorScheme ?? "light"].headerBackgroundColor}
          left={<TouchableOpacity onPress={() => returnToTags()}>
            <FontAwesome
              name="angle-left"
              size={35}
              color={Colors[colorScheme ?? "light"].white}
            />
          </TouchableOpacity>}

          title={<Title color={Colors[colorScheme ?? "light"].white}>
            {listArr?.name}
          </Title>} />


        <ContainerInner
          justify="center"
          background={Colors[colorScheme ?? "light"].bodyBackgroundColor}>
          {listArrItems.length > 0 ? (
            <ListGrid filter={filter}
              listArrItems={listArrItems}
              listId={listId} />
          ) : (
            <EmptyList mensage="Você não tem nenhum item na lista" />
          )}
        </ContainerInner>
      </>
    </Container>
  );
}
