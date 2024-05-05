import Tags from "../src/screens/tags";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { useImperativeHandle, useState } from "react";
import React from "react";
import { useShoppingListContext } from "../src/context/ShoppingList";
import { colorTheme } from "../constants/Colors";
import { IProduct } from "../src/Model/IProduct";

interface TagsTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
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
