import { useGlobalSearchParams } from "expo-router";
import List from "../src/screens/list/index";
import { colorTheme } from "../constants/Colors";
import { useShoppingListContext } from "../src/context/ShoppingList";
import { useImperativeHandle, useState } from "react";
import { IList } from "../src/Model/IList";
import { IProduct } from "../src/Model/IProduct";
import React from "react";

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

const Items = React.forwardRef(
  (
    {
      handleCloseBottomSheetList,
      setActiveRouteHeader,
      color,
    }: ProductsListProps,
    ref: any
  ) => {
    const { listId } = useGlobalSearchParams();

    const { getListByUuid } = useShoppingListContext();
    const [list, setList] = useState<IList>(
      getListByUuid(!Array.isArray(listId) && listId ? listId : "")
    );

    useImperativeHandle(ref, () => ({
      handleAddItem(list: IList) {
        setList(list);
      },
    }));

    return listId ? (
      <List
        setList={setList}
        list={list}
        color={color}
        setActiveRouteHeader={setActiveRouteHeader}
        handleCloseBottomSheetList={handleCloseBottomSheetList}
      />
    ) : (
      <></>
    );
  }
);

export default Items;
