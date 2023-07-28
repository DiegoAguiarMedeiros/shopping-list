import { lazy } from "react";
import { useShoppingListArchivedContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView } from "react-native";
const EmptyList = lazy(() => import("./emptyList"));
const ListComponent = lazy(() => import("./list"));

export default function History() {
  const { listArchived } = useShoppingListArchivedContext();
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
