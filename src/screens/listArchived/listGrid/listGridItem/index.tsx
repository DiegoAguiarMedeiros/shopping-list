import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";
import React, { useState } from "react";
import {
  BottomSheetProps,
  ItemAmountInterface,
  ItemInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../../../../types/types";
import { FontAwesome } from "@expo/vector-icons";

import { Swipeable } from "react-native-gesture-handler";
import { Title, Text, Title2 } from "../../../../components/Text";
import { useShoppingListContext } from "../../../../context/ShoppingList";
import { IProduct } from "../../../../Model/IProduct";
import GridItem from "../../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperRow,
} from "../../../../components/GridItemInner";
import ContainerInner from "../../../../components/ContainerInner";
import Container from "../../../../components/Container";

interface ListProps {
  item: IProduct;
  listId: string;
}

function ListGridItem({ item, listId }: Readonly<ListProps>) {
  const colorScheme = useColorScheme();

  const { getTheme, getCurrency, getColor } = useShoppingListContext();
  const listIditemuuid = `${listId}-${item.uuid}`;

  const listArrItems =
    getAmountByListProductUuidController.handle(listIditemuuid);
  const total =
    getTotlaAmountByListProductUuidController.handle(listIditemuuid);
  const quantity =
    getTotalQuantityAmountByListProductUuidController.handle(listIditemuuid);
  return (
    <>
      {listArrItems.length == 0 ? (
        <GridItemInner
          underlayColor={getColor().itemListBackgroundUnderlay}
          borderColor={getColor().itemListBackgroundBorder}
          background={getColor().itemListBackground}
          height={60}
          row
          elevation={colorScheme === "light"}
        >
          <GridItemWrapperCol width={100}>
            <Title2 color={getColor().text}>{item.name}</Title2>
          </GridItemWrapperCol>
        </GridItemInner>
      ) : (
        listArrItems.map((amount) => (
          <GridItemInner
            underlayColor={getColor().itemListBackgroundUnderlay}
            borderColor={getColor().itemListBackgroundBorder}
            background={getColor().itemListBackground}
            height={60}
            row
            elevation={colorScheme === "light"}
            key={`ContainerListItemListItem-` + amount.uuid}
          >
            <>
              <GridItemWrapperCol width={60} height={100}>
                <Title2 color={getColor().text}>{item.name}</Title2>
              </GridItemWrapperCol>
              <GridItemWrapperCol width={40} height={100}>
                <GridItemWrapperRow height={100}>
                  <GridItemWrapperCol width={50} height={100}>
                    <Text color={getColor().text}>
                      {`${amount.quantity}`} {amount.type ? `Kg` : `Un`}
                      {" x"}
                    </Text>
                  </GridItemWrapperCol>
                  <GridItemWrapperCol width={50} height={100}>
                    <Text color={getColor().text} align="right">
                      {getCurrency()}{" "}
                      {Number(amount.amount).toFixed(2).replace(".", ",")}
                    </Text>
                    <Styled.ContainerItemTextPriceTotalLine
                      border={getColor().primary}
                    />
                    <Styled.ContainerItemTextPriceTotal>
                      <Text
                        color={getColor().itemProductListAveragePrice}
                        align="right"
                      >
                        {getCurrency()}{" "}
                        {(Number(amount.quantity) * Number(amount.amount))
                          .toFixed(2)
                          .replace(".", ",")}
                      </Text>
                    </Styled.ContainerItemTextPriceTotal>
                  </GridItemWrapperCol>
                </GridItemWrapperRow>
              </GridItemWrapperCol>
            </>
          </GridItemInner>
        ))
      )}
    </>
  );
}

export default React.memo(ListGridItem);
