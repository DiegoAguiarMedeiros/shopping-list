import Home from "../src/screens/home/Home";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { colorTheme } from "../constants/Colors";
import { useState, useImperativeHandle } from "react";
import React from "react";
import { useShoppingListContext } from "../src/context/ShoppingList";
interface HomeContainerProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;

  color: colorTheme;
}

const HomeContainer = React.forwardRef(
  (
    {
      setBottomSheetProps,
      handleCloseBottomSheet,
      color,
    }: Readonly<HomeContainerProps>,
    ref: any
  ) => {
    const { getLists, getListArchived } = useShoppingListContext();
    const [lists, setLists] = useState<string[]>(getLists());

    useImperativeHandle(ref, () => ({
      handleAddNewList(list: string) {
        setLists((prev) => [...prev, list]);
      },
      handleAddNewListArray(list: string[]) {
        setLists(list);
      },
    }));

    console.log("getLists ", getLists());
    console.log("getListArchived ", getListArchived());
    return (
      <Home
        listRef={ref}
        lists={lists}
        color={color}
        setBottomSheetProps={setBottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
    );
  }
);

export default HomeContainer;
