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
  setListArrAmountItems: React.Dispatch<React.SetStateAction<IAmount[]>>;
  totalUpdate: (total: number, amount: number, un: number) => void;
  filter: string;
}

export default function ListPriceGrid({
  itemAmount,
  color,
  setListArrAmountItems,
  totalUpdate,
  filter,
}: Readonly<ListProps>) {
  const {
    handleEditItemsAmount,
    handleDeleteAmountInList,
    getCurrency,
    getTotalAmountByListUuid,
    getTotalQuantityAmountByListUuid,
    getTotalQuantityWithoutAmountByListUuid,
  } = useShoppingListContext();
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
  };

  const handleUpdateListArrItems = (amount: IAmount): void => {
    setListArrAmountItems((prev) =>
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
    setListArrAmountItems((prev) =>
      prev.filter((p) => p.uuid !== itemAmount.uuid)
    );
    Keyboard.dismiss();
    totalUpdate(
      getTotalAmountByListUuid(itemAmount.listProductUuid.slice(0, 36), filter),
      getTotalQuantityAmountByListUuid(
        itemAmount.listProductUuid.slice(0, 36),
        filter
      ),
      getTotalQuantityWithoutAmountByListUuid(
        itemAmount.listProductUuid.slice(0, 36),
        filter
      )
    );
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
            filter={filter}
            totalUpdate={totalUpdate}
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
