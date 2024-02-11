import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";

import * as Styled from "./styles";
import Container from "../../components/Container";
import I18n from "i18n-js";

export default function History() {
  const colorScheme = useColorScheme();
  const { listArchived, listProductArchived, getTheme, getColor } =
    useShoppingListContext();
  return (
    <Container background={getColor().backgroundPrimary}>
      {listArchived && listArchived.length > 0 ? (
        <ListComponent items={listArchived} />
      ) : (
        <EmptyList mensage={I18n.t("noArchivedLists")} />
      )}
    </Container>
  );
}
