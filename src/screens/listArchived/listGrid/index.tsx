import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import {
  BottomSheetProps,
  ItemInterface,
  ListInterface,
} from "../../../types/types";
import ListGridItem from "./listGridItem";
import { removeUndefinedFromArray } from "../../../utils/functions";
import { useShoppingListContext } from "../../../context/ShoppingList";

import { Text } from "../../../components/Text";
import { IProduct } from "../../../Model/IProduct";
import ContainerInner from "../../../components/ContainerInner";
import Container from "../../../components/Container";
import {
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../components/GridItemInner";
import I18n from "i18n-js";
interface ListProps {
  listArrItems: IProduct[];
  filter: string;
  listId: string;
}

function ListGrid({ listId, listArrItems }: Readonly<ListProps>) {
  const colorScheme = useColorScheme();

  const { getTheme, getCurrency, getColor } = useShoppingListContext();

  const total = getTotalAmountByListUuidController.handle(listId);
  return (
    <Container background={"transparent"}>
      <ContainerInner>
        <GridItemWrapperRow height={95}>
          <SafeAreaView style={{ width: "100%" }}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={[{ height: "100%" }]}
              nestedScrollEnabled
            >
              {listArrItems.map((item: IProduct) => (
                <ListGridItem
                  key={"ListGridItem-" + item.uuid}
                  item={item}
                  listId={listId}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </GridItemWrapperRow>
        <GridItemWrapperRow height={5}>
          <GridItemWrapperCol width={50} height={100}>
            <GridItemWrapperInner height={100}>
              <Text color={getColor().text}>
                {I18n.t("items")}:{" "}
                {getTotalQuantityAmountByListUuidController.handle(listId)}
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={50} height={100}>
            <GridItemWrapperInner height={100}>
              <Text color={getColor().text} align="right">
                {I18n.t("total")}: {getCurrency()}{" "}
                {total.toFixed(2).replace(".", ",")}
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
        </GridItemWrapperRow>
      </ContainerInner>
    </Container>
  );
}

export default React.memo(ListGrid);
