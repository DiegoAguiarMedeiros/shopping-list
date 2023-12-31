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
import { Title, Text } from "../../../../components/Text";
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

function ListGridItem({ item, listId }: ListProps) {
  const colorScheme = useColorScheme();
  const { listProductArchived } = useShoppingListContext();

  const listIditemuuid = `${listId}-${item.uuid}`;

  const listArrItems = getAmountByListProductUuidController.handle(listIditemuuid);
  const total = getTotlaAmountByListProductUuidController.handle(listIditemuuid);
  const quantity = getTotalQuantityAmountByListProductUuidController.handle(listIditemuuid);

  return (
    <>
      {quantity == 0 ? (
        <GridItemInner
          underlayColor={Colors[colorScheme ?? "light"].grayScaleTertiary}
          borderColor={
            Colors[colorScheme ?? "light"].grayScaleSecondary
          }
          background={Colors[colorScheme ?? "light"].grayScaleSecondary}
          height={60}
          row
        >
          <Title
            color={Colors[colorScheme ?? "light"].text}
          >
            {item.name}
          </Title>
        </GridItemInner>
      ) : (
        listArrItems.map((amount) => (
          <GridItemInner
            underlayColor={Colors[colorScheme ?? "light"].grayScaleTertiary}
            borderColor={
              Colors[colorScheme ?? "light"].grayScaleSecondary
            }
            background={Colors[colorScheme ?? "light"].grayScaleSecondary}
            height={60}
            row

            key={`ContainerListItemListItem-` + amount.uuid}
          >
            <>
              <GridItemWrapperCol width={65} height={100} >
                <Title
                  color={Colors[colorScheme ?? "light"].text}
                >
                  {item.name}
                </Title>
              </GridItemWrapperCol>
              <GridItemWrapperCol width={30} height={100} >
                <GridItemWrapperRow height={100} >
                  <GridItemWrapperCol width={50} height={100} >
                    <Text
                      color={Colors[colorScheme ?? "light"].text}
                    >
                      {`${quantity} ${item.unit}`}
                      {" x"}
                    </Text>
                  </GridItemWrapperCol>
                  <GridItemWrapperCol width={50} height={100} >
                    <Text
                      color={Colors[colorScheme ?? "light"].text}
                    >
                      R$ {amount.amount}
                    </Text>
                    <Styled.ContainerItemTextPriceTotalLine
                      border={Colors[colorScheme ?? "light"].primary}
                    />
                    <Styled.ContainerItemTextPriceTotal>
                      <Text color={Colors[colorScheme ?? "light"].primary}>
                        R${" "}
                        {total}
                      </Text>
                    </Styled.ContainerItemTextPriceTotal>
                  </GridItemWrapperCol>
                </GridItemWrapperRow>
              </GridItemWrapperCol>
            </>
          </GridItemInner >
        ))
      )
      }
    </>
  );
}

export default React.memo(ListGridItem);
