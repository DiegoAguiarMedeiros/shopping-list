import { useColorScheme, ScrollView, SafeAreaView } from "react-native";
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
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { GridItemWrapperInner, GridItemWrapperRow } from "../../components/GridItemInner";

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

  const calcHeight = (items: number): number => {
    if (items === 0) {
      return 3;
    }
    if (items === 1) {
      return 62;
    }
    if (items === 2) {
      return 74;
    }
    if (items === 3) {
      return 80.5;
    }
    if (items >= 4) {
      return 84;
    }
    return 50;
  };

  const heights = [3, 62, 74, 80, 84];

  return (
    <Container noPadding>
      <ContainerInner>

        <GridItemWrapperRow height={heights[listArrItems.length >= 4 ? 4 : listArrItems.length]} >
          {listArrItems.length > 0 ? (
            <ListPriceGrid
              item={listArrItems}
              key={"ListPriceGrid-" + listProductUuid}
            />
          ) : (
            <></>
          )}
        </GridItemWrapperRow>
        <GridItemWrapperRow height={100} maxHeight={40}>
          <GridItemWrapperInner width={85} height={100}>
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
          </GridItemWrapperInner>
          <GridItemWrapperInner width={15} height={100}>
            <Button
              radius
              icon="send"
              background={
                Colors[colorScheme ?? "light"].buttonActiveBackgroundColor
              }
              onPress={handleAddAmount}
            />
          </GridItemWrapperInner>


        </GridItemWrapperRow>

      </ContainerInner>
    </Container>
  );
}
