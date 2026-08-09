import { Keyboard, NativeSyntheticEvent, TextInputKeyPressEvent, TextInputKeyPressEventData, useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import {
  ItemAmountInterface,
  ItemInterface,
  ListItemAmountInterface,
} from "../../../../types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Text } from "../../../../components/Text";
import IAmount from "../../../../Model/IAmount";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../../components/GridItemInner";
import { colorTheme } from "../../../../../constants/Colors";
import { useStores } from "../../../../context/StoreContext";
import QuantitySelector from "../../../QuantitySelector";
import product from "../../../../../app/product";
import { formatInput } from "../../../../utils/functions";

interface ListProps {
  itemAmount: IAmount;
  listProductUuid: string;
}

export default function ListPriceGrid({
  itemAmount,
  listProductUuid,
}: Readonly<ListProps>) {

  const { AmountRepository, ProductRepository, ConfigRepository } = useStores();
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

  const deleteAmountInList = (): void => {
    AmountRepository.removeItem(listProductUuid, itemAmount.uuid);
    ProductRepository.load();
    ProductRepository.updateTotal();
    ProductRepository.updateTotalUn();
    ProductRepository.updateTotalWithAmount();
    ProductRepository.updateTotalWithoutAmount();
  };

  const onDecrement = (): void => {
    if (Number(itemAmount.quantity) > 1) {
      AmountRepository.changeAmountQuantity(
        String(Number(itemAmount.quantity) - 1),
        listProductUuid,
        itemAmount.uuid
      );
      ProductRepository.load();
      ProductRepository.updateTotal();
      ProductRepository.updateTotalUn();
      ProductRepository.updateTotalWithAmount();
      ProductRepository.updateTotalWithoutAmount();
    }
  };
  const onIncrement = (): void => {
    if (Number(itemAmount.quantity) < 99) {
      AmountRepository.changeAmountQuantity(
        String(Number(itemAmount.quantity) + 1),
        listProductUuid,
        itemAmount.uuid
      );
      ProductRepository.load();
      ProductRepository.updateTotal();
      ProductRepository.updateTotalUn();
      ProductRepository.updateTotalWithAmount();
      ProductRepository.updateTotalWithoutAmount();
    }
  };

  const handleDecimalInputChange = (
    event: TextInputKeyPressEvent
  ) => {
    const { key } = event.nativeEvent;
    if (/^[\d.]$/.test(key) || key === "Backspace") {
      const formatedNumber =
        key === "Backspace"
          ? formatInput(itemAmount.quantity.slice(0, -1))
          : formatInput(itemAmount.quantity + key);

      if (Number(formatedNumber) < 100) {
        AmountRepository.changeAmountQuantity(
          formatedNumber,
          listProductUuid,
          itemAmount.uuid
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

  };

    const handleInputChange = (value: string) => {
    if (Number(value) < 100) {
      AmountRepository.changeAmountQuantity(
        value.replace(/\D/g, ""),
        listProductUuid,
        itemAmount.uuid
      );
      ProductRepository.load();
      ProductRepository.updateTotal();
      ProductRepository.updateTotalUn();
      ProductRepository.updateTotalWithAmount();
      ProductRepository.updateTotalWithoutAmount();
    }
  };

  useEffect(() => {
    setSelectedValueSwitch(itemAmount.type);
  }, [itemAmount.type]);

  return (
    <GridItemInner
      underlayColor={ConfigRepository.color.backgroundPrimary}
      height={40}
      noPadding
    >
      <GridItemWrapperRow>
        <GridItemWrapperInner width="20%">
          <Text color={ConfigRepository.color.itemListItemOpenTextSecondary} align="center">
            {ConfigRepository.currency}{" "}
            {Number(itemAmount.amount).toFixed(2).replace(".", ",")}
          </Text>
        </GridItemWrapperInner>
        <GridItemWrapperInner width="60%">
          <QuantitySelector
            value={itemAmount.quantity}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
            onChangeText={handleInputChange}
            type={itemAmount.type}
            handleDecimalInputChange={handleDecimalInputChange}
            editItemsAmount={editItemsAmount}
            TextInputBackgoundColor={ConfigRepository.color.backgroundPrimary}
          />
        </GridItemWrapperInner>
        <GridItemWrapperInner width="20%">
          <FontAwesome
            size={28}
            style={{ marginBottom: -3 }}
            name={"trash"}
            color={ConfigRepository.color.itemListItemOpenTrashIcon}
            onPress={deleteAmountInList}
          />
        </GridItemWrapperInner>
      </GridItemWrapperRow>
    </GridItemInner>
  );
}
