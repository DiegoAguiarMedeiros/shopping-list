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

interface ListProps {
  item: IProduct;
  listId: string;
  filter: string;
  handleOpen: (uuid: string) => void;
  handleClose: () => void;
  active: string;
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
  const {
    handleDeleteProductFromList,
    getCurrency,
    getTotalAmountByListProductUuid,
    getAmountByListProductUuid,
    getListByUuid,
  } = useShoppingListContext();
  const listProductUuid = `${listId}-${item.uuid}`;
  const total = getTotalAmountByListProductUuid(listProductUuid);

  const [listArrAmountItems, setListArrAmountItems] = useState<IAmount[]>(
    getAmountByListProductUuid(listProductUuid)
  );
  const handleDelete = () => {
    handleDeleteProductFromList(listId, item.uuid);
    const list = getListByUuid(listId);
    setList(list);
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

  return active === item.uuid ? (
    <GridItemNoSwipeable>
      <GridItemInner
        underlayColor={color.itemListItemOpenBackgroundUnderlay}
        borderColor={color.itemListItemOpenBackgroundBorder}
        background={color.itemListItemOpenBackground}
        height={
          itemHeights[
            listArrAmountItems.length > 4 ? 4 : listArrAmountItems.length
          ]
        }
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
                    listArrAmountItems.length > 0
                      ? color.itemListItemOpenIconFilled
                      : color.itemListItemOpenIcon
                  }
                  name={
                    listArrAmountItems.length > 0
                      ? "check-circle-o"
                      : "circle-o"
                  }
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
                      {I18n.t("total")}: {getCurrency()}{" "}
                      {total.toFixed(2).replace(".", ",")}
                    </Text>
                  </GridItemWrapperInner>
                  <GridItemWrapperInner
                    width={50}
                    height={100}
                    justify="flex-start"
                  >
                    <Text color={color.itemListItemOpenTextSecondary}>
                      {showUnitFromAmount(listArrAmountItems)}
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
            height={
              heights[
                listArrAmountItems.length >= 4 ? 4 : listArrAmountItems.length
              ]
            }
            justify="flex-end"
          >
            <GridItemWrapperCol width={100}>
              <AddPriceUnit
                filter={filter}
                totalUpdate={totalUpdate}
                setListArrAmountItems={setListArrAmountItems}
                color={color}
                listProductUuid={listProductUuid}
                listArrAmountItems={listArrAmountItems}
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
                  listArrAmountItems.length > 0
                    ? color.itemListIconFilled
                    : color.itemListIcon
                }
                name={
                  listArrAmountItems.length > 0 ? "check-circle-o" : "circle-o"
                }
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
                    {I18n.t("total")}: {getCurrency()}{" "}
                    {total.toFixed(2).replace(".", ",")}
                  </Text>
                </GridItemWrapperInner>
                <GridItemWrapperInner
                  width={50}
                  height={100}
                  justify="flex-start"
                >
                  <Text color={color.textSecondary}>
                    {showUnitFromAmount(listArrAmountItems)}
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

export default React.memo(ListGridItem);
