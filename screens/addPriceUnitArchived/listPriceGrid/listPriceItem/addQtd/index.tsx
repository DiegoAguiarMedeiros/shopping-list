import {
  useColorScheme,
  SafeAreaView,
  ScrollView,
  GestureResponderEvent,
  Switch as RNSwitch,
} from "react-native";
import Colors from "../../../../../constants/Colors";
import * as Styled from "./styles";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import Select from "../../../../../components/InputSelect";
import Switch from "../../../../../components/Switch";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  useShoppingListArchivedContext,
  useShoppingListContext,
} from "../../../../../context/ShoppingList";
import {
  ItemAmountInterface,
  ListItemAmountInterface,
} from "../../../../../types/types";

interface ListPriceGridProps {
  amountId: string;
  selectedValueSwitch: boolean;
}

export default function ListPriceGrid({
  amountId,
  selectedValueSwitch,
}: ListPriceGridProps) {
  const colorScheme = useColorScheme();
  const { itemAmountListArchived, setItemAmountListArchived } =
    useShoppingListArchivedContext();
  const [newItemAmount, setNewItemAmount] = useState<ItemAmountInterface>(
    itemAmountListArchived[Array.isArray(amountId) ? "" : amountId!]
  );

  return (
    <Styled.Container>
      <Styled.TextQtd text={Colors[colorScheme ?? "light"].textButton}>{newItemAmount.quantity}</Styled.TextQtd>
    </Styled.Container>
  );
}
