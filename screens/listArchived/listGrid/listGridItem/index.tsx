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
  useShoppingListArchivedContext,
  useShoppingListContext,
} from "../../../../context/ShoppingList";

interface ListProps {
  item: ItemInterface;
  listId: string;
}

function ListGridItem({ item, listId }: ListProps) {
  const colorScheme = useColorScheme();
  const { itemAmountListArchived } = useShoppingListArchivedContext();

  return (
    <>
      {item.amount.map((amount) => (
        <Styled.ContainerListItemListItem
          key={`ContainerListItemListItem-` + amount}
          underlayColor={Colors[colorScheme ?? "light"].listItemBackgroundColor}
          background={
            Colors[colorScheme ?? "light"].listItemBackgroundColor
          }
        >
          <>
            <Styled.ContainerListItemListItemHead>
              <Styled.ContainerItemTextTitle>
                <Title dark={colorScheme !== "dark"}>{item.name}</Title>
              </Styled.ContainerItemTextTitle>
            </Styled.ContainerListItemListItemHead>
            <Styled.ContainerListItemListItemBody>
              <Styled.ContainerItemTextPriceTotal
                text={Colors[colorScheme ?? "light"].bodyTextColor}
              >
                <Text dark={colorScheme !== "dark"}>
                  Total: R$ {itemAmountListArchived[amount].amount}
                </Text>
              </Styled.ContainerItemTextPriceTotal>
              <Styled.ContainerItemTextPriceTotal
                text={Colors[colorScheme ?? "light"].bodyTextColor}
              >
                <Text dark={colorScheme !== "dark"}>
                  {itemAmountListArchived[amount].quantity}
                  {itemAmountListArchived[amount].type ? " Kg" : " Unidades"}
                </Text>
              </Styled.ContainerItemTextPriceTotal>
            </Styled.ContainerListItemListItemBody>
          </>
        </Styled.ContainerListItemListItem>
      ))}
    </>
  );
}

export default React.memo(ListGridItem);
