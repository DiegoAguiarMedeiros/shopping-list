import { useColorScheme } from "react-native";
import Colors from "../../../../constants/Colors";
import * as Styled from "./styles";
import { useEffect, useState, lazy } from "react";
import {
  ItemAmountInterface,
  ItemInterface,
  ListItemAmountInterface,
} from "../../../../types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import InputText from "../../../../components/InputText";
import Switch from "../../../../components/Switch";
import AddQtd from "./addQtd";
import {
  useShoppingListArchivedContext,
  useShoppingListContext,
} from "../../../../context/ShoppingList";

interface ListProps {
  itemAmount: ItemAmountInterface;
  listItemId: string;
}

export default function ListPriceGrid({ itemAmount, listItemId }: ListProps) {
  const {
    listArchived,
    setListArchived,
    setListItemArchived,
    listItemArchived,
    itemAmountListArchived,
    setItemAmountListArchived,
  } = useShoppingListArchivedContext();
  const [selectedValueSwitch, setSelectedValueSwitch] = useState(false);
  const listArrItems =
    listItemArchived[Array.isArray(listItemId) ? "" : listItemId];
  const colorScheme = useColorScheme();

  return (
    <Styled.Container>
      <Styled.ContainerPrice>
        <Styled.Price text={Colors[colorScheme ?? "light"].textButton}>
          R$ {itemAmount.amount}
        </Styled.Price>
      </Styled.ContainerPrice>
      <Styled.Price text={Colors[colorScheme ?? "light"].textButton}>
        {selectedValueSwitch ? "Kg" : "Un"}
      </Styled.Price>
      <Styled.ContainerQtd>
        <AddQtd
          amountId={itemAmount.uuid}
          selectedValueSwitch={selectedValueSwitch}
        />
      </Styled.ContainerQtd>
    </Styled.Container>
  );
}
