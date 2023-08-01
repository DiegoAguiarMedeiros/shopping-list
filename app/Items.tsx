import { useSearchParams } from "expo-router";
import { Text } from "../components/Text";

import List from "../screens/list";
export default function Items() {
  const { listId } = useSearchParams();
  return listId ? (
    <List listId={Array.isArray(listId) ? listId[0] : listId} />
  ) : (
    <></>
  );
}
