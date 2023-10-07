import { useShoppingListArchivedContext } from "../../context/ShoppingList";
import { KeyboardAvoidingView } from "react-native";
import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";

export default function History() {
  const { listArchived, listItemArchived, itemAmountListArchived } =
    useShoppingListArchivedContext();
  const entries = listArchived ? Object.values(listArchived) : [];
  return entries && entries.length > 0 ? (
    <ListComponent items={entries} />
  ) : (
    <EmptyList mensage="Você não tem nenhuma lista arquivada" />
  );
}
