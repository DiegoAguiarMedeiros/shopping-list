import { useColorScheme, Animated } from "react-native";
import isEqual from "lodash.isequal";
import * as Styled from "./styles";
import { useCallback, useEffect, useRef } from "react";
import { removeUndefinedFromArray } from "../../../../../utils/functions";
import { Text, Title2 } from "../../../../../components/Text";
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
import React from "react";
import { useListViewModel } from "../../../../../viewmodels/List/ListViewModel";
import { useStores } from "../../../../../context/StoreContext";
interface ItemProps {
  list: IList;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  theme: 'dark' | 'light'
}

const ListGridItem = React.memo(
  ({
    handleCloseBottomSheet,
    setBottomSheetProps,
    list,
    theme
  }: Readonly<ItemProps>) => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const { ListRepository, ProductRepository, ConfigRepository } = useStores();
    const { removeItem } = useListViewModel();
    // const items = removeUndefinedFromArray(
    //   getListProductController.handle(list.items)
    // );
    const gridItemRef = useRef<any>();
    const handleCloseSwipeableFromParent = () => {
      // Access the handleCloseSwipeable function from the ref
      if (gridItemRef?.current) {
        gridItemRef?.current.handleCloseSwipeable();
      }
    };

    useEffect(() => {
      handleCloseSwipeableFromParent();
    }, [list.name]);
    const total = list.total ? list.total : 0;
    const totalUn = list.totalUn ? list.totalUn : 0;
    const totalWithoutAmount = list.totalWithoutAmount
      ? list.totalWithoutAmount
      : 0;

    const handleCloseBottomSheetProductList = () => {
      setBottomSheetProps({
        children: (
          <NewItemForm
            buttonText="add"
            onClose={handleCloseBottomSheetProductList}
            list={list}
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
          <NewItemForm
            onClose={handleCloseBottomSheetProductList}
            buttonText="add"
            list={list}
          />
        )
      });
      ListRepository.setListActive(list.uuid);
      ProductRepository.load();
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
          />
        ),
        isVisible: true,
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
            handleCloseSwipeableFromParent={handleCloseSwipeableFromParent}
          />
        ),
        isVisible: true,
      });
    };

    const handleDelete = () => {
      ListRepository.removeItem(list.uuid);
    };

    const archivedList = (): void => {
      console.log("archivedList")
      ProductRepository.generateLastPrices(list.uuid);
      ListRepository.archiveList(list.uuid);
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
              underlayColor={ConfigRepository.color.swipeIconUnderlay}
              onPress={handleEdit}
            >
              <>
                <Styled.ButtonTextIcon text={ConfigRepository.color.swipeIcon}>
                  <FontAwesome
                    size={18}
                    style={{ marginBottom: -3 }}
                    name="pencil"
                  />
                </Styled.ButtonTextIcon>
                <Styled.ButtonText text={ConfigRepository.color.swipeIcon}>
                  {I18n.t("edit")}
                </Styled.ButtonText>
              </>
            </Styled.ButtonInner>
            <Styled.ButtonInner underlayColor={ConfigRepository.color.text} onPress={handleCopy}>
              <>
                <Styled.ButtonTextIcon text={ConfigRepository.color.swipeIcon}>
                  <FontAwesome
                    size={18}
                    style={{ marginBottom: -3 }}
                    name="copy"
                  />
                </Styled.ButtonTextIcon>
                <Styled.ButtonText text={ConfigRepository.color.swipeIcon}>
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
              underlayColor={ConfigRepository.color.swipeIconUnderlay}
              onPress={archivedList}
            >
              <>
                <Styled.ButtonTextIcon text={ConfigRepository.color.swipeIcon}>
                  <FontAwesome
                    size={18}
                    style={{ marginBottom: -3 }}
                    name="archive"
                  />
                </Styled.ButtonTextIcon>
                <Styled.ButtonText text={ConfigRepository.color.swipeIcon}>
                  {I18n.t("archive")}
                </Styled.ButtonText>
              </>
            </Styled.ButtonInner>
            <Styled.ButtonInner
              underlayColor={ConfigRepository.color.swipeIconUnderlay}
              onPress={handleDelete}
            >
              <>
                <Styled.ButtonTextIcon text={ConfigRepository.color.swipeIcon}>
                  <FontAwesome
                    size={18}
                    style={{ marginBottom: -3 }}
                    name="trash"
                  />
                </Styled.ButtonTextIcon>
                <Styled.ButtonText text={ConfigRepository.color.swipeIcon}>
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
          underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
          borderColor={ConfigRepository.color.itemListBackgroundBorder}
          background={ConfigRepository.color.itemListBackground}
          height={70}
          row
          onPress={handleOpenList}
          elevation={colorScheme === "light"}
        >
          <>
            <GridItemWrapperCol width={85} height={100}>
              <GridItemWrapperInner height={100}>
                <Title2 color={ConfigRepository.color.itemListText}>{list.name}</Title2>
                <Text color={ConfigRepository.color.itemListTextSecondary}>
                  {I18n.t("total")}: {ConfigRepository.currency}{" "}
                  {total.toFixed(2).replace(".", ",")}
                </Text>
              </GridItemWrapperInner>
            </GridItemWrapperCol>
            <GridItemWrapperCol width={15} height={100}>
              <GridItemWrapperInner height={100} align="flex-end">
                <CircleProgress
                  activeStrokeColor={ConfigRepository.color.circularItemFilled}
                  titleColor={ConfigRepository.color.circularItemText}
                  circleBackgroundColor={ConfigRepository.color.circularItemBackground}
                  filled={totalWithoutAmount}
                  progress={
                    totalUn && totalWithoutAmount ? totalWithoutAmount : 0
                  }
                  total={totalUn}
                  size={22}
                />
              </GridItemWrapperInner>
            </GridItemWrapperCol>
          </>
        </GridItemInner>
      </GridItem>
    );
  },
  (prevProps, nextProps) => {
    console.log("prevProps.list", prevProps.list)
    console.log("nextProps.list", nextProps.list)
    console.log("prevProps.theme", prevProps.theme)
    console.log("nextProps.theme", nextProps.theme)
    console.log("isEqual(prevProps.theme, nextProps.theme", isEqual(prevProps.theme, nextProps.theme))
    console.log("isEqual(prevProps.list, nextProps.list)", isEqual(prevProps.list, nextProps.list))
    console.log(isEqual(prevProps.list, nextProps.list) && isEqual(prevProps.theme, nextProps.theme))
    return isEqual(prevProps.list, nextProps.list) && isEqual(prevProps.theme, nextProps.theme);
  }
);

export default ListGridItem;