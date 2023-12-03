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

import IAmount from "../../../../../Domain/Model/IAmount";
import { IListInterface } from "../../../../../Domain/Model/IList";
import saveAmountByUuidController from "../../../../../Domain/UseCases/Amount/SaveAmountByUuid";
interface ListPriceGridProps {
  amountItem: IAmount;
  selectedValueSwitch: boolean;
  newItemAmount: IAmount;
  setNewItemAmount: React.Dispatch<React.SetStateAction<IAmount>>
}

export default function ListPriceGrid({
  amountItem,
  selectedValueSwitch,
  newItemAmount,
  setNewItemAmount
}: Readonly<ListPriceGridProps>) {
  const colorScheme = useColorScheme();
  const { amount, setAmount } = useShoppingListContext();

  const formatInput = (value: string): string => {
    let newValue = value.replace(".", "");
    let newValueNUmber = Number(newValue);
    newValue = String(newValueNUmber);
    if (newValue.length == 1) {
      newValue = "0.00" + newValue;
    } else if (newValue.length == 2) {
      newValue = "0.0" + newValue;
    } else if (newValue.length == 3) {
      newValue = "0." + newValue;
    } else if (newValue.length >= 4) {
      newValue = (Number(newValue) / 1000).toFixed(3);
    }
    return newValue;
  };

  const minusAmount = (): void => {
    if (Number(amountItem.quantity) > 1) {
      const updatedList: IAmount = JSON.parse(
        JSON.stringify(amountItem)
      );
      updatedList.quantity = String(Number(newItemAmount.quantity) - 1);
      const amountlist = amount.map(a => {
        if (a.uuid === updatedList.uuid) {
          return updatedList
        }
        return a
      })
      setNewItemAmount(updatedList);
      setAmount(amountlist);
      saveAmountByUuidController.handle(updatedList)
    }
  };
  const plusAmount = (): void => {
    const updatedList: IAmount = JSON.parse(
      JSON.stringify(amountItem)
    );
    updatedList.quantity = String(Number(newItemAmount.quantity) + 1);
    const amountlist = amount.map(a => {
      if (a.uuid === updatedList.uuid) {
        return updatedList
      }
      return a
    })
    setNewItemAmount(updatedList);
    setAmount(amountlist);
    saveAmountByUuidController.handle(updatedList)
  };

  const handleInputChange = (value: string) => {
    const updatedList: IAmount = JSON.parse(
      JSON.stringify(amountItem)
    );
    const formattedValue = formatInput(value);
    updatedList.quantity = formattedValue;
    const amountlist = amount.map(a => {
      if (a.uuid === updatedList.uuid) {
        return updatedList
      }
      return a
    })
    setNewItemAmount(updatedList);
    setAmount(amountlist);
    saveAmountByUuidController.handle(updatedList)

  };

  return (
    <Styled.Container>
      {selectedValueSwitch ? (
        <InputText
          radius={true}
          keyboardType="decimal-pad"
          placeholder="0.000"
          onChangeText={(value) => handleInputChange(value)}
          value={newItemAmount.quantity}
        />
      ) : (
        <>
          <Styled.ContainerMinusPlus>
            <Button
              icon="minus"
              invertSide={true}
              background={Colors[colorScheme ?? "light"].secondary}
              onPress={minusAmount}
            />
          </Styled.ContainerMinusPlus>
          <Styled.ContainerQtd>
            <InputText
              radius={false}
              placeholder="Valor"
              value={newItemAmount.quantity}
            />
          </Styled.ContainerQtd>
          <Styled.ContainerMinusPlus>
            <Button
              icon="plus"
              background={Colors[colorScheme ?? "light"].secondary}
              onPress={plusAmount}
            />
          </Styled.ContainerMinusPlus>
        </>
      )}
    </Styled.Container>
  );
}
