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
interface ItemProps {
  list: IList;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

export default function ListGridItem({
  list,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: Readonly<ItemProps>) {
  const { handleDeleteList, handleArchived, getCurrency, getColor } =
    useShoppingListContext();
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
  const total = 0; /*getTotalAmountByListUuidController.handle(list.uuid)*/
  const totalWithAmount = 0;
  /*getTotalQuantityWithoutAmountByListUuidController.handle(list.uuid)*/ const totalUn = 0; /*getTotalQuantityAmountByListUuidController.handle(list.uuid)*/

  const handleCloseBottomSheetProductList = () => {
    // setBottomSheetProps({
    //   children: (
    //     <NewItemForm
    //       buttonText="add"
    //       onClose={handleCloseBottomSheetProductList}
    //       listId={list.uuid}
    //     />
    //   ),
    //   height: "add",
    //   isVisible: false,
    // });
  };

  const handleOpenList = useCallback(() => {
    // setBottomSheetProps({
    //   isVisible: false,
    //   height: "add",
    //   children: (
    //     <NewItemForm
    //       onClose={handleCloseBottomSheetProductList}
    //       buttonText="add"
    //       listId={list.uuid}
    //     />
    //   ),
    // });
    router.push({ pathname: "/Items", params: { listId: list.uuid } });
  }, [list.uuid, router]);

  const handleEdit = () => {
    // setBottomSheetProps({
    //   height: "add",
    //   children: (
    //     <NewListForm
    //       action="editList"
    //       buttonText="edit"
    //       items={item}
    //       onClose={handleCloseBottomSheet}
    //     />
    //   ),
    //   isVisible: true,
    // });
  };

  const handleCopy = () => {
    // setBottomSheetProps({
    //   height: "add",
    //   children: (
    //     <NewListForm
    //       action="copyList"
    //       buttonText="copy"
    //       items={item}
    //       onClose={handleCloseBottomSheet}
    //     />
    //   ),
    //   isVisible: true,
    // });
  };

  const handleDelete = () => {
    handleDeleteList(list.uuid);
  };

  const archivedList = (): void => {
    handleArchived(list.uuid);
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
            underlayColor={getColor().text}
            onPress={handleCopy}
          >
            <>
              <Styled.ButtonTextIcon text={getColor().swipeIcon}>
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="copy"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={getColor().swipeIcon}>
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
            underlayColor={getColor().swipeIconUnderlay}
            onPress={archivedList}
          >
            <>
              <Styled.ButtonTextIcon text={getColor().swipeIcon}>
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="archive"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText text={getColor().swipeIcon}>
                {I18n.t("archive")}
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
      renderLeftActions={RightSwipe}
      leftThreshold={100}
      rightThreshold={undefined}
      ref={gridItemRef}
    >
      <GridItemInner
        underlayColor={getColor().itemListBackgroundUnderlay}
        borderColor={getColor().itemListBackgroundBorder}
        background={getColor().itemListBackground}
        height={70}
        row
        onPress={handleOpenList}
        elevation={colorScheme === "light"}
      >
        <>
          <GridItemWrapperCol width={85} height={100}>
            <GridItemWrapperInner height={100}>
              <Title2 color={getColor().itemListText}>{list.name}</Title2>
              <Text color={getColor().itemListTextSecondary}>
                {I18n.t("total")}: {getCurrency()}{" "}
                {total.toFixed(2).replace(".", ",")}
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={15} height={100}>
            <GridItemWrapperInner height={100} align="flex-end">
              <CircleProgress
                activeStrokeColor={getColor().circularItemFilled}
                titleColor={getColor().circularItemText}
                circleBackgroundColor={getColor().circularItemBackground}
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
