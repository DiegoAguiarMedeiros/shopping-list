import { Keyboard, useColorScheme } from "react-native";
import Colors from "../../../../constants/Colors";
import * as Styled from "./styles";
import { useEffect, useState } from "react";
import {
  ItemAmountInterface,
  ItemInterface,
  ListItemAmountInterface,
} from "../../../../types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Text } from "../../../../components/Text";
import Switch from "../../../../components/Switch";
import AddQtd from "./addQtd";
import { useShoppingListContext } from "../../../../context/ShoppingList";
import IAmount from "../../../../Domain/Model/IAmount";
import deleteAmountByUuidController from "../../../../Domain/UseCases/Amount/DeleteAmountByUuid";
import saveAmountByUuidController from "../../../../Domain/UseCases/Amount/SaveAmountByUuid";
import Container from "../../../../components/Container";
import { GridItemInner, GridItemWrapperCol, GridItemWrapperInner, GridItemWrapperRow } from "../../../../components/GridItemInner";

interface ListProps {
  itemAmount: IAmount;
  listItemId: string;
}

export default function ListPriceGrid({ itemAmount, listItemId }: ListProps) {
  const {
    handleEditItemsAmount,
    handleDeleteAmountInList
  } = useShoppingListContext();
  const [selectedValueSwitch, setSelectedValueSwitch] = useState(
    itemAmount.type
  );
  const [newItemAmount, setNewItemAmount] = useState<IAmount>(
    itemAmount
  );

  const colorScheme = useColorScheme();

  const editItemsAmount = (): void => {
    handleEditItemsAmount(itemAmount.uuid, !selectedValueSwitch);
    const updatedList: IAmount = JSON.parse(
      JSON.stringify(itemAmount)
    );
    updatedList.type = !selectedValueSwitch;
    updatedList.quantity = "1";
    setSelectedValueSwitch(!selectedValueSwitch);
    setNewItemAmount(updatedList);
    saveAmountByUuidController.handle(updatedList)
  };

  const deleteAmountInList = (): void => {
    handleDeleteAmountInList(itemAmount.uuid);
    Keyboard.dismiss();
  };


  return (
    <GridItemInner
      underlayColor={Colors[colorScheme ?? "light"].backgroundPrimary}
      height={40}
      noPadding
    >
      <GridItemWrapperRow height={100} >
        <GridItemWrapperInner width={20} height={100}>
          <Text
            color={
              colorScheme !== "dark"
                ? Colors[colorScheme ?? "light"].black
                : Colors[colorScheme ?? "light"].white
            }
            align="center"
          >
            R$ {Number(itemAmount.amount).toFixed(2).replace(".", ",")}
          </Text>
        </GridItemWrapperInner>
        <GridItemWrapperInner width={30} height={100}>
          <AddQtd
            amountItem={itemAmount}
            selectedValueSwitch={selectedValueSwitch}
            newItemAmount={newItemAmount}
            setNewItemAmount={setNewItemAmount}
          />
        </GridItemWrapperInner>
        <GridItemWrapperInner width={30} height={100}>
          <Switch
            value={selectedValueSwitch}
            onValueChange={editItemsAmount}
            label={{ on: "Kg", off: "Un" }}
          />
        </GridItemWrapperInner>
        <GridItemWrapperInner width={20} height={100} >
          <FontAwesome
            size={28}
            style={{ marginBottom: -3 }}
            name={"trash"}
            color={Colors[colorScheme ?? "light"].itemListItemOpenTrashIcon}
            onPress={deleteAmountInList}
          />
        </GridItemWrapperInner>
      </GridItemWrapperRow>
    </GridItemInner>
  );
}
