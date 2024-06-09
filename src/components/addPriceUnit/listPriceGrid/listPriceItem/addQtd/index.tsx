import * as Styled from "./styles";
import Button from "./Button";
import InputText from "./InputText";
import { useShoppingListContext } from "../../../../../context/ShoppingList";

import IAmount from "../../../../../Model/IAmount";
import { colorTheme } from "../../../../../../constants/Colors";
import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
interface ListPriceGridProps {
  amountItem: IAmount;
  selectedValueSwitch: boolean;
  newItemAmount: IAmount;
  setNewItemAmount: React.Dispatch<React.SetStateAction<IAmount>>;
  color: colorTheme;
  handleUpdateListArrItems: (amount: IAmount) => void;
  totalUpdate: (total: number, amount: number, un: number) => void;
  filter: string;
}

export default function ListPriceGrid({
  amountItem,
  selectedValueSwitch,
  newItemAmount,
  setNewItemAmount,
  color,
  handleUpdateListArrItems,
  totalUpdate,
  filter,
}: Readonly<ListPriceGridProps>) {
  const {
    changeAmountQuantity,
    handleAmountInputChange,
    getTotalAmountByListUuid,
    getTotalQuantityAmountByListUuid,
    getTotalQuantityWithoutAmountByListUuid,
  } = useShoppingListContext();

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
      const updatedList = changeAmountQuantity(
        String(Number(amountItem.quantity) - 1),
        amountItem.uuid
      );
      setNewItemAmount(updatedList);
      handleUpdateListArrItems(updatedList);
      totalUpdate(
        getTotalAmountByListUuid(
          amountItem.listProductUuid.slice(0, 36),
          filter
        ),
        getTotalQuantityAmountByListUuid(
          amountItem.listProductUuid.slice(0, 36),
          filter
        ),
        getTotalQuantityWithoutAmountByListUuid(
          amountItem.listProductUuid.slice(0, 36),
          filter
        )
      );
    }
  };
  const plusAmount = (): void => {
    const updatedList = changeAmountQuantity(
      String(Number(amountItem.quantity) + 1),
      amountItem.uuid
    );
    setNewItemAmount(updatedList);
    handleUpdateListArrItems(updatedList);
    totalUpdate(
      getTotalAmountByListUuid(amountItem.listProductUuid.slice(0, 36), filter),
      getTotalQuantityAmountByListUuid(
        amountItem.listProductUuid.slice(0, 36),
        filter
      ),
      getTotalQuantityWithoutAmountByListUuid(
        amountItem.listProductUuid.slice(0, 36),
        filter
      )
    );
  };

  const handleInputChange = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    const { key } = event.nativeEvent;
    if (/^[\d.]$/.test(key) || key === "Backspace") {
      if (key === "Backspace") {
        const updatedList = handleAmountInputChange(
          formatInput(newItemAmount?.quantity.slice(0, -1)),
          amountItem.uuid
        );
        setNewItemAmount(updatedList);
      } else {
        const updatedList = handleAmountInputChange(
          formatInput(newItemAmount?.quantity + key),
          amountItem.uuid
        );
        setNewItemAmount(updatedList);
      }
    }

    totalUpdate(
      getTotalAmountByListUuid(amountItem.listProductUuid.slice(0, 36), filter),
      getTotalQuantityAmountByListUuid(
        amountItem.listProductUuid.slice(0, 36),
        filter
      ),
      getTotalQuantityWithoutAmountByListUuid(
        amountItem.listProductUuid.slice(0, 36),
        filter
      )
    );
  };

  return (
    <Styled.Container>
      {selectedValueSwitch ? (
        <InputText
          color={color}
          radius={true}
          keyboardType="decimal-pad"
          placeholder="0.000"
          onKeyPress={(event) => handleInputChange(event)}
          value={newItemAmount?.quantity}
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
              color={color}
              radius={false}
              placeholder="Valor"
              value={newItemAmount?.quantity}
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
