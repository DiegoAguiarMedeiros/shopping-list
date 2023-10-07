import { useShoppingListArchivedContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";

export default function History() {
  const colorScheme = useColorScheme();
  const { listArchived, listItemArchived, itemAmountListArchived } =
    useShoppingListArchivedContext();
  const entries = listArchived ? Object.values(listArchived) : [];
  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerListInner>
        {entries && entries.length > 0 ? (
          <ListComponent items={entries} />
        ) : (
          <EmptyList mensage="Você não tem nenhuma lista arquivada" />
        )}
      </Styled.ContainerListInner>
      <Styled.ContainerListInnerButton />
    </Styled.Container>
  );
}
