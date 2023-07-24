import { lazy } from "react";
import { useShoppingListArchivedContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView } from "react-native";
const EmptyList = lazy(() => import("./emptyList"));
const ListComponent = lazy(() => import("./list"));

export default function Home() {
  const { archived } = useShoppingListArchivedContext();

  return (
    <KeyboardAvoidingView behavior="padding">
      {archived ? <ListComponent items={archived} /> : <EmptyList />}
    </KeyboardAvoidingView>
  );
}
