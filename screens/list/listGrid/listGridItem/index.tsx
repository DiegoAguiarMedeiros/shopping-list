import { useColorScheme, Animated } from "react-native";
import Colors from "../../../../constants/Colors";
import * as Styled from "./styles";
import React, { useState } from "react";
import {
  BottomSheetProps,
  ItemInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../../../../types/types";
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

interface ListProps {
  item: ItemInterface;
  listId: string;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  deleteItem: (item: ItemInterface) => void;
}

function ListGridItem({
  item,
  listId,
  setBottomSheetProps,
  deleteItem,
}: ListProps) {
  const colorScheme = useColorScheme();
  const [active, setActive] = useState(false);
  const {
    list,
    setList,
    listItem,
    setListItem,
    setItemAmountList,
    itemAmountList,
    getAmountOfListItems,
  } = useShoppingListContext();

  const handleDelete = () => {
    deleteItem(item);
  };
  const handleEdit = () => {
    setBottomSheetProps({
      listId: item.uuid,
      items: item,
      buttonText: "edit",
      action: "editListItem",
      isVisible: true,
      onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
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
            onPress={handleEdit}
          >
            <>
              <Styled.ButtonTextIcon
                text={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
              >
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="pencil"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText
                text={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
              >
                Editar
              </Styled.ButtonText>
            </>
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
      return `${1 * 50 + 70}`;
    }
    if (height > 5) {
      return `${height * 50 + 90}`;
    }
    return `${height * 50 + 110}`;
  };

  return active ? (
    <Styled.ContainerListItemListItem
      underlayColor={Colors[colorScheme ?? "light"].listItemBackgroundColor}
      height={calcHeight(item.amount.length)}
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
                  item.amount.length > 0
                    ? Colors[colorScheme ?? "light"]
                        .listItemIconActiveColorActive
                    : Colors[colorScheme ?? "light"].listItemIconActiveColor
                }
                name={item.amount.length > 0 ? "check-circle-o" : "circle-o"}
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
                  Total: R${" "}
                  {getTotalAmount(getAmountOfListItems(item.amount)).toFixed(2)}
                </Text>
              </Styled.ContainerItemTextPriceTotal>
              <Styled.ContainerItemTextPriceTotal>
                <Text color={Colors[colorScheme ?? "light"].white}>
                  Un: {getTotalAmountUn(getAmountOfListItems(item.amount))}
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
          height={`${item.amount.length * 50 + 40}`}
          background={
            Colors[colorScheme ?? "light"].bodyAddPriceBackgroundColor
          }
        >
          <AddPriceUnit listId={listId} listItemId={item.uuid} />
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
                  item.amount.length > 0
                    ? Colors[colorScheme ?? "light"].listItemIconColorActive
                    : Colors[colorScheme ?? "light"].listItemIconColor
                }
                name={item.amount.length > 0 ? "check-circle-o" : "circle-o"}
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
                  Total: R${" "}
                  {getTotalAmount(getAmountOfListItems(item.amount)).toFixed(2)}
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
                  Un: {getTotalAmountUn(getAmountOfListItems(item.amount))}
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
