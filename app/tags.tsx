import Tags from "../src/screens/tags";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { useEffect, useImperativeHandle, useState } from "react";
import React from "react";
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
}

const TagsTab = ({ setBottomSheetProps, handleCloseBottomSheet }: TagsTabProps) => {
  const { TagRepository, ListRepository } = useStores();

  useEffect(() => {
    ListRepository.setListActiveNull();
  }, [])

  return TagRepository.tags && TagRepository.tags.length > 0 ? (
    <TagView
      tags={TagRepository.tags}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  ) : (
    <EmptyList mensage={I18n.t("noCategories")} />
  );
};

export default TagsTab;
