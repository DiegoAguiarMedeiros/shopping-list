import { useColorScheme, Animated } from "react-native";
import Colors from "../../../../constants/Colors";
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
import {
  getTags,
  getTagsFromListItemInterface,
  getTotalAmount,
  getTotalAmountUn,
  removeUndefinedFromArray,
} from "../../../../utils/functions";
import { Swipeable } from "react-native-gesture-handler";
import { Title, Text, Title2 } from "../../../../components/Text";
import {
  useShoppingListContext,
} from "../../../../context/ShoppingList";
import { IProduct } from "../../../../Domain/Model/IProduct";
import getAmountByListProductUuidController from "../../../../Domain/UseCases/Amount/GetAmountByListProductUuid";
import getTotalQuantityAmountByListUuidController from "../../../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import getTotlaAmountByListProductUuidController from "../../../../Domain/UseCases/Amount/GetTotalAmountByListProductUuid";
import getTotalQuantityAmountByListProductUuidController from "../../../../Domain/UseCases/Amount/GetTotalQuantityAmountByListProductUuid";
import GridItem from "../../../../components/GridItem";
import { GridItemInner, GridItemWrapperCol, GridItemWrapperRow } from "../../../../components/GridItemInner";
import ContainerInner from "../../../../components/ContainerInner";
import Container from "../../../../components/Container";

interface ListProps {
  item: IProduct;
  listId: string;
}

function ListGridItem({ item, listId }: Readonly<ListProps>) {
  const colorScheme = useColorScheme();

  const { getTheme } = useShoppingListContext();
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
          underlayColor={Colors[getTheme()].itemListBackgroundUnderlay}
          borderColor={Colors[getTheme()].itemListBackgroundBorder}
          background={Colors[getTheme()].itemListBackground}
          height={60}
          row
          elevation={colorScheme === "light"}
        >
          <GridItemWrapperCol width={100}>
            <Title2 color={Colors[getTheme()].text}>{item.name}</Title2>
          </GridItemWrapperCol>
        </GridItemInner>
      ) : (
        listArrItems.map((amount) => (
          <GridItemInner
            underlayColor={Colors[getTheme()].itemListBackgroundUnderlay}
            borderColor={Colors[getTheme()].itemListBackgroundBorder}
            background={Colors[getTheme()].itemListBackground}
            height={60}
            row
            elevation={colorScheme === "light"}
            key={`ContainerListItemListItem-` + amount.uuid}
          >
            <>
              <GridItemWrapperCol width={60} height={100}>
                <Title2 color={Colors[getTheme()].text}>{item.name}</Title2>
              </GridItemWrapperCol>
              <GridItemWrapperCol width={40} height={100}>
                <GridItemWrapperRow height={100}>
                  <GridItemWrapperCol width={50} height={100}>
                    <Text color={Colors[getTheme()].text}>
                      {`${amount.quantity}`} {amount.type ? `Kg` : `Un`}
                      {" x"}
                    </Text>
                  </GridItemWrapperCol>
                  <GridItemWrapperCol width={50} height={100}>
                    <Text color={Colors[getTheme()].text} align="right">
                      R$ {Number(amount.amount).toFixed(2).replace(".", ",")}
                    </Text>
                    <Styled.ContainerItemTextPriceTotalLine
                      border={Colors[getTheme()].primary}
                    />
                    <Styled.ContainerItemTextPriceTotal>
                      <Text
                        color={Colors[getTheme()].itemProductListAveragePrice}
                        align="right"
                      >
                        R${" "}
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
