import { useShoppingListArchivedContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView } from "react-native";
import EmptyList from "./emptyList";
import ListComponent from "./list";

export default function History() {
  const { listArchived } = useShoppingListArchivedContext();
  const entries = listArchived ? Object.values(listArchived) : [];
  return entries && entries.length > 0 ? (
    <ListComponent items={entries} />
  ) : (
    <EmptyList />
  );
}
