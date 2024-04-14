import { useSearchParams } from "expo-router";

import ListArchived from "../src/screens/listArchived/index";

interface ItemsArchivedProps {
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
}
export default function ItemsArchived({
  setActiveRouteHeader,
}: ItemsArchivedProps) {
  const { listId } = useSearchParams();
  return listId ? (
    <ListArchived
      setActiveRouteHeader={setActiveRouteHeader}
      listId={Array.isArray(listId) ? listId[0] : listId}
    />
  ) : (
    <></>
  );
}
