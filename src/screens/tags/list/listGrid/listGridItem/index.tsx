import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";
import { useCallback, useEffect, useRef } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { SubTitle, Title2 } from "../../../../../components/Text";
import { useShoppingListContext } from "../../../../../context/ShoppingList";

import { BottomSheetProps } from "../../../../../components/BottomSheet";
import NewTagForm from "../../../../../components/NewTagForm";
import GridItem from "../../../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
} from "../../../../../components/GridItemInner";
import NewProductForm from "../../../../../components/NewProductForm";
import I18n from "i18n-js";
import ITag from "../../../../../Model/ITag";
import { colorTheme } from "../../../../../../constants/Colors";

interface ItemProps {
  tag: ITag;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  productListRef: React.MutableRefObject<{
    handleAddProduct: (product: IProduct) => void;
  } | null>;
  tagRef: React.RefObject<{ handleAddNewTag: (tag: string) => void }>;
}

export default function ListGridItem({
  tag,
  setBottomSheetProps,
  handleCloseBottomSheet,
  productListRef,
  tagRef,
  color,
}: Readonly<ItemProps>) {
  const { handleDeleteTag, getNumberOfProductsByTagsUuid } =
    useShoppingListContext();

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
          color={color}
          productListRef={productListRef}
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
          tagUuid={tag.uuid}
        />
      ),
      height: "add",
      isVisible: false,
      color: color,
    });
  };

  const handleOpenList = useCallback(() => {
    setBottomSheetProps({
      isVisible: false,
      height: "add",
      children: (
        <NewProductForm
          color={color}
          productListRef={productListRef}
          onClose={handleCloseBottomSheetProduct}
          action="addList"
          buttonText="add"
          tagUuid={tag.uuid}
        />
      ),
      color: color,
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
          color={color}
          tagRef={tagRef}
          action="editTag"
          buttonText="edit"
          tag={tag}
          onClose={handleCloseBottomSheet}
        />
      ),
      isVisible: true,
      color: color,
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
            underlayColor={color.swipeIconUnderlay}
            onPress={handleEdit}
          >
            <>
              <Styled.ButtonTextIcon text={color.swipeIcon}>
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="pencil"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={color.swipeIcon}>
                {I18n.t("edit")}
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
          <Styled.ButtonInner
            underlayColor={color.swipeIconUnderlay}
            onPress={handleDelete}
          >
            <>
              <Styled.ButtonTextIcon text={color.swipeIcon}>
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="trash"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={color.swipeIcon}>
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
        underlayColor={color.itemListBackgroundUnderlay}
        borderColor={color.itemListBackgroundBorder}
        background={color.itemListBackground}
        height={60}
        row
        onPress={handleOpenList}
        elevation={colorScheme === "light"}
      >
        <>
          <GridItemWrapperCol width={70} height={100}>
            <GridItemWrapperInner height={100}>
              <Title2 color={color.text}>{tag.name}</Title2>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={30} height={100}>
            <GridItemWrapperInner height={100}>
              <SubTitle color={color.textSecondary} align="right">
                {I18n.t("products")}: {getNumberOfProductsByTagsUuid(tag.uuid)}
              </SubTitle>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
        </>
      </GridItemInner>
    </GridItem>
  );
}
