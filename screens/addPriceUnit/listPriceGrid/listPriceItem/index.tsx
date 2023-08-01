import { useColorScheme } from "react-native";
import Colors from "../../../../constants/Colors";
import * as Styled from "./styles";
import { useEffect, useState } from "react";
import {
  ItemAmountInterface,
  ItemInterface,
  ListItemAmountInterface,
} from "../../../../types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import InputText from "../../../../components/InputText";
import Switch from "../../../../components/Switch";
import AddQtd from "./addQtd";
import { useShoppingListContext } from "../../../../context/ShoppingList";

interface ListProps {
  itemAmount: ItemAmountInterface;
  listItemId: string;
}

export default function ListPriceGrid({ itemAmount, listItemId }: ListProps) {
  const {
    list,
    setList,
    setListItem,
    listItem,
    itemAmountList,
    setItemAmountList,
  } = useShoppingListContext();
  const [selectedValueSwitch, setSelectedValueSwitch] = useState(
    itemAmount.type
  );
  const listArrItems = listItem[Array.isArray(listItemId) ? "" : listItemId];
  const colorScheme = useColorScheme();
  const handleDeleteAmountInList = (): void => {
    const updatedList: ListItemAmountInterface = JSON.parse(
      JSON.stringify(itemAmountList)
    );
    const deleteID = JSON.parse(JSON.stringify(itemAmount.uuid));
    delete updatedList[deleteID];
    setItemAmountList(updatedList);
    handleDeleteAmountFromItemList();
  };

  const handleDeleteAmountFromItemList = (): void => {
    const updatedList: ItemInterface = JSON.parse(JSON.stringify(listArrItems));
    const newArray = updatedList.amount.filter(
      (item) => item !== itemAmount.uuid
    );
    updatedList.amount = newArray;
    setListItem((newValue) => ({
      ...newValue,
      [updatedList.uuid]: updatedList,
    }));
  };

  const handleEditItemsAmount = (): void => {
    const updatedList: ListItemAmountInterface = JSON.parse(
      JSON.stringify(itemAmountList)
    );
    const newItemAmount: ItemAmountInterface = updatedList[itemAmount.uuid];
    if (newItemAmount) {
      newItemAmount.type = !selectedValueSwitch;
      setSelectedValueSwitch(!selectedValueSwitch);
      setItemAmountList(updatedList);
    }
  };

  return (
    <Styled.Container>
      <Styled.ContainerPrice>
        <Styled.Price text={Colors[colorScheme ?? "light"].textButton}>
          R$ {itemAmount.amount}
        </Styled.Price>
      </Styled.ContainerPrice>
      <Styled.ContainerQtd>
        <AddQtd
          amountId={itemAmount.uuid}
          selectedValueSwitch={selectedValueSwitch}
        />
      </Styled.ContainerQtd>
      <Styled.ContainerInput>
        <Switch
          value={selectedValueSwitch}
          onValueChange={handleEditItemsAmount}
          label={{ on: "Kg", off: "Un" }}
        />
      </Styled.ContainerInput>
      <Styled.ContainerTrash>
        <FontAwesome
          size={28}
          style={{ marginBottom: -3 }}
          name={"trash"}
          color={Colors[colorScheme ?? "light"].primary}
          onPress={handleDeleteAmountInList}
        />
      </Styled.ContainerTrash>
    </Styled.Container>
  );
}
