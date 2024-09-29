import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";
import React, { useState } from "react";

import { FontAwesome } from "@expo/vector-icons";

import { Title, Text, Title2 } from "../../../../components/Text";
import { useShoppingListContext } from "../../../../context/ShoppingList";

import AddPriceUnit from "../../../../components/addPriceUnit";
import { IProduct } from "../../../../Model/IProduct";
import GridItem from "../../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../../components/GridItemInner";
import GridItemNoSwipeable from "../../../../components/GridItemNoSwipeable";
import I18n from "i18n-js";
import IAmount from "../../../../Model/IAmount";
import { colorTheme } from "../../../../../constants/Colors";
import { IList } from "../../../../Model/IList";
import isEqual from "lodash.isequal";
import { useStores } from "../../../../context/StoreContext";

interface ListProps {
  item: IProduct;
  listId: string;
  filter: string;
  handleOpen: (uuid: string) => void;
  handleClose: () => void;
  active: boolean;
  color: colorTheme;
  totalUpdate: (total: number, amount: number, un: number) => void;
  setList: React.Dispatch<React.SetStateAction<IList>>;
}

function ListGridItem({
  color,
  item,
  listId,
  handleOpen,
  handleClose,
  active,
  totalUpdate,
  setList,
  filter,
}: ListProps) {
  const colorScheme = useColorScheme();
  const { getCurrency } = useShoppingListContext();
  const listProductUuid = `${listId}-${item.uuid}`;
  const { AmountRepository, ProductRepository } = useStores();
  const handleDelete = () => {
    ProductRepository.removeItemFromlist(item.uuid);
    AmountRepository.removeAllItems(listProductUuid);
    ProductRepository.load();
    ProductRepository.updateTotal();
    ProductRepository.updateTotalUn();
    ProductRepository.updateTotalWithAmount();
    ProductRepository.updateTotalWithoutAmount();
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
  }

  const itemHeights = [115, 180, 240, 280, 330];
  const heights = [46.99, 68.5, 77.5, 81, 84];

  const showUnitFromAmount = (amounts: IAmount[]): string => {
    let checkUnit: boolean = true;
    let unit: string = "Un";
    let quantity: number = 0;
    amounts.forEach((amount) => {
      if (checkUnit) unit = amount.type ? "Kg" : "Un";
      if (!amount.type) checkUnit = false;
      quantity = Number(quantity) + Number(amount.quantity);
    });
    if (unit === "Un") return `${unit}: ${quantity.toFixed(0)}`;
    return `${unit}: ${quantity.toFixed(3)}`;
  };

  return active ? (
    <GridItemNoSwipeable>
      <GridItemInner
        underlayColor={color.itemListItemOpenBackgroundUnderlay}
        borderColor={color.itemListItemOpenBackgroundBorder}
        background={color.itemListItemOpenBackground}
        height={itemHeights[item.amount.length > 4 ? 4 : item.amount.length]}
        row
        elevation={colorScheme === "light"}
      >
        <GridItemWrapperCol width={100} justify="flex-end">
          <GridItemWrapperRow height={100} maxHeight={50} justify="flex-end">
            <GridItemWrapperInner width={10} height={100}>
              <Title color={color.itemListItemOpenIcon}>
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  color={
                    item.amount.length > 0
                      ? color.itemListItemOpenIconFilled
                      : color.itemListItemOpenIcon
                  }
                  name={item.amount.length > 0 ? "check-circle-o" : "circle-o"}
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
                  <Title2 color={color.itemListItemOpenText}>
                    {item.name}
                  </Title2>
                </GridItemWrapperInner>
                <GridItemWrapperRow height={50}>
                  <GridItemWrapperInner
                    width={50}
                    height={100}
                    justify="flex-start"
                  >
                    <Text color={color.itemListItemOpenTextSecondary}>
                      {I18n.t("total")}: {getCurrency()} {item.total}
                    </Text>
                  </GridItemWrapperInner>
                  <GridItemWrapperInner
                    width={50}
                    height={100}
                    justify="flex-start"
                  >
                    <Text color={color.itemListItemOpenTextSecondary}>
                      {showUnitFromAmount(item.amount)}
                    </Text>
                  </GridItemWrapperInner>
                </GridItemWrapperRow>
              </GridItemWrapperCol>
            </GridItemWrapperInner>
            <GridItemWrapperInner width={10} height={100}>
              <Title color={color.text} align="right">
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
            height={heights[item.amount.length >= 4 ? 4 : item.amount.length]}
            justify="flex-end"
          >
            <GridItemWrapperCol width={100}>
              <AddPriceUnit
                amounts={item.amount}
                totalUpdate={totalUpdate}
                color={color}
                listProductUuid={listProductUuid}
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
        underlayColor={color.itemListBackgroundUnderlay}
        borderColor={color.itemListBackgroundBorder}
        background={color.itemListBackground}
        height={70}
        row
        elevation={colorScheme === "light"}
      >
        <GridItemWrapperRow height={100} maxHeight={60} justify="flex-end">
          <GridItemWrapperInner width={10} height={100}>
            <Title color={color.text}>
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                color={
                  item.amount.length > 0
                    ? color.itemListIconFilled
                    : color.itemListIcon
                }
                name={item.amount.length > 0 ? "check-circle-o" : "circle-o"}
              />
            </Title>
          </GridItemWrapperInner>
          <GridItemWrapperInner width={80} height={100}>
            <GridItemWrapperCol width={100}>
              <GridItemWrapperInner width={100} height={50} justify="flex-end">
                <Title2 color={color.text}>{item.name}</Title2>
              </GridItemWrapperInner>
              <GridItemWrapperRow height={50}>
                <GridItemWrapperInner
                  width={50}
                  height={100}
                  justify="flex-start"
                >
                  <Text color={color.textSecondary}>
                    {I18n.t("total")}: {getCurrency()} {item.total}
                  </Text>
                </GridItemWrapperInner>
                <GridItemWrapperInner
                  width={50}
                  height={100}
                  justify="flex-start"
                >
                  <Text color={color.textSecondary}>
                    {showUnitFromAmount(item.amount)}
                  </Text>
                </GridItemWrapperInner>
              </GridItemWrapperRow>
            </GridItemWrapperCol>
          </GridItemWrapperInner>
          <GridItemWrapperInner width={10} height={100}>
            <Title color={color.text} align="right">
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

export default React.memo(ListGridItem, (prevProps, nextProps) => {
  return (
    isEqual(prevProps.active, nextProps.active) &&
    isEqual(prevProps.item.amount, nextProps.item.amount)
  );
});
