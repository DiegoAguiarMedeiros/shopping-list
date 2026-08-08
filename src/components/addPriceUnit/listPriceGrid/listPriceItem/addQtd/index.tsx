import { StyleSheet, View, TextInput } from 'react-native';
import QuantitySelector from "../../../../QuantitySelector";

import IAmount from "../../../../../Model/IAmount";
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
}

export default function ListPriceGrid({
  amountItem,
  selectedValueSwitch,
  listProductUuid,
}: Readonly<ListPriceGridProps>) {
  const { AmountRepository, ProductRepository, ConfigRepository } = useStores();
  const [quantity, setQuantity] = useState("1");
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
    <View style={styles.container}>
      {selectedValueSwitch ? (
        <TextInput
          style={{
            backgroundColor: ConfigRepository.color.backgroundPrimary,
            textAlign: "center",
            width: "100%",
            height: 28,
            marginHorizontal: 6,
            borderRadius: 10,
            fontSize: 14,
            padding: 0,
          }}
          keyboardType="decimal-pad"
          placeholder="0.000"
          onKeyPress={(event) => handleDecimalInputChange(event)}
          value={quantity}
        />
      ) : (
        <QuantitySelector
          value={quantity}
          onDecrement={minusAmount}
          onIncrement={plusAmount}
          onChangeText={(value) => handleInputChange(value)}
          keyboardType="decimal-pad"
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
});