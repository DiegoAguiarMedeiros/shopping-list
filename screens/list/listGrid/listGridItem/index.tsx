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
import IAmount from "../../../../Domain/Model/IAmount";
import GridItemNoSwipeable from "../../../../components/GridItemNoSwipeable";
import I18n from "i18n-js";

interface ListProps {
  item: IProduct;
  listId: string;
  handleOpen: (uuid: string) => void;
  handleClose: () => void;
  active: string;
}

function ListGridItem({
  item,
  listId,
  handleOpen,
  handleClose,
  active,
}: ListProps) {
  const colorScheme = useColorScheme();
  const {
    getTheme,
    listProduct,
    handleDeleteProductFromList,
    getCurrency,
    getColor,
  } = useShoppingListContext();
  const listIditemuuid = `${listId}-${item.uuid}`;

  const listArrItems =
    getAmountByListProductUuidController.handle(listIditemuuid);
  const total =
    getTotlaAmountByListProductUuidController.handle(listIditemuuid);
  const quantity =
    getTotalQuantityAmountByListProductUuidController.handle(listIditemuuid);

  const handleDelete = () => {
    handleDeleteProductFromList(listId, item.uuid);
  };

  function RightSwipe(
    progress: any,
    dragX: {
      interpolate: (arg0: {
        inputRange: number[];
        outputRange: number[];
      }) => any;
    }
  ) {
    return (
      <Animated.View
        style={{
          width: 100,
          overflow: "hidden",
        }}
      >
        <Styled.ButtonView>
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
  }

  const itemHeights = [115, 180, 240, 280, 330];
  const heights = [46.99, 68.5, 77.5, 81, 84];

  const showUnitFromAmount = (amounts: IAmount[]): string => {
    let checkUnit: boolean = true;
    let unit: string = "Un";
    let quantity: Number = 0;
    amounts.forEach((amount) => {
      if (checkUnit) unit = amount.type ? "Kg" : "Un";
      if (!amount.type) checkUnit = false;
      quantity = Number(quantity) + Number(amount.quantity);
    });
    if (unit === "Un") return `${unit}: ${quantity.toFixed(0)}`;
    return `${unit}: ${quantity.toFixed(3)}`;
  };

  return active === item.uuid ? (
    <GridItemNoSwipeable>
      <GridItemInner
        underlayColor={getColor().itemListItemOpenBackgroundUnderlay}
        borderColor={getColor().itemListItemOpenBackgroundBorder}
        background={getColor().itemListItemOpenBackground}
        height={itemHeights[listArrItems.length > 4 ? 4 : listArrItems.length]}
        row
        elevation={colorScheme === "light"}
      >
        <GridItemWrapperCol width={100} justify="flex-end">
          <GridItemWrapperRow height={100} maxHeight={50} justify="flex-end">
            <GridItemWrapperInner width={10} height={100}>
              <Title color={getColor().itemListItemOpenIcon}>
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  color={
                    listArrItems.length > 0
                      ? getColor().itemListItemOpenIconFilled
                      : getColor().itemListItemOpenIcon
                  }
                  name={listArrItems.length > 0 ? "check-circle-o" : "circle-o"}
                />
              </Title>
            </GridItemWrapperInner>
            <GridItemWrapperInner width={80} height={100}>
              <GridItemWrapperCol width={100}>
                <GridItemWrapperInner
                  width={100}
                  height={50}
                  justify="flex-end"
                >
                  <Title2 color={getColor().itemListItemOpenText}>
                    {item.name}
                  </Title2>
                </GridItemWrapperInner>
                <GridItemWrapperRow height={50}>
                  <GridItemWrapperInner
                    width={50}
                    height={100}
                    justify="flex-start"
                  >
                    <Text color={getColor().itemListItemOpenTextSecondary}>
                      {I18n.t("total")}: {getCurrency()}{" "}
                      {total.toFixed(2).replace(".", ",")}
                    </Text>
                  </GridItemWrapperInner>
                  <GridItemWrapperInner
                    width={50}
                    height={100}
                    justify="flex-start"
                  >
                    <Text color={getColor().itemListItemOpenTextSecondary}>
                      {showUnitFromAmount(listArrItems)}
                    </Text>
                  </GridItemWrapperInner>
                </GridItemWrapperRow>
              </GridItemWrapperCol>
            </GridItemWrapperInner>
            <GridItemWrapperInner width={10} height={100}>
              <Title color={getColor().text} align="right">
                <FontAwesome
                  onPress={() => handleClose()}
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="angle-up"
                />
              </Title>
            </GridItemWrapperInner>
          </GridItemWrapperRow>
          <GridItemWrapperRow
            height={heights[listArrItems.length >= 4 ? 4 : listArrItems.length]}
            justify="flex-end"
          >
            <GridItemWrapperCol width={100}>
              <AddPriceUnit
                listProductUuid={listIditemuuid}
                listArrItems={listArrItems}
              />
            </GridItemWrapperCol>
          </GridItemWrapperRow>
        </GridItemWrapperCol>
      </GridItemInner>
    </GridItemNoSwipeable>
  ) : (
    <GridItem
      renderRightActions={RightSwipe}
      leftThreshold={undefined}
      rightThreshold={100}
    >
      <GridItemInner
        onPress={() => handleOpen(item.uuid)}
        underlayColor={getColor().itemListBackgroundUnderlay}
        borderColor={getColor().itemListBackgroundBorder}
        background={getColor().itemListBackground}
        height={70}
        row
        elevation={colorScheme === "light"}
      >
        <GridItemWrapperRow height={100} maxHeight={60} justify="flex-end">
          <GridItemWrapperInner width={10} height={100}>
            <Title color={getColor().text}>
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                color={
                  listArrItems.length > 0
                    ? getColor().itemListIconFilled
                    : getColor().itemListIcon
                }
                name={listArrItems.length > 0 ? "check-circle-o" : "circle-o"}
              />
            </Title>
          </GridItemWrapperInner>
          <GridItemWrapperInner width={80} height={100}>
            <GridItemWrapperCol width={100}>
              <GridItemWrapperInner width={100} height={50} justify="flex-end">
                <Title2 color={getColor().text}>{item.name}</Title2>
              </GridItemWrapperInner>
              <GridItemWrapperRow height={50}>
                <GridItemWrapperInner
                  width={50}
                  height={100}
                  justify="flex-start"
                >
                  <Text color={getColor().textSecondary}>
                    {I18n.t("total")}: {getCurrency()}{" "}
                    {total.toFixed(2).replace(".", ",")}
                  </Text>
                </GridItemWrapperInner>
                <GridItemWrapperInner
                  width={50}
                  height={100}
                  justify="flex-start"
                >
                  <Text color={getColor().textSecondary}>
                    {showUnitFromAmount(listArrItems)}
                  </Text>
                </GridItemWrapperInner>
              </GridItemWrapperRow>
            </GridItemWrapperCol>
          </GridItemWrapperInner>
          <GridItemWrapperInner width={10} height={100}>
            <Title color={getColor().text} align="right">
              <FontAwesome
                onPress={() => handleOpen(item.uuid)}
                size={28}
                style={{ marginBottom: -3 }}
                name="angle-down"
              />
            </Title>
          </GridItemWrapperInner>
        </GridItemWrapperRow>
      </GridItemInner>
    </GridItem>
  );
}

export default React.memo(ListGridItem);
