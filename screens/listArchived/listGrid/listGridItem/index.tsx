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
        <Styled.ContainerListItemListItem
          key={`ContainerListItemListItem-` + item.uuid}
          underlayColor={Colors[colorScheme ?? "light"].listItemBackgroundColor}
          background={Colors[colorScheme ?? "light"].listItemBackgroundColor}
        >
          <Styled.ContainerListItemListItemInner>
            <Styled.ContainerListItemListItemHead>
              <Styled.ContainerItemTextTitle>
                <Title
                  color={
                    colorScheme !== "dark"
                      ? Colors[colorScheme ?? "light"].black
                      : Colors[colorScheme ?? "light"].white
                  }
                >
                  {item.name}
                </Title>
              </Styled.ContainerItemTextTitle>
            </Styled.ContainerListItemListItemHead>
          </Styled.ContainerListItemListItemInner>
        </Styled.ContainerListItemListItem>
      ) : (
        listArrItems.map((amount) => (
          <Styled.ContainerListItemListItem
            key={`ContainerListItemListItem-` + amount}
            underlayColor={
              Colors[colorScheme ?? "light"].listItemBackgroundColor
            }
            background={Colors[colorScheme ?? "light"].listItemBackgroundColor}
          >
            <Styled.ContainerListItemListItemInner>
              <Styled.ContainerListItemListItemHead>
                <Styled.ContainerItemTextTitle>
                  <Title
                    color={
                      colorScheme !== "dark"
                        ? Colors[colorScheme ?? "light"].black
                        : Colors[colorScheme ?? "light"].white
                    }
                  >
                    {item.name}
                  </Title>
                </Styled.ContainerItemTextTitle>
              </Styled.ContainerListItemListItemHead>
              <Styled.ContainerListItemListItemBody>
                <Styled.ContainerItemTextUn
                  text={Colors[colorScheme ?? "light"].bodyTextColor}
                >
                  <Text
                    color={
                      colorScheme !== "dark"
                        ? Colors[colorScheme ?? "light"].black
                        : Colors[colorScheme ?? "light"].white
                    }
                  >
                    {`${quantity} ${item.unit}`}
                    {" x"}
                  </Text>
                </Styled.ContainerItemTextUn>
                <Styled.ContainerItemTextPriceTotalContainer
                  text={Colors[colorScheme ?? "light"].bodyTextColor}
                >
                  <Styled.ContainerItemTextPriceTotal>
                    <Text
                      color={
                        colorScheme !== "dark"
                          ? Colors[colorScheme ?? "light"].black
                          : Colors[colorScheme ?? "light"].white
                      }
                    >
                      R$ {amount.amount}
                    </Text>
                  </Styled.ContainerItemTextPriceTotal>
                  <Styled.ContainerItemTextPriceTotalLine
                    border={Colors[colorScheme ?? "light"].primary}
                  />
                  <Styled.ContainerItemTextPriceTotal>
                    <Text color={Colors[colorScheme ?? "light"].primary}>
                      R${" "}
                      {total}
                    </Text>
                  </Styled.ContainerItemTextPriceTotal>
                </Styled.ContainerItemTextPriceTotalContainer>
              </Styled.ContainerListItemListItemBody>
            </Styled.ContainerListItemListItemInner>
          </Styled.ContainerListItemListItem>
        ))
      )}
    </>
  );
}

export default React.memo(ListGridItem);
