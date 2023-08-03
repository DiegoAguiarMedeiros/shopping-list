import { useSearchParams } from "expo-router";
import { Text } from "../components/Text";

import ListArchived from "../screens/listArchived";
export default function ItemsArchived() {
  const { listId } = useSearchParams();
  return listId ? (
    <ListArchived listId={Array.isArray(listId) ? listId[0] : listId} />
  ) : (
    <></>
  );
}
