import { lazy } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView } from "react-native";
const EmptyList = lazy(() => import("./emptyList"));
const ListComponent = lazy(() => import("./list"));
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Home() {
  const { list } = useShoppingListContext();
  const entries = list ? Object.values(list) : [];
  // AsyncStorage.clear()
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
