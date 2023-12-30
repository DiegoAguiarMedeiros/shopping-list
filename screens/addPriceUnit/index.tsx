import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import InputText from "../../components/InputText";
import Button from "../../components/Button";
import ListPriceGrid from "./listPriceGrid";
import IAmount from "../../Domain/Model/IAmount";
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
}: Readonly<AddPriceUnitProps>) {
  const { handleAddAmount } = useShoppingListContext();
  const [newItem, setNewItem] = useState("");
  const colorScheme = useColorScheme();

  const addAmount = (): void => {
    if (newItem != "") {
      handleAddAmount(newItem, listProductUuid);
      setNewItem("");
    }
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
              onSubmitEditing={addAmount}
            />
          </GridItemWrapperInner>
          <GridItemWrapperInner width={15} height={100}>
            <Button
              radius
              icon="send"
              background={
                Colors[colorScheme ?? "light"].buttonActiveBackgroundColor
              }
              onPress={addAmount}
            />
          </GridItemWrapperInner>


        </GridItemWrapperRow>

      </ContainerInner>
    </Container>
  );
}
