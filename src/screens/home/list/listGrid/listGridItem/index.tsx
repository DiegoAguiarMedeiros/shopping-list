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
import { useNavigation } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ColorList, colorTheme } from "../../../../../../constants/Colors";
import { IProduct } from "../../../../../Model/IProduct";
import React from "react";
import { useListViewModel } from "../../../../../viewmodels/List/ListViewModel";
import { useStores } from "../../../../../context/StoreContext";
interface ItemProps {
  list: IList;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

const ListGridItem = React.memo(
  ({
    handleCloseBottomSheet,
    setBottomSheetProps,
    list,
  }: Readonly<ItemProps>) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation<any>();
    const { ListRepository, ProductRepository, ConfigRepository } = useStores();
    const { removeItem } = useListViewModel();
    // const items = removeUndefinedFromArray(
    //   getListProductController.handle(list.items)
    // );
    const gridItemRef = useRef<any>(null);
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
      navigation.navigate("Items", { listId: list.uuid });
    }, [list.uuid, navigation]);

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
              onPress={archivedList}
            >
              <Styled.ButtonContent>
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
              </Styled.ButtonContent>
            </Styled.ButtonInner>

            <Styled.ButtonInner underlayColor={ConfigRepository.color.text} onPress={handleCopy}>
              <Styled.ButtonContent>
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
              </Styled.ButtonContent>
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
              onPress={handleEdit}
            >
              <Styled.ButtonContent>
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
              </Styled.ButtonContent>
            </Styled.ButtonInner>
            <Styled.ButtonInner
              underlayColor={ConfigRepository.color.swipeIconUnderlay}
              onPress={handleDelete}
            >
              <Styled.ButtonContent>
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
              </Styled.ButtonContent>
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
              <GridItemWrapperInner height={100} align="flex-start">
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
                  circleBackgroundColor={ConfigRepository.color.circularItemBackground}
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
    return isEqual(prevProps.list, nextProps.list);
  }
);

export default ListGridItem;
