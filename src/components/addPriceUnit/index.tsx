import { useColorScheme } from "react-native";

import { useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import InputText from "../../components/InputText";
import Button from "../../components/Button";
import ListPriceGrid from "./listPriceGrid";
import IAmount from "../../Model/IAmount";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import {
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../components/GridItemInner";
import { colorTheme } from "../../../constants/Colors";

interface AddPriceUnitProps {
  listProductUuid: string;
  listArrItems: IAmount[];
  color: colorTheme;
  setListArrItems: React.Dispatch<React.SetStateAction<IAmount[]>>;
}

export default function AddPriceUnit({
  listProductUuid,
  color,
  listArrItems,
  setListArrItems,
}: Readonly<AddPriceUnitProps>) {
  const { handleAddAmount } = useShoppingListContext();
  const [newItem, setNewItem] = useState("");

  const addAmount = (): void => {
    if (newItem != "") {
      const newAmount = handleAddAmount(newItem, listProductUuid);
      setListArrItems((prev) => [...prev, newAmount]);
      setNewItem("");
    }
  };

  const heights = [3, 62, 74, 80, 84];

  return (
    <Container noPadding>
      <ContainerInner>
        <GridItemWrapperRow
          height={heights[listArrItems.length >= 4 ? 4 : listArrItems.length]}
        >
          {listArrItems.length > 0 ? (
            <ListPriceGrid
              setListArrItems={setListArrItems}
              color={color}
              item={listArrItems}
              key={"ListPriceGrid-" + listProductUuid}
            />
          ) : (
            <></>
          )}
        </GridItemWrapperRow>
        <GridItemWrapperRow height={100} maxHeight={40}>
          <GridItemWrapperInner width={88} height={100}>
            <InputText
              background={color.backgroundPrimary}
              color={color.textSecondary}
              placeholderTextColor={color.textSecondary}
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
              border={color.itemListItemOpenButtonSendBorder}
              radius
              icon="send"
              background={color.itemListItemOpenButtonSendBackGround}
              textColor={color.itemListItemOpenButtonSendText}
              onPress={addAmount}
            />
          </GridItemWrapperInner>
        </GridItemWrapperRow>
      </ContainerInner>
    </Container>
  );
}
