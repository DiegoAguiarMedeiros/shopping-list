import * as Styled from "./styles";
import Button from "./Button";
import InputText from "./InputText";
import { useShoppingListContext } from "../../../../../context/ShoppingList";

import IAmount from "../../../../../Model/IAmount";
import { colorTheme } from "../../../../../../constants/Colors";
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
} from "react-native";
import { useStores } from "../../../../../context/StoreContext";
import { useEffect, useState } from "react";
interface ListPriceGridProps {
  amountItem: IAmount;
  listProductUuid: string;
  selectedValueSwitch: boolean;
  newItemAmount: IAmount;
  setNewItemAmount: React.Dispatch<React.SetStateAction<IAmount>>;
  color: colorTheme;
  handleUpdateListArrItems: (amount: IAmount) => void;
  totalUpdate: (total: number, amount: number, un: number) => void;
}

export default function ListPriceGrid({
  amountItem,
  selectedValueSwitch,
  newItemAmount,
  setNewItemAmount,
  color,
  handleUpdateListArrItems,
  totalUpdate,
  listProductUuid,
}: Readonly<ListPriceGridProps>) {
  const { AmountRepository, ProductRepository } = useStores();
  const [quantity, setQuantity] = useState("1");

  console.log("ListPriceGrid", amountItem.quantity);

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

  useEffect(() => {
    setQuantity(amountItem.quantity);
    console.log("amountItem.quantity", amountItem.quantity);
    if (amountItem.quantity == "0" || amountItem.quantity == "")
      setQuantity("1");
  }, [amountItem.quantity]);

  const minusAmount = (): void => {
    if (Number(amountItem.quantity) > 1) {
      AmountRepository.changeAmountQuantity(
        String(Number(amountItem.quantity) - 1),
        listProductUuid,
        amountItem.uuid
      );
      ProductRepository.load();
      ProductRepository.updateTotal();
      ProductRepository.updateTotalUn();
      ProductRepository.updateTotalWithAmount();
      ProductRepository.updateTotalWithoutAmount();
    }
  };
  const plusAmount = (): void => {
    if (Number(amountItem.quantity) < 99) {
      AmountRepository.changeAmountQuantity(
        String(Number(amountItem.quantity) + 1),
        listProductUuid,
        amountItem.uuid
      );
      ProductRepository.load();
      ProductRepository.updateTotal();
      ProductRepository.updateTotalUn();
      ProductRepository.updateTotalWithAmount();
      ProductRepository.updateTotalWithoutAmount();
    }
  };

  const handleDecimalInputChange = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    const { key } = event.nativeEvent;
    if (/^[\d.]$/.test(key) || key === "Backspace") {
      const formatedNumber =
        key === "Backspace"
          ? formatInput(quantity.slice(0, -1))
          : formatInput(quantity + key);

      if (Number(formatedNumber) < 100) {
        AmountRepository.changeAmountQuantity(
          formatedNumber,
          listProductUuid,
          amountItem.uuid
        );
      }

        if (Number(formatedNumber) < 100) {
          ProductRepository.load();
          ProductRepository.updateTotal();
          ProductRepository.updateTotalUn();
          ProductRepository.updateTotalWithAmount();
          ProductRepository.updateTotalWithoutAmount();
        }
    }

    // totalUpdate();
  };
  const handleInputChange = (value: string) => {
    // const { key } = event.nativeEvent;
    // if (/^[\d]$/.test(key) || key === "Backspace") {
    // if (key === "Backspace") {
    //   AmountRepository.changeAmountQuantity(
    //     quantity.slice(0, -1),
    //     listProductUuid,
    //     amountItem.uuid
    //   );
    // } else {
    if (Number(value) < 100) {
      AmountRepository.changeAmountQuantity(
        value.replace(/\D/g, ""),
        listProductUuid,
        amountItem.uuid
      );
      // }
      ProductRepository.load();
      ProductRepository.updateTotal();
      ProductRepository.updateTotalUn();
      ProductRepository.updateTotalWithAmount();
      ProductRepository.updateTotalWithoutAmount();
    }
    // }

    // totalUpdate();
  };

  return (
    <Styled.Container>
      {selectedValueSwitch ? (
        <InputText
          color={color}
          radius={true}
          keyboardType="decimal-pad"
          placeholder="0.000"
          onKeyPress={(event) => handleDecimalInputChange(event)}
          value={quantity}
        />
      ) : (
        <>
          <Styled.ContainerMinusPlus>
            <Button
              color={color}
              icon="minus"
              invertSide={true}
              onPress={minusAmount}
            />
          </Styled.ContainerMinusPlus>
          <Styled.ContainerQtd>
            <InputText
              keyboardType="decimal-pad"
              onChangeText={(value) => handleInputChange(value)}
              color={color}
              radius={false}
              placeholder="Valor"
              value={quantity}
              style={{ fontSize: quantity.length > 3 ? 14 : 18 }}
            />
          </Styled.ContainerQtd>
          <Styled.ContainerMinusPlus>
            <Button color={color} icon="plus" onPress={plusAmount} />
          </Styled.ContainerMinusPlus>
        </>
      )}
    </Styled.Container>
  );
}
