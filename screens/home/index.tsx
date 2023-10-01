import { useShoppingListContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView } from "react-native";
import EmptyList from "./emptyList";
import ListComponent from "./list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
export default function Home() {
  const { list, listItem, itemAmountList } = useShoppingListContext();
  const entries = list ? Object.values(list) : [];
  const isFocused = useIsFocused();
  // console.log("list", list);
  // console.log("listItem", listItem);
  // console.log("itemAmountList", itemAmountList);
  // AsyncStorage.clear();
  return (
    isFocused &&
    (entries && entries.length > 0 ? (
      <ListComponent items={entries} />
    ) : (
      <EmptyList />
    ))
  );
}
