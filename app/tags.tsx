import { useSearchParams } from "expo-router";
import { Text } from "../components/Text";

import Tags from "../screens/tags";
import { BottomSheetProps } from "../components/BottomSheet";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import React from "react";
import { useShoppingListContext } from "../context/ShoppingList";

interface TagsTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (uuid: string) => void;
  } | null>;
}

const TagsTab = React.forwardRef(
  (
    {
      setBottomSheetProps,
      bottomSheetProps,
      handleCloseBottomSheet,
      productListRef,
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
        tagRef={ref}
        productListRef={productListRef}
        tags={tags}
        setBottomSheetProps={setBottomSheetProps}
        bottomSheetProps={bottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
    );
  }
);

export default TagsTab;
