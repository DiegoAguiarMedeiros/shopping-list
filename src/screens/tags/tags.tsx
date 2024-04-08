import { useSearchParams } from "expo-router";

import Tags from "../tags";
import { BottomSheetProps } from "../../components/BottomSheet";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import React from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import { colorTheme } from "../../../constants/Colors";

interface TagsTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (uuid: string) => void;
  } | null>;
  color: colorTheme;
}

const TagsTab = React.forwardRef(
  (
    {
      setBottomSheetProps,
      handleCloseBottomSheet,
      productListRef,
      color,
    }: TagsTabProps,
    ref: any
  ) => {
    const { getTags } = useShoppingListContext();
    const [tags, setTags] = useState<string[]>(getTags());

    useImperativeHandle(ref, () => ({
      handleAddNewTag(tag: string) {
        setTags((prev) => [...prev, tag]);
      },
    }));

    return (
      <Tags
        color={color}
        tagRef={ref}
        productListRef={productListRef}
        tags={tags}
        setBottomSheetProps={setBottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
    );
  }
);

export default TagsTab;
