import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import Container from "../../components/Container";
import I18n from "i18n-js";

export default function History() {
  const colorScheme = useColorScheme();
  const { listArchived, listProductArchived, getTheme } =
    useShoppingListContext();
  return (
    <Container background={Colors[getTheme()].backgroundPrimary}>
      {listArchived && listArchived.length > 0 ? (
        <ListComponent items={listArchived} />
      ) : (
        <EmptyList mensage={I18n.t("noArchivedLists")} />
      )}
    </Container>
  );
}
