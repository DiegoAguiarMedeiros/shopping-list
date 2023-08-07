import { useShoppingListArchivedContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView } from "react-native";
import EmptyList from "./emptyList";
import ListComponent from "./list";

export default function History() {
  const { listArchived, listItemArchived, itemAmountListArchived } =
    useShoppingListArchivedContext();
  const entries = listArchived ? Object.values(listArchived) : [];
  return (
    <KeyboardAvoidingView behavior="padding">
      {entries && entries.length > 0 ? (
        <ListComponent items={entries} />
      ) : (
        <EmptyList />
      )}
    </KeyboardAvoidingView>
  );
}
