import * as Styled from "./styles";
import Button from "./Button";
import InputText from "./InputText";
import { useShoppingListContext } from "../../../../../context/ShoppingList";

import IAmount from "../../../../../Model/IAmount";
import { colorTheme } from "../../../../../../constants/Colors";
interface ListPriceGridProps {
  amountItem: IAmount;
  selectedValueSwitch: boolean;
  newItemAmount: IAmount;
  setNewItemAmount: React.Dispatch<React.SetStateAction<IAmount>>;
  color: colorTheme;
  handleUpdateListArrItems: (amount: IAmount) => void;
}

export default function ListPriceGrid({
  amountItem,
  selectedValueSwitch,
  newItemAmount,
  setNewItemAmount,
  color,
  handleUpdateListArrItems,
}: Readonly<ListPriceGridProps>) {
  const { changeAmountQuantity, handleAmountInputChange } =
    useShoppingListContext();

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
    }
  };
  const plusAmount = (): void => {
    const updatedList = changeAmountQuantity(
      String(Number(amountItem.quantity) + 1),
      amountItem.uuid
    );
    setNewItemAmount(updatedList);
    handleUpdateListArrItems(updatedList);
  };

  const handleInputChange = (value: string) => {
    const updatedList = handleAmountInputChange(
      formatInput(value),
      amountItem.uuid
    );
    setNewItemAmount(updatedList);
  };

  return (
    <Styled.Container>
      {selectedValueSwitch ? (
        <InputText
          color={color}
          radius={true}
          keyboardType="decimal-pad"
          placeholder="0.000"
          onChangeText={(value) => handleInputChange(value)}
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
