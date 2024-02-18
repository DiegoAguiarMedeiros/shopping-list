import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";
import React, { useEffect, useRef, useState } from "react";
import {
  ItemInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
  TagsIterface,
} from "../../../../types/types";

import { BottomSheetProps } from "../../../../components/BottomSheet";
import { FontAwesome } from "@expo/vector-icons";
import {
  getTags,
  getTagsFromListItemInterface,
  getTotalAmount,
  getTotalAmountUn,
  removeUndefinedFromArray,
} from "../../../../utils/functions";
import { Swipeable } from "react-native-gesture-handler";
import { Title, Text, Title2 } from "../../../../components/Text";
import { useShoppingListContext } from "../../../../context/ShoppingList";

import AddPriceUnit from "../../../addPriceUnit";
import NewItemForm from "../../../../components/NewItemForm";
import { IProduct } from "../../../../Domain/Model/IProduct";
import getAmountByListProductUuidController from "../../../../Domain/UseCases/Amount/GetAmountByListProductUuid";
import getTotlaAmountByListProductUuidController from "../../../../Domain/UseCases/Amount/GetTotalAmountByListProductUuid";
import getTotalQuantityAmountByListProductUuidController from "../../../../Domain/UseCases/Amount/GetTotalQuantityAmountByListProductUuid";
import deleteProductFromListByUuidController from "../../../../Domain/UseCases/List/DeleteProductFromListByUuid";
import getTagsController from "../../../../Domain/UseCases/ListProduct/GetTagsByProductUuidArray";
import GridItem from "../../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../../components/GridItemInner";
import DeleteProductByUuid from "../../../../Domain/UseCases/ListProduct/DeleteProductByUuid";
import NewProductForm from "../../../../components/NewProductForm";
import I18n from "i18n-js";

interface ListProps {
  item: IProduct;
  tagUuid: string;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  deleteItem: (item: ItemInterface) => void;
  handleCloseBottomSheet: (tagUuid: string) => void;
}

function ListGridItem({
  item,
  tagUuid,
  setBottomSheetProps,
  deleteItem,
  handleCloseBottomSheet,
}: Readonly<ListProps>) {
  const colorScheme = useColorScheme();
  const { handleDeleteProduct, getTheme, getColor } = useShoppingListContext();
  const gridItemRef = useRef<any>();
  const handleCloseSwipeableFromParent = () => {
    // Access the handleCloseSwipeable function from the ref
    if (gridItemRef.current) {
      gridItemRef.current.handleCloseSwipeable();
    }
  };

  useEffect(() => {
    handleCloseSwipeableFromParent();
  }, [item.name]);

  const handleEdit = () => {
    setBottomSheetProps({
      height: "edit",
      children: (
        <NewProductForm
          action="editList"
          buttonText="edit"
          items={item}
          onClose={() => handleCloseBottomSheet(item.tag)}
        />
      ),
      isVisible: true,
    });
  };

  const handleDelete = () => {
    handleDeleteProduct(item.uuid);
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
        <GridItemInner row>
          <>
            <GridItemWrapperCol width={50}>
              <Styled.ButtonInner
                underlayColor={getColor().swipeIconUnderlay}
                onPress={handleEdit}
              >
                <>
                  <GridItemWrapperInner height={60}>
                    <Styled.ButtonTextIcon text={getColor().swipeIcon}>
                      <FontAwesome
                        size={18}
                        style={{ marginBottom: -3 }}
                        name="pencil"
                      />
                    </Styled.ButtonTextIcon>
                  </GridItemWrapperInner>

                  <GridItemWrapperInner height={40} justify={"flex-end"}>
                    <Text color={getColor().swipeIcon} align="center">
                      Editar
                    </Text>
                  </GridItemWrapperInner>
                </>
              </Styled.ButtonInner>
            </GridItemWrapperCol>

            <GridItemWrapperCol width={50}>
              <Styled.ButtonInner
                underlayColor={getColor().swipeIconUnderlay}
                onPress={handleDelete}
              >
                <>
                  <GridItemWrapperInner height={60}>
                    <Styled.ButtonTextIcon text={getColor().swipeIcon}>
                      <FontAwesome
                        size={18}
                        style={{ marginBottom: -3 }}
                        name="trash"
                      />
                    </Styled.ButtonTextIcon>
                  </GridItemWrapperInner>
                  <GridItemWrapperInner height={40} justify={"flex-end"}>
                    <Text color={getColor().swipeIcon} align="center">
                      {I18n.t("delete")}
                    </Text>
                  </GridItemWrapperInner>
                </>
              </Styled.ButtonInner>
            </GridItemWrapperCol>
          </>
        </GridItemInner>
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
        elevation={colorScheme === "light"}
      >
        <GridItemWrapperRow height={100}>
          <GridItemWrapperInner height={100}>
            <Title2 color={getColor().text}>{item.name}</Title2>
          </GridItemWrapperInner>
        </GridItemWrapperRow>
      </GridItemInner>
    </GridItem>
  );
}

export default React.memo(ListGridItem);
