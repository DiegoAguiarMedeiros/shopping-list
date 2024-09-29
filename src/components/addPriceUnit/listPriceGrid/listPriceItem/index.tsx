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
import { useStores } from "../../../../context/StoreContext";

interface ListProps {
  itemAmount: IAmount;
  listProductUuid: string;
  color: colorTheme;
  totalUpdate: (total: number, amount: number, un: number) => void;
}

export default function ListPriceGrid({
  itemAmount,
  color,
  totalUpdate,
  listProductUuid,
}: Readonly<ListProps>) {
  const { getCurrency } = useShoppingListContext();

  const { AmountRepository, ProductRepository } = useStores();
  const [selectedValueSwitch, setSelectedValueSwitch] = useState(
    itemAmount.type
  );
  const [newItemAmount, setNewItemAmount] = useState<IAmount>(itemAmount);
  const editItemsAmount = (): void => {
    AmountRepository.changeAmountType(
      !selectedValueSwitch,
      listProductUuid,
      itemAmount.uuid
    );
    ProductRepository.load();
    ProductRepository.updateTotal();
    ProductRepository.updateTotalUn();
    ProductRepository.updateTotalWithAmount();
    ProductRepository.updateTotalWithoutAmount();
  };

  const handleUpdateListArrItems = (amount: IAmount): void => {};

  const deleteAmountInList = (): void => {
    AmountRepository.removeItem(listProductUuid, itemAmount.uuid);
    ProductRepository.load();
    ProductRepository.updateTotal();
    ProductRepository.updateTotalUn();
    ProductRepository.updateTotalWithAmount();
    ProductRepository.updateTotalWithoutAmount();
  };

  useEffect(() => {
    setSelectedValueSwitch(itemAmount.type);
  }, [itemAmount.type]);

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
            totalUpdate={totalUpdate}
            listProductUuid={listProductUuid}
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
