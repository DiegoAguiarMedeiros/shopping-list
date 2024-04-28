import { useSearchParams } from "expo-router";
import List from "../src/screens/list/index";
import { colorTheme } from "../constants/Colors";
import { useShoppingListContext } from "../src/context/ShoppingList";
import { useState } from "react";
import { IList } from "../src/Model/IList";

interface ProductsListProps {
  handleCloseBottomSheetList: () => void;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
  color: colorTheme;
}

export default function Items({
  handleCloseBottomSheetList,
  setActiveRouteHeader,
  color,
}: ProductsListProps) {
  const { listId } = useSearchParams();

  const { getListByUuid } = useShoppingListContext();
  const [list, setList] = useState<IList>(
    getListByUuid(!Array.isArray(listId) && listId ? listId : "")
  );


  return listId ? (
    <List
      list={list}
      color={color}
      setActiveRouteHeader={setActiveRouteHeader}
      handleCloseBottomSheetList={handleCloseBottomSheetList}
      listId={Array.isArray(listId) ? listId[0] : listId}
    />
  ) : (
    <></>
  );
}
