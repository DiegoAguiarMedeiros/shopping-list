import { useColorScheme } from "react-native";

import { useEffect, useState } from "react";
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
import { useLocalStore } from "mobx-react-lite";
import { useStores } from "../../context/StoreContext";
import UUIDGenerator from "react-native-uuid";
import { Text } from "../Text";

interface AddPriceUnitProps {
  amounts: IAmount[];
  itemsQTY: string;
  listProductUuid: string;
}

export default function AddPriceUnit({
  listProductUuid,
  amounts,
  itemsQTY
}: Readonly<AddPriceUnitProps>) {
  const { AmountRepository, ProductRepository, ConfigRepository } = useStores();
  const [newItem, setNewItem] = useState("");


  const addAmount = (): void => {
    if (newItem != "") {
      setNewItem("");

      // Remove empty placeholder amount if present
      const emptyPlaceholder = amounts.find(a => !a.amount || a.amount === "" || a.amount === "0");
      if (emptyPlaceholder) {
        AmountRepository.removeItem(listProductUuid, emptyPlaceholder.uuid);
      }

      const newAmount: IAmount = {
        uuid: String(UUIDGenerator.v4()),
        amount: newItem,
        type: !itemsQTY.includes('.'),
        quantity: itemsQTY,
      };
      AmountRepository.addItem(listProductUuid, newAmount);
      ProductRepository.load();
      ProductRepository.updateTotal();
      ProductRepository.updateTotalUn();
      ProductRepository.updateTotalWithAmount();
      ProductRepository.updateTotalWithoutAmount();
    }
  };

  const validAmounts = amounts.filter((a) => a.amount && a.amount !== "");
  const heights = [3, 62, 124, 164, 214];
  const amountCount = validAmounts.length;
  const useScroll = amountCount > 4;
  return (
    <Container noPadding>
      <ContainerInner>
        <GridItemWrapperRow
          {...(useScroll
            ? { maxHeight: 214 }
            : { height: heights[amountCount] })}
        >
          {validAmounts.length > 0 ? (
            <ListPriceGrid
              listProductUuid={listProductUuid}
              item={validAmounts}
              key={"ListPriceGrid-" + listProductUuid}
            />
          ) : (
            <></>
          )}
        </GridItemWrapperRow>
        <GridItemWrapperRow maxHeight={40}>
          <GridItemWrapperInner width="78%" height="100%">
            <InputText
              background={ConfigRepository.color.backgroundPrimary}
              color={ConfigRepository.color.textSecondary}
              placeholderTextColor={ConfigRepository.color.textSecondary}
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
          <GridItemWrapperInner width="22%" height="100%">
            <Button
              style={{
                width: "100%",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
              minWidth={0}
              radius={false}
              icon="send"
              textColor={ConfigRepository.color.itemListItemOpenButtonSendText}
              onPress={addAmount}
            />
          </GridItemWrapperInner>
        </GridItemWrapperRow>
      </ContainerInner>
    </Container>
  );
}
