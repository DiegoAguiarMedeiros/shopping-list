import { TouchableHighlight } from "react-native";

import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import EmptyList from "../../components/EmptyList";
import ListGrid from "./listGrid";
import CircleProgress from "../../components/CircleProgress";
import FilterButtons from "../../components/FilterButtons";
import { Title } from "../../components/Text";

import Container from "../../components/Container";
import Header from "../../components/Header";
import ContainerInner from "../../components/ContainerInner";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { IList } from "../../Model/IList";
import { IProduct } from "../../Model/IProduct";
import { TotalType } from "../../types/types";

interface ListProps {
  list: IList;
  handleCloseBottomSheetList: () => void;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
  color: colorTheme;
  setList: React.Dispatch<React.SetStateAction<IList>>;
}

export default function List({
  list,
  handleCloseBottomSheetList,
  setActiveRouteHeader,
  color,
  setList,
}: Readonly<ListProps>) {
  return (
    <Container noPadding>
      <ContainerInner justify="center" background={color.backgroundPrimary}>
        {list.items.length > 0 ? (
          <ListGrid
            setActiveRouteHeader={setActiveRouteHeader}
            color={color}
            handleCloseBottomSheetList={handleCloseBottomSheetList}
            list={list}
            listId={list.uuid}
            setList={setList}
          />
        ) : (
          <EmptyList color={color} mensage={I18n.t("noItemsInTheList")} />
        )}
      </ContainerInner>
    </Container>
  );
}
