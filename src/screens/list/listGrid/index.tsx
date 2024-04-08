import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { ItemInterface, TagsIterface } from "../../../types/types";
import ListGridItem from "./listGridItem";
import { useShoppingListContext } from "../../../context/ShoppingList";
import { Text } from "../../../components/Text";

import Button from "../../../components/Button";

import { BottomSheetProps } from "../../../components/BottomSheet";
import BottomSheet from "../../../components/BottomSheet";
import { removeUndefinedFromArray } from "../../../utils/functions";
import { IProduct } from "../../../Model/IProduct";
import Container from "../../../components/Container";
import ContainerInner from "../../../components/ContainerInner";
import {
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../components/GridItemInner";
import I18n from "i18n-js";
interface ListProps {
  listId: string;
  listArrItems: IProduct[];
}

function ListGrid({ listArrItems, listId }: Readonly<ListProps>) {
  const { getTheme, getCurrency, getColor } = useShoppingListContext();

  const [active, setActive] = useState("");

  const colorScheme = useColorScheme();
  const totalQuantity = getTotalQuantityAmountByListUuidController.handle(
    listId,
    listArrItems
  );
  const total = getTotalAmountByListProductUuidController.handle(
    listId,
    listArrItems
  );

  const handleOpen = (uuid: string) => {
    setActive(uuid);
  };
  const handleClose = () => {
    setActive("");
  };

  return (
    <Container background={"transparent"}>
      <ContainerInner>
        <GridItemWrapperRow height={90}>
          <SafeAreaView style={{ flex: 1, width: "100%" }}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
              nestedScrollEnabled
            >
              {listArrItems.map((item: IProduct) => (
                <ListGridItem
                  key={"ListGridItem-" + item.uuid}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  item={item}
                  listId={listId}
                  active={active}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </GridItemWrapperRow>
        <GridItemWrapperRow height={10}>
          <GridItemWrapperInner width={50} height={100} justify="flex-start">
            <Text color={getColor().text}>
              {I18n.t("totalItems")}: {totalQuantity}
            </Text>
          </GridItemWrapperInner>
          <GridItemWrapperInner width={50} height={100} justify="flex-start">
            <Text color={getColor().text} align="right">
              {I18n.t("total")}: {getCurrency()}{" "}
              {total.toFixed(2).replace(".", ",")}
            </Text>
          </GridItemWrapperInner>
        </GridItemWrapperRow>
      </ContainerInner>
    </Container>
  );
}

export default React.memo(ListGrid);
