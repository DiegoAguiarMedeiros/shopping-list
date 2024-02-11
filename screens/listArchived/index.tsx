import { TouchableHighlight, useColorScheme } from "react-native";

import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
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
import I18n from "i18n-js";
type TotalType = {
  amount: number;
  un: number;
};

interface ListProps {
  listId: string;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
}

export default function ListArchived({
  listId,
  setActiveRouteHeader,
}: ListProps) {
  const colorScheme = useColorScheme();
  const { listArchived, getTheme, getColor } = useShoppingListContext();
  const listArr = listArchived.find((i) => i.uuid === listId);
  const [filter, setFilter] = useState("Todos");

  const listArrItems = getListProductController.handle(
    listArr?.items ? listArr?.items : []
  );
  const router = useRouter();

  const returnToTags = () => {
    router.push({ pathname: "/history" });
  };

  useEffect(() => {
    setActiveRouteHeader({
      left: (
        <TouchableHighlight
          underlayColor={getColor().primary}
          style={{ marginLeft: 20, marginRight: 10 }}
          onPress={() => returnToTags()}
        >
          <FontAwesome name="angle-left" size={35} color={getColor().white} />
        </TouchableHighlight>
      ),
      name: <Title color={getColor().white}>{listArr?.name!}</Title>,
      right: null,
    });
  }, []);

  return (
    <Container background={getColor().backgroundPrimary} noPadding>
      <ContainerInner
        justify="center"
        background={getColor().backgroundPrimary}
      >
        {listArrItems.length > 0 ? (
          <ListGrid
            filter={filter}
            listArrItems={listArrItems}
            listId={listId}
          />
        ) : (
          <EmptyList mensage={I18n.t("noItemsInTheList")} />
        )}
      </ContainerInner>
    </Container>
  );
}
