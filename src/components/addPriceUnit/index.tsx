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

interface AddPriceUnitProps {
  amounts: IAmount[];
  listProductUuid: string;
}

export default function AddPriceUnit({
  listProductUuid,
  amounts,
}: Readonly<AddPriceUnitProps>) {
  const { AmountRepository, ProductRepository, ConfigRepository } = useStores();
  const [newItem, setNewItem] = useState("");

  const addAmount = (): void => {
    if (newItem != "") {
      setNewItem("");
      const newAmount: IAmount = {
        uuid: String(UUIDGenerator.v4()),
        amount: newItem,
        type: false,
        quantity: "1",
      };
      AmountRepository.addItem(listProductUuid, newAmount);
      ProductRepository.load();
      ProductRepository.updateTotal();
      ProductRepository.updateTotalUn();
      ProductRepository.updateTotalWithAmount();
      ProductRepository.updateTotalWithoutAmount();
    }
  };

  const heights = [3, 62, 74, 80, 84];

  return (
    <Container noPadding>
      <ContainerInner>
        <GridItemWrapperRow
          height={heights[amounts.length >= 4 ? 4 : amounts.length]}
        >
          {amounts.length > 0 ? (
            <ListPriceGrid
              listProductUuid={listProductUuid}
              item={amounts}
              key={"ListPriceGrid-" + listProductUuid}
            />
          ) : (
            <></>
          )}
        </GridItemWrapperRow>
        <GridItemWrapperRow height={100} maxHeight={40}>
          <GridItemWrapperInner width={88} height={100}>
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
          <GridItemWrapperInner width={15} height={100}>
            <Button
              border={ConfigRepository.color.itemListItemOpenButtonSendBorder}
              radius
              icon="send"
              background={ConfigRepository.color.itemListItemOpenButtonSendBackGround}
              textColor={ConfigRepository.color.itemListItemOpenButtonSendText}
              onPress={addAmount}
            />
          </GridItemWrapperInner>
        </GridItemWrapperRow>
      </ContainerInner>
    </Container>
  );
}
