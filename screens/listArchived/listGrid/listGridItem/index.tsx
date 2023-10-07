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
      {item.amount.length == 0 ? (
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
        item.amount.map((amount) => (
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
                    {itemAmountListArchived[amount].type
                      ? `${Number(
                          itemAmountListArchived[amount].quantity
                        ).toFixed(2)} Kg`
                      : `${itemAmountListArchived[amount].quantity} Un`}
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
                      R$ {itemAmountListArchived[amount].amount}
                    </Text>
                  </Styled.ContainerItemTextPriceTotal>
                  <Styled.ContainerItemTextPriceTotalLine
                    border={Colors[colorScheme ?? "light"].primary}
                  />
                  <Styled.ContainerItemTextPriceTotal>
                    <Text color={Colors[colorScheme ?? "light"].primary}>
                      R${" "}
                      {itemAmountListArchived[amount].type
                        ? (
                            Number(itemAmountListArchived[amount].amount) *
                            Number(itemAmountListArchived[amount].quantity)
                          ).toFixed(2)
                        : itemAmountListArchived[amount].amount}
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
