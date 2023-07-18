import {
  useColorScheme,
  SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Switch as RNSwitch,
} from "react-native";
import Colors from "../../../../../constants/Colors";
import * as Styled from "./styles";
import { useEffect, useState } from "react";
import Button from "./Button";
import { Link } from "expo-router";
import InputText from "./InputText";
import Select from "../../../../../components/InputSelect";
import Switch from "../../../../../components/Switch";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useShoppingListContext } from "../../../../../context/ShoppingList";
import {
  ItemAmountInterface,
  ListItemAmountInterface,
} from "../../../../../types/types";

interface ListPriceGridProps {
  amountId: string;
  selectedValueSwitch: boolean;
}

export default function ListPriceGrid({
  amountId,
  selectedValueSwitch,
}: ListPriceGridProps) {
  const colorScheme = useColorScheme();
  const { itemAmountList, setItemAmountList } = useShoppingListContext();
  const [newItemAmount, setNewItemAmount] = useState<ItemAmountInterface>(
    itemAmountList[Array.isArray(amountId) ? "" : amountId!]
  );

  const formatInput = (list: string) => {
    // Remove any non-digit characters from the input
    const numericValue = (
      Number(list.replace(/\D/g, "").replace(".", "")) / 1000
    ).toFixed(3);
    return numericValue;
  };

  const minusAmount = (): void => {
    const updatedList: ListItemAmountInterface = JSON.parse(
      JSON.stringify(itemAmountList)
    );
    const newItemAMount: ItemAmountInterface = updatedList[newItemAmount.uuid];
    if (newItemAMount && Number(newItemAmount.quantity) > 1) {
      newItemAMount.quantity = String(Number(newItemAmount.quantity) - 1);
      setNewItemAmount(newItemAMount);
      setItemAmountList(updatedList);
    }
  };
  const plusAmount = (): void => {
    const updatedList: ListItemAmountInterface = JSON.parse(
      JSON.stringify(itemAmountList)
    );
    const newItemAMount: ItemAmountInterface = updatedList[newItemAmount.uuid];
    if (newItemAMount) {
      newItemAMount.quantity = String(Number(newItemAmount.quantity) + 1);
      setNewItemAmount(newItemAMount);
      setItemAmountList(updatedList);
    }
  };

  const handleInputChange = () => {
    const updatedList: ListItemAmountInterface = JSON.parse(
      JSON.stringify(newItemAmount)
    );
    const newItemAMount: ItemAmountInterface = updatedList[newItemAmount.uuid];
    if (newItemAMount) {
      const formattedValue = formatInput(newItemAmount.quantity);
      newItemAMount.quantity = formattedValue;
      setNewItemAmount(newItemAMount);
      setItemAmountList(updatedList);
    }
  };

  return (
    <Styled.Container>
      {selectedValueSwitch ? (
        <InputText
          keyboardType="decimal-pad"
          placeholder="0.000"
          onChangeText={handleInputChange}
          value={newItemAmount.quantity}
        />
      ) : (
        <>
          <Styled.ContainerMinusPlus>
            <Button
              icon="minus"
              invertSide={true}
              background={Colors[colorScheme ?? "light"].buttonBackground}
              onPress={minusAmount}
            />
          </Styled.ContainerMinusPlus>
          <Styled.ContainerQtd>
            <InputText placeholder="Valor" value={newItemAmount.quantity} />
          </Styled.ContainerQtd>
          <Styled.ContainerMinusPlus>
            <Button
              icon="plus"
              background={Colors[colorScheme ?? "light"].buttonBackground}
              onPress={plusAmount}
            />
          </Styled.ContainerMinusPlus>
        </>
      )}
    </Styled.Container>
  );
}
