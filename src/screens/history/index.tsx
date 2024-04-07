import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";

import * as Styled from "./styles";
import Container from "../../components/Container";
import I18n from "i18n-js";
import { colorTheme } from "../../constants/Colors";

interface HistoryProps {
  color: colorTheme;
}

export default function History({ color }: HistoryProps) {
  const listArchived: any[] = [];
  return (
    <Container background={color.backgroundPrimary}>
      {listArchived && listArchived.length > 0 ? (
        <ListComponent color={color} items={listArchived} />
      ) : (
        <EmptyList color={color} mensage={I18n.t("noArchivedLists")} />
      )}
    </Container>
  );
}
