import React, { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  ListRenderItem,
} from "react-native";
import { useTagViewModel } from "../../viewmodels/Tag/TagViewModel";
import { IList } from "../../Model/IList";
import ListGridItem from "../../screens/tags/list/listGrid/listGridItem";
import { colorTheme } from "../../../constants/Colors";
import { BottomSheetProps } from "../../components/BottomSheet";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import { IProduct } from "../../Model/IProduct";
import ITag from "../../Model/ITag";

interface TagViewProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  tags: ITag[];
  productListRef: React.MutableRefObject<{
    handleAddProduct: (product: string) => void;
    handleRemoveProduct: (uuid: string) => void;
    handleEditProduct: (uuid: string, name: string, tag?: string) => void;
  } | null>;
  tagRef: React.RefObject<{
    handleAddNewTag: (tag: string) => void;
    handleRemoveTag: (uuid: string) => void;
    handleEditTag: (uuid: string, name: string) => void;
  }>;
}

const CustomFlatList = React.memo(
  ({
    setBottomSheetProps,
    handleCloseBottomSheet,
    color,
    tags,
    tagRef,
    productListRef,
  }: TagViewProps) => {
    const renderItem: ListRenderItem<ITag> = ({ item }) => (
      <ListGridItem
        productListRef={productListRef}
        tagRef={tagRef}
        color={color}
        handleCloseBottomSheet={handleCloseBottomSheet}
        setBottomSheetProps={setBottomSheetProps}
        tag={item}
      />
    );

    return (
      <Container background={color.backgroundPrimary}>
        <ContainerInner background={color.backgroundPrimary}>
          <FlatList
            data={tags}
            renderItem={renderItem}
            keyExtractor={(item) => "ListGridItem-" + item.uuid}
          />
        </ContainerInner>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    return (
      isEqual(prevProps.tags, nextProps.tags) &&
      isEqual(prevProps.productListRef, nextProps.productListRef)
    );
  }
);

export const TagView = ({
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  tags,
  tagRef,
  productListRef,
}: TagViewProps) => {
  return (
    <CustomFlatList
      productListRef={productListRef}
      tagRef={tagRef}
      tags={tags}
      color={color}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  );
};
