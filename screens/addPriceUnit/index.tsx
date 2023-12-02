import { useColorScheme, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import { useState } from "react";
import { ItemAmountInterface, ItemInterface } from "../../types/types";
import { useShoppingListContext } from "../../context/ShoppingList";
import UUIDGenerator from "react-native-uuid";

import InputText from "../../components/InputText";
import Button from "../../components/Button";
import ListPriceGrid from "./listPriceGrid";
import IAmount from "../../Domain/Model/IAmount";
import saveAmountByUuidController from "../../Domain/UseCases/Amount/SaveAmountByUuid";
import getAmountByListProductUuidController from "../../Domain/UseCases/Amount/GetAmountByListProductUuid";

interface AddPriceUnitProps {
  listProductUuid: string;
  listArrItems: IAmount[];
}

export default function AddPriceUnit({
  listArrItems,
  listProductUuid
}: AddPriceUnitProps) {
  const { amount, setAmount } = useShoppingListContext();
  const [newItem, setNewItem] = useState("");
  const colorScheme = useColorScheme();
  // const listArrItems = listItem[Array.isArray(listItemId) ? "" : listItemId];
  const returnNewItemAmount = (): IAmount => {
    const item: IAmount = {
      uuid: String(UUIDGenerator.v4()),
      amount: newItem,
      type: false,
      quantity: "1",
      listProductUuid
    };
    return item;
  };

  const handleAddAmount = (): void => {
    const newListItem = returnNewItemAmount();
    saveAmountByUuidController.handle(newListItem);
    amount ?
      setAmount([newListItem, ...amount]) :
      setAmount([newListItem]);
    setNewItem("");
  };

  const handleAddAmountInListItem = (amountItemId: string): void => {
    // const updatedList: ItemInterface = JSON.parse(JSON.stringify(listArrItems));
    // updatedList.amount.push(amountItemId);
    // setListItem((newValue) => ({
    //   ...newValue,
    //   [updatedList.uuid]: updatedList,
    // }));
  };

  console.log("listArrItems.length", listArrItems.length)

  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyAddPriceBackgroundColor}
    >
      {listArrItems.length > 0 ? (
        <Styled.WrapperGrid>
          <ScrollView nestedScrollEnabled>
            <Styled.WrapperGridInner>
              <ListPriceGrid
                item={listArrItems}
                key={"ListPriceGrid-" + listProductUuid}
              />
            </Styled.WrapperGridInner>
          </ScrollView>
        </Styled.WrapperGrid>
      ) : (
        <></>
      )}

      <Styled.WrapperInput>
        <Styled.WrapperInputInner>
          <InputText
            radius
            placeholder="Valor"
            onChangeText={(valor) => {
              setNewItem(valor);
            }}
            keyboardType="numeric"
            value={newItem}
            onSubmitEditing={handleAddAmount}
          />
        </Styled.WrapperInputInner>
        <Styled.WrapperButton>
          <Button
            radius
            icon="send"
            background={
              Colors[colorScheme ?? "light"].buttonActiveBackgroundColor
            }
            onPress={handleAddAmount}
          />
        </Styled.WrapperButton>
      </Styled.WrapperInput>
    </Styled.Container>
  );
}
