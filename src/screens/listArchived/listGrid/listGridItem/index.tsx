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
import { colorTheme } from "../../../../../constants/Colors";

interface ListProps {
  item: IProduct;
  listId: string;
  color: colorTheme;
}

function ListGridItem({ item, listId, color }: Readonly<ListProps>) {
  const colorScheme = useColorScheme();

  const { getCurrency, getAmountByListProductUuid } = useShoppingListContext();
  const listIditemuuid = `${listId}-${item.uuid}`;

  const listArrItems = getAmountByListProductUuid(listIditemuuid);
  return (
    <>
      {listArrItems.length == 0 ? (
        <GridItemInner
          underlayColor={color.itemListBackgroundUnderlay}
          borderColor={color.itemListBackgroundBorder}
          background={color.itemListBackground}
          height={60}
          row
          elevation={colorScheme === "light"}
        >
          <GridItemWrapperCol width={100}>
            <Title2 color={color.text}>{item.name}</Title2>
          </GridItemWrapperCol>
        </GridItemInner>
      ) : (
        listArrItems.map((amount) => (
          <GridItemInner
            underlayColor={color.itemListBackgroundUnderlay}
            borderColor={color.itemListBackgroundBorder}
            background={color.itemListBackground}
            height={60}
            row
            elevation={colorScheme === "light"}
            key={`ContainerListItemListItem-` + amount.uuid}
          >
            <>
              <GridItemWrapperCol width={60} height={100}>
                <Title2 color={color.text}>{item.name}</Title2>
              </GridItemWrapperCol>
              <GridItemWrapperCol width={40} height={100}>
                <GridItemWrapperRow height={100}>
                  <GridItemWrapperCol width={50} height={100}>
                    <Text color={color.text}>
                      {`${amount.quantity}`} {amount.type ? `Kg` : `Un`}
                      {" x"}
                    </Text>
                  </GridItemWrapperCol>
                  <GridItemWrapperCol width={50} height={100}>
                    <Text color={color.text} align="right">
                      {getCurrency()}{" "}
                      {Number(amount.amount).toFixed(2).replace(".", ",")}
                    </Text>
                    <Styled.ContainerItemTextPriceTotalLine
                      border={color.primary}
                    />
                    <Styled.ContainerItemTextPriceTotal>
                      <Text
                        color={color.itemProductListAveragePrice}
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
