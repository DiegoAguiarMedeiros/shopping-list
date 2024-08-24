import Tags from "../src/screens/tags";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { useImperativeHandle, useState } from "react";
import React from "react";
import { useShoppingListContext } from "../src/context/ShoppingList";
import { colorTheme } from "../constants/Colors";
import { IProduct } from "../src/Model/IProduct";
import ITag from "../src/Model/ITag";
import { useTagViewModel } from "../src/viewmodels/Tag/TagViewModel";
import EmptyList from "../src/components/EmptyList";
import I18n from "i18n-js";
import { TagView } from "../src/views/Tag/TagView";
import { useStores } from "../src/context/StoreContext";
import { observer } from "mobx-react-lite";

interface TagsTabProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
}

const TagsTab = observer(
  ({ setBottomSheetProps, handleCloseBottomSheet, color }: TagsTabProps) => {
    const { TagRepository } = useStores();
    return TagRepository.tags && TagRepository.tags.length > 0 ? (
      <TagView
        tags={TagRepository.tags}
        color={color}
        setBottomSheetProps={setBottomSheetProps}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
    ) : (
      <EmptyList color={color} mensage={I18n.t("noCategories")} />
    );
  }
);

export default TagsTab;
