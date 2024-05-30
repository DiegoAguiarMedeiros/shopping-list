import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";
import { useCallback, useEffect, useRef } from "react";
import { removeUndefinedFromArray } from "../../../../../utils/functions";
import { Text, Title2 } from "../../../../../components/Text";
import { useShoppingListContext } from "../../../../../context/ShoppingList";
import CircleProgress from "../../../../../components/CircleProgress";

import { BottomSheetProps } from "../../../../../components/BottomSheet";
import NewListForm from "../../../../../components/NewListForm";
import { IList } from "../../../../../Model/IList";
import NewItemForm from "../../../../../components/NewItemForm";
import GridItem from "../../../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
} from "../../../../../components/GridItemInner";
import I18n from "i18n-js";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colorTheme } from "../../../../../../constants/Colors";
import { IProduct } from "../../../../../Model/IProduct";
interface ItemProps {
  list: IList;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  listRef: React.MutableRefObject<{
    handleAddNewList: (uuid: string) => void;
    handleAddNewListArray: (list: string[]) => void;
  } | null>;
  listItemRef: React.MutableRefObject<{
    handleAddItem: (list: IList) => void;
  } | null>;
}

export default function ListGridItem({
  list,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  listRef,
  listItemRef,
}: Readonly<ItemProps>) {
  const {
    handleDeleteList,
    handleArchived,
    getCurrency,
    getTotalAmountByListUuid,
    getTotalQuantityWithoutAmountByListUuid,
    getTotalQuantityAmountByListUuid,
  } = useShoppingListContext();
  const colorScheme = useColorScheme();
  const router = useRouter();
  // const items = removeUndefinedFromArray(
  //   getListProductController.handle(list.items)
  // );
  const gridItemRef = useRef<any>();
  const handleCloseSwipeableFromParent = () => {
    // Access the handleCloseSwipeable function from the ref
    if (gridItemRef.current) {
      gridItemRef.current.handleCloseSwipeable();
    }
  };

  useEffect(() => {
    handleCloseSwipeableFromParent();
  }, [list.name]);
  const total = getTotalAmountByListUuid(list.uuid);
  const totalUn = getTotalQuantityWithoutAmountByListUuid(list.uuid);
  const totalWithAmount = getTotalQuantityAmountByListUuid(list.uuid);

  const handleCloseBottomSheetProductList = () => {
    setBottomSheetProps({
      children: (
        <NewItemForm
          listItemRef={listItemRef}
          color={color}
          buttonText="add"
          onClose={handleCloseBottomSheetProductList}
          list={list}
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
        <NewItemForm
          listItemRef={listItemRef}
          color={color}
          onClose={handleCloseBottomSheetProductList}
          buttonText="add"
          list={list}
        />
      ),
      color: color,
    });
    router.push({ pathname: "/Items", params: { listId: list.uuid } });
  }, [list.uuid, router]);

  const handleEdit = () => {
    setBottomSheetProps({
      height: "add",
      children: (
        <NewListForm
          action="editList"
          buttonText="edit"
          list={list}
          onClose={handleCloseBottomSheet}
          color={color}
          listRef={listRef}
        />
      ),
      isVisible: true,
      color: color,
    });
  };

  const handleCopy = () => {
    setBottomSheetProps({
      height: "add",
      children: (
        <NewListForm
          action="copyList"
          buttonText="copy"
          list={list}
          onClose={handleCloseBottomSheet}
          color={color}
          listRef={listRef}
          handleCloseSwipeableFromParent={handleCloseSwipeableFromParent}
        />
      ),
      isVisible: true,
      color: color,
    });
  };

  const handleDelete = () => {
    handleDeleteList(list.uuid, listRef);
  };

  const archivedList = (): void => {
    handleArchived(list.uuid, listRef);
  };

  const RightSwipe = (
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
          <Styled.ButtonInner underlayColor={color.text} onPress={handleCopy}>
            <>
              <Styled.ButtonTextIcon text={color.swipeIcon}>
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="copy"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={color.swipeIcon}>
                {I18n.t("copy")}
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
        </Styled.ButtonView>
      </Animated.View>
    );
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
            onPress={archivedList}
          >
            <>
              <Styled.ButtonTextIcon text={color.swipeIcon}>
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="archive"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={color.swipeIcon}>
                {I18n.t("archive")}
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
      renderLeftActions={RightSwipe}
      leftThreshold={100}
      rightThreshold={undefined}
      ref={gridItemRef}
    >
      <GridItemInner
        underlayColor={color.itemListBackgroundUnderlay}
        borderColor={color.itemListBackgroundBorder}
        background={color.itemListBackground}
        height={70}
        row
        onPress={handleOpenList}
        elevation={colorScheme === "light"}
      >
        <>
          <GridItemWrapperCol width={85} height={100}>
            <GridItemWrapperInner height={100}>
              <Title2 color={color.itemListText}>{list.name}</Title2>
              <Text color={color.itemListTextSecondary}>
                {I18n.t("total")}: {getCurrency()}{" "}
                {total.toFixed(2).replace(".", ",")}
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={15} height={100}>
            <GridItemWrapperInner height={100} align="flex-end">
              <CircleProgress
                activeStrokeColor={color.circularItemFilled}
                titleColor={color.circularItemText}
                circleBackgroundColor={color.circularItemBackground}
                filled={totalWithAmount}
                progress={totalUn && totalWithAmount ? totalWithAmount : 0}
                total={totalUn}
                size={22}
              />
            </GridItemWrapperInner>
          </GridItemWrapperCol>
        </>
      </GridItemInner>
    </GridItem>
  );
}
