import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import Container from "../../components/Container";

export default function History() {
  const colorScheme = useColorScheme();
  const { listArchived, listProductArchived, listAmountArchived } =
    useShoppingListContext();
  return (
    <Container
      background={Colors[colorScheme ?? "light"].backgroundPrimary}
    >
      {listArchived && listArchived.length > 0 ? (
        <ListComponent items={listArchived} />
      ) : (
        <EmptyList mensage="Você não tem nenhuma lista arquivada" />
      )}
    </Container>
  );
}
