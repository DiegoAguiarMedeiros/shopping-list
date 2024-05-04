import { useGlobalSearchParams } from "expo-router";

import ListArchived from "../src/screens/listArchived/index";
import { useShoppingListContext } from "../src/context/ShoppingList";
import { useState } from "react";
import { IList } from "../src/Model/IList";
import { colorTheme } from "../constants/Colors";

interface ItemsArchivedProps {
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
  color: colorTheme;
}
export default function ItemsArchived({
  setActiveRouteHeader,
  color,
}: ItemsArchivedProps) {
  const { listId } = useGlobalSearchParams();

  const { getListByUuid } = useShoppingListContext();
  const [list, setList] = useState<IList>(
    getListByUuid(!Array.isArray(listId) && listId ? listId : "")
  );
  return listId ? (
    <ListArchived
      color={color}
      setActiveRouteHeader={setActiveRouteHeader}
      list={list}
    />
  ) : (
    <></>
  );
}
