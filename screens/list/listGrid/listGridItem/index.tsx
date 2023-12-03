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
import { Title, Text } from "../../../../components/Text";
import { useShoppingListContext } from "../../../../context/ShoppingList";

import AddPriceUnit from "../../../addPriceUnit";
import NewItemForm from "../../../../components/NewItemForm";
import { IProduct } from "../../../../Domain/Model/IProduct";
import getAmountByListProductUuidController from "../../../../Domain/UseCases/Amount/GetAmountByListProductUuid";
import getTotlaAmountByListProductUuidController from "../../../../Domain/UseCases/Amount/GetTotalAmountByListProductUuid";
import getTotalQuantityAmountByListProductUuidController from "../../../../Domain/UseCases/Amount/GetTotalQuantityAmountByListProductUuid";
import deleteProductFromListByUuidController from "../../../../Domain/UseCases/List/DeleteProductFromListByUuid";


interface ListProps {
  item: IProduct;
  listId: string;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  deleteItem: (item: ItemInterface) => void;
  handleCloseBottomSheet: () => void;
}

function ListGridItem({
  item,
  listId,
  setBottomSheetProps,
  deleteItem,
  handleCloseBottomSheet,
}: ListProps) {
  const colorScheme = useColorScheme();
  const [active, setActive] = useState(false);
  const {
    list,
    setList,
    listProduct,
    setListProduct,
  } = useShoppingListContext();
  const listIditemuuid = `${listId}-${item.uuid}`;

  const listArrItems = getAmountByListProductUuidController.handle(listIditemuuid);
  const total = getTotlaAmountByListProductUuidController.handle(listIditemuuid);
  const quantity = getTotalQuantityAmountByListProductUuidController.handle(listIditemuuid);

  const handleDelete = () => {
    deleteProductFromListByUuidController.handle(listId, item.uuid);
    const updatedList: IProduct[] = JSON.parse(JSON.stringify(listProduct));
    const newList = updatedList.filter(product => product.uuid !== item.uuid)
    setListProduct(newList);
  };
  const handleEdit = () => {
    setBottomSheetProps({
      isVisible: true,
      height: "edit",
      children: (
        <NewItemForm
          onClose={handleCloseBottomSheet}
          action="editListItem"
          buttonText="edit"
          listId={listId}
        />
      ),
    });
  };

  const handleOpen = () => {
    setActive(!active);
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
          width: 200,
          overflow: "hidden",
        }}
      >
        <Styled.ButtonView>
          <Styled.ButtonInner
            underlayColor={
              Colors[colorScheme ?? "light"]
                .swipeablebuttonTouchableHighlightBackgroundColor
            }
          >
            <></>
          </Styled.ButtonInner>
          <Styled.ButtonInner
            underlayColor={
              Colors[colorScheme ?? "light"]
                .swipeablebuttonTouchableHighlightBackgroundColor
            }
            onPress={handleDelete}
          >
            <>
              <Styled.ButtonTextIcon
                text={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
              >
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="trash"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText
                text={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
              >
                Deletar
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
        </Styled.ButtonView>
      </Animated.View>
    );
  }

  const calcHeight = (height: number): string => {
    if (height === 0) {
      return `${1 * 50 + 60}`;
    }
    if (height > 5) {
      return `${height * 50 + 90}`;
    }
    return `${height * 50 + 110}`;
  };

  return active ? (
    <Styled.ContainerListItemListItem
      underlayColor={Colors[colorScheme ?? "light"].listItemBackgroundColor}
      height={calcHeight(listArrItems.length)}
      borderColor={Colors[colorScheme ?? "light"].listItemBackgroundColor}
      background={Colors[colorScheme ?? "light"].listItemActiveBackgroundColor}
    >
      <>
        <Styled.ContainerListItemListItemInner>
          <Styled.ContainerItemTextIcon>
            <Title color={Colors[colorScheme ?? "light"].white}>
              <FontAwesome
                onPress={handleOpen}
                size={28}
                style={{ marginBottom: -3 }}
                color={
                  listArrItems.length > 0
                    ? Colors[colorScheme ?? "light"]
                      .listItemIconActiveColorActive
                    : Colors[colorScheme ?? "light"].listItemIconActiveColor
                }
                name={listArrItems.length > 0 ? "check-circle-o" : "circle-o"}
              />
            </Title>
          </Styled.ContainerItemTextIcon>
          <Styled.ContainerListItemListItemHead>
            <Styled.ContainerItemTextTitle>
              <Title color={Colors[colorScheme ?? "light"].white}>
                {item.name}
              </Title>
            </Styled.ContainerItemTextTitle>
            <Styled.ContainerListItemListItemBody>
              <Styled.ContainerItemTextPriceTotal>
                <Text color={Colors[colorScheme ?? "light"].white}>
                  Total: R$ {total}
                </Text>
              </Styled.ContainerItemTextPriceTotal>
              <Styled.ContainerItemTextPriceTotal>
                <Text color={Colors[colorScheme ?? "light"].white}>
                  Un: {quantity}
                </Text>
              </Styled.ContainerItemTextPriceTotal>
            </Styled.ContainerListItemListItemBody>
          </Styled.ContainerListItemListItemHead>
          <Styled.ContainerItemTextIcon>
            <Title color={Colors[colorScheme ?? "light"].white}>
              <FontAwesome
                onPress={handleOpen}
                size={28}
                style={{ marginBottom: -3 }}
                name="angle-up"
              />
            </Title>
          </Styled.ContainerItemTextIcon>
        </Styled.ContainerListItemListItemInner>
        <Styled.ContainerListItemListItemAMount
          height={`${listArrItems.length * 50 + 40}`}
          background={
            Colors[colorScheme ?? "light"].bodyAddPriceBackgroundColor
          }
        >
          <AddPriceUnit listProductUuid={listIditemuuid} listArrItems={listArrItems} />
        </Styled.ContainerListItemListItemAMount>
      </>
    </Styled.ContainerListItemListItem>
  ) : (
    <Swipeable renderRightActions={RightSwipe} rightThreshold={100}>
      <Styled.ContainerListItemListItem
        height="60"
        underlayColor={
          Colors[colorScheme ?? "light"].listItemActiveBackgroundColor
        }
        borderColor={Colors[colorScheme ?? "light"].listItemBackgroundColor}
        background={Colors[colorScheme ?? "light"].listItemBackgroundColor}
      >
        <Styled.ContainerListItemListItemInner>
          <Styled.ContainerItemTextIcon>
            <Title
              color={
                colorScheme !== "dark"
                  ? Colors[colorScheme ?? "light"].black
                  : Colors[colorScheme ?? "light"].white
              }
            >
              <FontAwesome
                onPress={handleOpen}
                size={28}
                style={{ marginBottom: -3 }}
                color={
                  listArrItems.length > 0
                    ? Colors[colorScheme ?? "light"].listItemIconColorActive
                    : Colors[colorScheme ?? "light"].listItemIconColor
                }
                name={listArrItems.length > 0 ? "check-circle-o" : "circle-o"}
              />
            </Title>
          </Styled.ContainerItemTextIcon>
          <Styled.ContainerListItemListItemHead>
            <Styled.ContainerItemTextTitle>
              <Title
                color={
                  colorScheme !== "dark"
                    ? Colors[colorScheme ?? "light"].black
                    : Colors[colorScheme ?? "light"].white
                }
              >
                {item.name}
              </Title>
            </Styled.ContainerItemTextTitle>
            <Styled.ContainerListItemListItemBody>
              <Styled.ContainerItemTextPriceTotal>
                <Text
                  color={
                    colorScheme !== "dark"
                      ? Colors[colorScheme ?? "light"].black
                      : Colors[colorScheme ?? "light"].white
                  }
                >
                  Total: R$ {total}
                </Text>
              </Styled.ContainerItemTextPriceTotal>
              <Styled.ContainerItemTextPriceTotal>
                <Text
                  color={
                    colorScheme !== "dark"
                      ? Colors[colorScheme ?? "light"].black
                      : Colors[colorScheme ?? "light"].white
                  }
                >
                  Un: {quantity}
                </Text>
              </Styled.ContainerItemTextPriceTotal>
            </Styled.ContainerListItemListItemBody>
          </Styled.ContainerListItemListItemHead>
          <Styled.ContainerItemTextIcon>
            <Title
              color={
                colorScheme !== "dark"
                  ? Colors[colorScheme ?? "light"].black
                  : Colors[colorScheme ?? "light"].white
              }
            >
              <FontAwesome
                onPress={handleOpen}
                size={28}
                style={{ marginBottom: -3 }}
                name="angle-down"
              />
            </Title>
          </Styled.ContainerItemTextIcon>
        </Styled.ContainerListItemListItemInner>
      </Styled.ContainerListItemListItem>
    </Swipeable>
  );
}

export default React.memo(ListGridItem);
