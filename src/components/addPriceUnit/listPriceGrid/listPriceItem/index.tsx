import { Keyboard, useColorScheme } from "react-native";
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
import IAmount from "../../../../Model/IAmount";
import Container from "../../../../components/Container";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../../components/GridItemInner";
import { colorTheme } from "../../../../../constants/Colors";

interface ListProps {
  itemAmount: IAmount;
  color: colorTheme;
  setListArrItems: React.Dispatch<React.SetStateAction<IAmount[]>>;
  filterUpdate: () => void;
}

export default function ListPriceGrid({
  itemAmount,
  color,
  setListArrItems,
  filterUpdate,
}: Readonly<ListProps>) {
  const { handleEditItemsAmount, handleDeleteAmountInList, getCurrency } =
    useShoppingListContext();
  const [selectedValueSwitch, setSelectedValueSwitch] = useState(
    itemAmount.type
  );
  const [newItemAmount, setNewItemAmount] = useState<IAmount>(itemAmount);

  const editItemsAmount = (): void => {
    handleEditItemsAmount(itemAmount.uuid, !selectedValueSwitch);
    const updatedList: IAmount = JSON.parse(JSON.stringify(itemAmount));
    updatedList.type = !selectedValueSwitch;
    updatedList.quantity = "1";
    setSelectedValueSwitch(!selectedValueSwitch);
    setNewItemAmount(updatedList);
    filterUpdate();
  };

  const handleUpdateListArrItems = (amount: IAmount): void => {
    setListArrItems((prev) =>
      prev.map((p) => {
        if (p.uuid === amount.uuid) {
          return amount;
        }
        return p;
      })
    );
  };

  const deleteAmountInList = (): void => {
    handleDeleteAmountInList(itemAmount.uuid);
    setListArrItems((prev) => prev.filter((p) => p.uuid !== itemAmount.uuid));
    Keyboard.dismiss();
    filterUpdate();
  };

  return (
    <GridItemInner
      underlayColor={color.backgroundPrimary}
      height={40}
      noPadding
    >
      <GridItemWrapperRow height={100}>
        <GridItemWrapperInner width={20} height={100}>
          <Text color={color.itemListItemOpenTextSecondary} align="center">
            {getCurrency()}{" "}
            {Number(itemAmount.amount).toFixed(2).replace(".", ",")}
          </Text>
        </GridItemWrapperInner>
        <GridItemWrapperInner width={30} height={100}>
          <AddQtd
            filterUpdate={filterUpdate}
            handleUpdateListArrItems={handleUpdateListArrItems}
            color={color}
            amountItem={itemAmount}
            selectedValueSwitch={selectedValueSwitch}
            newItemAmount={newItemAmount}
            setNewItemAmount={setNewItemAmount}
          />
        </GridItemWrapperInner>
        <GridItemWrapperInner width={30} height={100}>
          <Switch
            color={color}
            value={selectedValueSwitch}
            onValueChange={editItemsAmount}
            label={{ on: "Kg", off: "Un" }}
          />
        </GridItemWrapperInner>
        <GridItemWrapperInner width={20} height={100}>
          <FontAwesome
            size={28}
            style={{ marginBottom: -3 }}
            name={"trash"}
            color={color.itemListItemOpenTrashIcon}
            onPress={deleteAmountInList}
          />
        </GridItemWrapperInner>
      </GridItemWrapperRow>
    </GridItemInner>
  );
}
