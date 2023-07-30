import { lazy } from "react";
import { useSearchParams } from "expo-router";

const List = lazy(() => import("../screens/list"));
export default function Items() {
  const { listId } = useSearchParams();
  return listId ? (
    <List listId={Array.isArray(listId) ? listId[0] : listId} />
  ) : (
    <></>
  );
}
