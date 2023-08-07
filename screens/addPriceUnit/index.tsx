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

interface AddPriceUnitProps {
  listId: string;
  listItemId: string;
}

export default function AddPriceUnit({
  listId,
  listItemId,
}: AddPriceUnitProps) {
  const { listItem, setListItem, setItemAmountList } = useShoppingListContext();
  const [newItem, setNewItem] = useState("");
  const colorScheme = useColorScheme();

  const listArrItems = listItem[Array.isArray(listItemId) ? "" : listItemId];
  const returnNewItemAmount = (): ItemAmountInterface => {
    const item: ItemAmountInterface = {
      uuid: String(UUIDGenerator.v4()),
      amount: newItem,
      type: false,
      quantity: "1",
    };
    return item;
  };

  const handleAddAmount = (): void => {
    const newListItem = returnNewItemAmount();
    setItemAmountList((newValue) => ({
      ...newValue,
      [newListItem.uuid]: newListItem,
    }));
    handleAddAmountInListItem(newListItem.uuid);
    setNewItem("");
  };

  const handleAddAmountInListItem = (amountItemId: string): void => {
    const updatedList: ItemInterface = JSON.parse(JSON.stringify(listArrItems));
    updatedList.amount.push(amountItemId);
    setListItem((newValue) => ({
      ...newValue,
      [updatedList.uuid]: updatedList,
    }));
  };

  return (
    <Styled.Container>
      {listArrItems.amount.length > 0 ? (
        <Styled.WrapperGrid>
          <ScrollView nestedScrollEnabled>
            <Styled.WrapperGridInner>
              <ListPriceGrid
                item={listArrItems}
                key={"ListPriceGrid-" + listArrItems.uuid}
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
            icon="send"
            background={Colors[colorScheme ?? "light"].buttonBackground}
            onPress={handleAddAmount}
          />
        </Styled.WrapperButton>
      </Styled.WrapperInput>
    </Styled.Container>
  );
}
