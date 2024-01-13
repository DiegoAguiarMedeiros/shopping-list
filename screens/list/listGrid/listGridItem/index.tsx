import { useColorScheme, Animated } from "react-native";
import Colors from "../../../../constants/Colors";
import * as Styled from "./styles";
import React, { useState } from "react";
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
import { GridItemInner, GridItemWrapperCol, GridItemWrapperInner, GridItemWrapperRow } from "../../../../components/GridItemInner";

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
  active
}: ListProps) {
  const colorScheme = useColorScheme();
  const {
    list,
    listProduct,
    handleDeleteProductFromList
  } = useShoppingListContext();
  const listIditemuuid = `${listId}-${item.uuid}`;

  const listArrItems = getAmountByListProductUuidController.handle(listIditemuuid);
  const total = getTotlaAmountByListProductUuidController.handle(listIditemuuid);
  const quantity = getTotalQuantityAmountByListProductUuidController.handle(listIditemuuid);

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
          overflow: "hidden"
        }}
      >
        <Styled.ButtonView>
          <Styled.ButtonInner
            underlayColor={
              Colors[colorScheme ?? "light"]
                .swipeIcon
            }
            onPress={handleDelete}
          >
            <>
              <Styled.ButtonTextIcon
                text={Colors[colorScheme ?? "light"].swipeIcon}
              >
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="trash"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText
                text={Colors[colorScheme ?? "light"].swipeIcon}
              >
                Deletar
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
        </Styled.ButtonView>
      </Animated.View>
    );
  }

  const calcHeight = (height: number): number => {
    if (height === 0) {
      return 1 * 40 + 60;
    }
    if (height > 4) {
      return 310;
    }
    return height * 50 + 110;
  };

  const heightsUp = [54, 32.1, 24.5, 19.5, 16.2];
  const heights = [46, 67.8, 75.5, 80.5, 83.8];

  return active === item.uuid ? (
    <GridItemInner
      underlayColor={Colors[colorScheme ?? "light"].itemListItemOpenBackgroundUnderlay}

      borderColor={Colors[colorScheme ?? "light"].itemListItemOpenBackgroundBorder}
      background={Colors[colorScheme ?? "light"].itemListItemOpenBackground}
      height={calcHeight(listArrItems.length)}
      row
    >
      <GridItemWrapperCol width={100} justify="flex-end">
        <GridItemWrapperRow height={heightsUp[listArrItems.length >= 4 ? 4 : listArrItems.length]} justify="flex-end">
          <GridItemWrapperInner width={10} height={100}>

            <Title
              color={Colors[colorScheme ?? "light"].itemListItemOpenIcon}
            >
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                color={
                  listArrItems.length > 0
                    ? Colors[colorScheme ?? "light"].itemListItemOpenIconFilled
                    : Colors[colorScheme ?? "light"].itemListItemOpenIcon
                }
                name={listArrItems.length > 0 ? "check-circle-o" : "circle-o"}
              />
            </Title>
          </GridItemWrapperInner>
          <GridItemWrapperInner width={80} height={100}>
            <GridItemWrapperCol width={100}>
              <GridItemWrapperInner width={100} height={50}>
                <Title2
                  color={Colors[colorScheme ?? "light"].itemListItemOpenText}
                >
                  {item.name}
                </Title2>
              </GridItemWrapperInner>
              <GridItemWrapperRow height={50}>
                <GridItemWrapperInner width={50} height={100}>


                  <Text
                    color={Colors[colorScheme ?? "light"].itemListItemOpenTextSecondary}
                  >
                    Total: R$ {total.toFixed(2).replace(".", ",")}
                  </Text>
                </GridItemWrapperInner>
                <GridItemWrapperInner width={50} height={100}>
                  <Text
                    color={Colors[colorScheme ?? "light"].itemListItemOpenTextSecondary}
                  >
                    Un: {listArrItems.length === 0 ? listArrItems.length : quantity}
                  </Text>
                </GridItemWrapperInner>
              </GridItemWrapperRow>

            </GridItemWrapperCol>
          </GridItemWrapperInner>
          <GridItemWrapperInner width={10} height={100}>
            <Title
              color={Colors[colorScheme ?? "light"].text}
            >
              <FontAwesome
                onPress={() => handleClose()}
                size={28}
                style={{ marginBottom: -3 }}
                name="angle-up"
              />
            </Title>
          </GridItemWrapperInner>
        </GridItemWrapperRow>
        <GridItemWrapperRow height={heights[listArrItems.length >= 4 ? 4 : listArrItems.length]} justify="flex-end">
          <GridItemWrapperCol width={100}>
            <AddPriceUnit listProductUuid={listIditemuuid} listArrItems={listArrItems} />
          </GridItemWrapperCol>
        </GridItemWrapperRow>
      </GridItemWrapperCol>
    </GridItemInner>

  ) : (
    <GridItem
      renderRightActions={RightSwipe}
      leftThreshold={undefined} rightThreshold={100}>
      <GridItemInner
        onPress={() => handleOpen(item.uuid)}
        underlayColor={Colors[colorScheme ?? "light"].backgroundSecondary}
        borderColor={
          Colors[colorScheme ?? "light"].backgroundSecondary
        }
        background={Colors[colorScheme ?? "light"].backgroundSecondary}
        height={60}
        row
      >
        <GridItemWrapperRow height={100} justify="flex-end">
          <GridItemWrapperInner width={10} height={100}>

            <Title
              color={Colors[colorScheme ?? "light"].text}
            >
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                color={
                  listArrItems.length > 0
                    ? Colors[colorScheme ?? "light"].itemListIconFilled
                    : Colors[colorScheme ?? "light"].itemListIcon
                }
                name={listArrItems.length > 0 ? "check-circle-o" : "circle-o"}
              />
            </Title>
          </GridItemWrapperInner>
          <GridItemWrapperInner width={80} height={100}>
            <GridItemWrapperCol width={100}>
              <GridItemWrapperInner width={100} height={50}>
                <Title2
                  color={Colors[colorScheme ?? "light"].text}
                >
                  {item.name}
                </Title2>
              </GridItemWrapperInner>
              <GridItemWrapperRow height={50}>
                <GridItemWrapperInner width={50} height={100}>


                  <Text
                    color={Colors[colorScheme ?? "light"].textSecondary}
                  >
                    Total: R$ {total.toFixed(2).replace(".", ",")}
                  </Text>
                </GridItemWrapperInner>
                <GridItemWrapperInner width={50} height={100}>
                  <Text
                    color={Colors[colorScheme ?? "light"].textSecondary}
                  >
                    Un: {listArrItems.length === 0 ? listArrItems.length : quantity}
                  </Text>
                </GridItemWrapperInner>
              </GridItemWrapperRow>

            </GridItemWrapperCol>
          </GridItemWrapperInner>
          <GridItemWrapperInner width={10} height={100}>
            <Title
              color={Colors[colorScheme ?? "light"].text}
            >
              <FontAwesome
                onPress={() => handleOpen(item.uuid)}
                size={28}
                style={{ marginBottom: -3 }}
                name="angle-down"
              />
            </Title>
          </GridItemWrapperInner>
        </GridItemWrapperRow>
      </GridItemInner >
    </GridItem >
  );
}

export default React.memo(ListGridItem);
