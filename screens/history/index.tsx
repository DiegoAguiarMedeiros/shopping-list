import { useShoppingListArchivedContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";

export default function History() {
  const colorScheme = useColorScheme();
  const { listArchived, listProductArchived, listAmountArchived } =
    useShoppingListArchivedContext();

  console.log('listArchived', listArchived)
  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerListInner>
        {listArchived && listArchived.length > 0 ? (
          <ListComponent items={listArchived} />
        ) : (
          <EmptyList mensage="Você não tem nenhuma lista arquivada" />
        )}
      </Styled.ContainerListInner>
    </Styled.Container>
  );
}
