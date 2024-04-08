import Home from "./Home";
import { BottomSheetProps } from "../../components/BottomSheet";
import { colorTheme } from "../../../constants/Colors";
import { useState, useImperativeHandle } from "react";
import React from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
interface TabOneScreenProps {
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
    }: Readonly<TabOneScreenProps>,
    ref: any
  ) => {
    const { getLists } = useShoppingListContext();
    const [lists, setLists] = useState<string[]>(getLists());

    useImperativeHandle(ref, () => ({
      handleAddNewList(list: string) {
        setLists((prev) => [...prev, list]);
      },
    }));

    return (
      <Home
        lists={lists}
        color={color}
        setBottomSheetProps={setBottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
    );
  }
);

export default HomeContainer;
