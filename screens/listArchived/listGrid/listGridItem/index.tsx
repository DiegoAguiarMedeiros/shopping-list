import { useColorScheme, Animated } from "react-native";
import Colors from "../../../../constants/Colors";
import * as Styled from "./styles";
import React, { lazy, useState } from "react";
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
import { Title } from "../../../../components/Text";
import {
  useShoppingListArchivedContext,
  useShoppingListContext,
} from "../../../../context/ShoppingList";

const AddPriceUnit = lazy(() => import("../../../addPriceUnitArchived"));

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
          underlayColor={
            Colors[colorScheme ?? "light"].backgroundTouchableHighlight
          }
          background={Colors[colorScheme ?? "light"].backgroundLighterActive}
        >
          <>
            <Styled.ContainerListItemListItemHead>
              <Styled.ContainerItemTextTitle>
                <Title>{item.name}</Title>
              </Styled.ContainerItemTextTitle>
            </Styled.ContainerListItemListItemHead>
            <Styled.ContainerListItemListItemBody>
              <Styled.ContainerItemTextPriceTotal
                text={Colors[colorScheme ?? "light"].textButton}
              >
                Total: R$ {itemAmountListArchived[amount].amount}
              </Styled.ContainerItemTextPriceTotal>
              <Styled.ContainerItemTextPriceTotal
                text={Colors[colorScheme ?? "light"].textButton}
              >
                {itemAmountListArchived[amount].quantity}
                {itemAmountListArchived[amount].type ? " Kg" : " Unidades"}
              </Styled.ContainerItemTextPriceTotal>
            </Styled.ContainerListItemListItemBody>
          </>
        </Styled.ContainerListItemListItem>
      ))}
    </>
  );
}

export default React.memo(ListGridItem);
