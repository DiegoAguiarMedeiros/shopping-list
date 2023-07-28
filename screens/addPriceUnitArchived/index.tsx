import { useColorScheme, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import { lazy, useState } from "react";
import { ItemAmountInterface, ItemInterface } from "../../types/types";
import {
  useShoppingListArchivedContext,
  useShoppingListContext,
} from "../../context/ShoppingList";
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
  const { listItemArchived, setListItemArchived, setItemAmountListArchived } =
    useShoppingListArchivedContext();
  const [newItem, setNewItem] = useState("");
  const colorScheme = useColorScheme();

  const listArrItems =
    listItemArchived[Array.isArray(listItemId) ? "" : listItemId];
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
    </Styled.Container>
  );
}
