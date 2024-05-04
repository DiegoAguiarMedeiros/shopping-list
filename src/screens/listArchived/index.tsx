import { TouchableHighlight, useColorScheme } from "react-native";

import React, { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import EmptyList from "../../components/EmptyList";
import ListGrid from "./listGrid";
import { Title } from "../../components/Text";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { IProduct } from "../../Model/IProduct";
import { IList } from "../../Model/IList";
type TotalType = {
  amount: number;
  un: number;
};

interface ListProps {
  list: IList;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
  color: colorTheme;
}

export default function ListArchived({
  list,
  setActiveRouteHeader,
  color,
}: Readonly<ListProps>) {
  const { getProductByUuid } = useShoppingListContext();
  const [filter, setFilter] = useState("Todos");

  const listArrItems: IProduct[] = [];
  list.items.forEach((i: string) => {
    const result = getProductByUuid(i);
    if (result) listArrItems.push(result);
  });
  const router = useRouter();

  const returnToTags = () => {
    router.push({ pathname: "/history" });
  };

  useEffect(() => {
    setActiveRouteHeader({
      left: (
        <TouchableHighlight
          underlayColor={color.primary}
          style={{ marginLeft: 20, marginRight: 10 }}
          onPress={() => returnToTags()}
        >
          <FontAwesome name="angle-left" size={35} color={color.white} />
        </TouchableHighlight>
      ),
      name: <Title color={color.white}>{list?.name!}</Title>,
      right: null,
    });
  }, []);

  return (
    <Container background={color.backgroundPrimary} noPadding>
      <ContainerInner justify="center" background={color.backgroundPrimary}>
        {listArrItems.length > 0 ? (
          <ListGrid
            color={color}
            filter={filter}
            listArrItems={listArrItems}
            listId={list.uuid}
          />
        ) : (
          <EmptyList color={color} mensage={I18n.t("noItemsInTheList")} />
        )}
      </ContainerInner>
    </Container>
  );
}
