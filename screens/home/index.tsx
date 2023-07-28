import { lazy } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView } from "react-native";
const EmptyList = lazy(() => import("./emptyList"));
const ListComponent = lazy(() => import("./list"));
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
export default function Home() {
  const { list } = useShoppingListContext();
  const entries = list ? Object.values(list) : [];
  const isFocused = useIsFocused();
  // AsyncStorage.clear();
  return (
    <KeyboardAvoidingView behavior="padding">
      {isFocused &&
        (entries && entries.length > 0 ? (
          <ListComponent items={entries} />
        ) : (
          <EmptyList />
        ))}
    </KeyboardAvoidingView>
  );
}
