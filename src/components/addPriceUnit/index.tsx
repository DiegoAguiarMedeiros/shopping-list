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
  filter: string;
  listArrAmountItems: IAmount[];
  color: colorTheme;
  setListArrAmountItems: React.Dispatch<React.SetStateAction<IAmount[]>>;
  totalUpdate: (total: number, amount: number, un: number) => void;
}

export default function AddPriceUnit({
  listProductUuid,
  color,
  listArrAmountItems,
  setListArrAmountItems,
  totalUpdate,
  filter,
}: Readonly<AddPriceUnitProps>) {
  const {
    handleAddAmount,
    getTotalAmountByListUuid,
    getTotalQuantityAmountByListUuid,
    getTotalQuantityWithoutAmountByListUuid,
  } = useShoppingListContext();
  const [newItem, setNewItem] = useState("");
  const addAmount = (): void => {
    if (newItem != "") {
      const newAmount = handleAddAmount(newItem, listProductUuid);
      setListArrAmountItems((prev) => [...prev, newAmount]);
      setNewItem("");

      totalUpdate(
        getTotalAmountByListUuid(listProductUuid.slice(0, 36), filter),
        getTotalQuantityAmountByListUuid(listProductUuid.slice(0, 36), filter),
        getTotalQuantityWithoutAmountByListUuid(
          listProductUuid.slice(0, 36),
          filter
        )
      );
    }
  };

  const heights = [3, 62, 74, 80, 84];

  return (
    <Container noPadding>
      <ContainerInner>
        <GridItemWrapperRow
          height={
            heights[
              listArrAmountItems.length >= 4 ? 4 : listArrAmountItems.length
            ]
          }
        >
          {listArrAmountItems.length > 0 ? (
            <ListPriceGrid
              filter={filter}
              totalUpdate={totalUpdate}
              setListArrAmountItems={setListArrAmountItems}
              color={color}
              item={listArrAmountItems}
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
                setNewItem(valor.replace(",", "."));
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
