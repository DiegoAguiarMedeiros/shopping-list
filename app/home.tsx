import Home from "../src/screens/home/Home";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { colorTheme } from "../constants/Colors";
import { useState, useImperativeHandle } from "react";
import React from "react";
import { useShoppingListContext } from "../src/context/ShoppingList";
import { IList } from "../src/Model/IList";
interface HomeContainerProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  listItemRef: React.MutableRefObject<{
    handleAddItem: (list: IList) => void;
  } | null>;
  color: colorTheme;
}

const HomeContainer = React.forwardRef(
  (
    {
      setBottomSheetProps,
      handleCloseBottomSheet,
      color,
      listItemRef,
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

    return (
      <Home
        listItemRef={listItemRef}
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
