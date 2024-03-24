import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ItemInterface,
  ListInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../../../../../types/types";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Swipeable } from "react-native-gesture-handler";
import { removeUndefinedFromArray } from "../../../../../utils/functions";
import { Title, Text, SubTitle, Title2 } from "../../../../../components/Text";
import { useShoppingListContext } from "../../../../../context/ShoppingList";
import CircleProgress from "../../../../../components/CircleProgress";

import { BottomSheetProps } from "../../../../../components/BottomSheet";
import NewListForm from "../../../../../components/NewListForm";
import Tag from "../../../../../Domain/Model/Implementation/Tag";
import { IList, IListInterface } from "../../../../../Domain/Model/IList";
import getListProductController from "../../../../../Domain/UseCases/ListProduct/GetProductByUuid";
import deleteTagByUuidController from "../../../../../Domain/UseCases/Tag/DeleteTagByUuid";
import saveListArchivedByUuidController from "../../../../../Domain/UseCases/ListArchived/SaveListByUuid";
import NewTagForm from "../../../../../components/NewTagForm";
import ITag from "../../../../../Domain/Model/ITag";
import getNumberOfProductsByTagsUuidController from "../../../../../Domain/UseCases/ListProduct/GetNumberOfProductsByTagsUuid";
import GridItem from "../../../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../../../components/GridItemInner";
import NewProductForm from "../../../../../components/NewProductForm";
import I18n from "i18n-js";
interface ItemProps {
  tag: Tag;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (uuid: string) => void;
  } | null>;
  tagRef: React.RefObject<{ handleAddNewTag: (tag: string) => void }>;
}

export default function ListGridItem({
  tag,
  setBottomSheetProps,
  handleCloseBottomSheet,
  productListRef,
  tagRef,
}: Readonly<ItemProps>) {
  const { handleDeleteTag, getTheme, getColor } = useShoppingListContext();

  const colorScheme = useColorScheme();
  const router = useRouter();
  const gridItemRef = useRef<any>();
  const handleCloseSwipeableFromParent = () => {
    // Access the handleCloseSwipeable function from the ref
    if (gridItemRef.current) {
      gridItemRef.current.handleCloseSwipeable();
    }
  };

  useEffect(() => {
    handleCloseSwipeableFromParent();
  }, [tag.name]);

  const handleCloseBottomSheetProduct = () => {
    setBottomSheetProps({
      children: (
        <NewProductForm
          productListRef={productListRef}
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
          tagUuid={tag.uuid}
        />
      ),
      height: "add",
      isVisible: false,
    });
  };

  const handleOpenList = useCallback(() => {
    setBottomSheetProps({
      isVisible: false,
      height: "add",
      children: (
        <NewProductForm
          productListRef={productListRef}
          onClose={handleCloseBottomSheetProduct}
          action="addList"
          buttonText="add"
          tagUuid={tag.uuid}
        />
      ),
    });
    router.push({ pathname: "/ProductsList", params: { tagUuid: tag.uuid } });
  }, [tag.uuid, router]);

  const handleEdit = () => {
    setBottomSheetProps({
      // listId: item.uuid,
      // items: item,
      // buttonText: "edit",
      // action: "editList",
      height: "add",
      children: (
        <NewTagForm
          tagRef={tagRef}
          action="editTag"
          buttonText="edit"
          tag={tag}
          onClose={handleCloseBottomSheet}
        />
      ),
      isVisible: true,
    });
  };

  const handleDelete = () => {
    handleDeleteTag(tag.uuid);
  };

  const LeftSwipe = (
    progress: any,
    dragX: {
      interpolate: (arg0: {
        inputRange: number[];
        outputRange: number[];
      }) => any;
    }
  ) => {
    return (
      <Animated.View
        style={{
          width: 200,
          overflow: "hidden",
        }}
      >
        <Styled.ButtonView>
          <Styled.ButtonInner
            underlayColor={getColor().swipeIconUnderlay}
            onPress={handleEdit}
          >
            <>
              <Styled.ButtonTextIcon text={getColor().swipeIcon}>
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="pencil"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={getColor().swipeIcon}>
                {I18n.t("edit")}
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
          <Styled.ButtonInner
            underlayColor={getColor().swipeIconUnderlay}
            onPress={handleDelete}
          >
            <>
              <Styled.ButtonTextIcon text={getColor().swipeIcon}>
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="trash"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={getColor().swipeIcon}>
                {I18n.t("delete")}
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
        </Styled.ButtonView>
      </Animated.View>
    );
  };

  return (
    <GridItem
      renderRightActions={LeftSwipe}
      leftThreshold={100}
      rightThreshold={undefined}
      ref={gridItemRef}
    >
      <GridItemInner
        underlayColor={getColor().itemListBackgroundUnderlay}
        borderColor={getColor().itemListBackgroundBorder}
        background={getColor().itemListBackground}
        height={60}
        row
        onPress={handleOpenList}
        elevation={colorScheme === "light"}
      >
        <>
          <GridItemWrapperCol width={70} height={100}>
            <GridItemWrapperInner height={100}>
              <Title2 color={getColor().text}>{tag.name}</Title2>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={30} height={100}>
            <GridItemWrapperInner height={100}>
              <SubTitle color={getColor().textSecondary} align="right">
                {I18n.t("products")}:{" "}
                {getNumberOfProductsByTagsUuidController.handle(tag.uuid)}
              </SubTitle>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
        </>
      </GridItemInner>
    </GridItem>
  );
}
