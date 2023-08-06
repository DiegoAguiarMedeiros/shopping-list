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
import { Title } from "../../../../components/Text";
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
          height: 100,
          overflow: "hidden",
        }}
      >
        <Styled.ButtonView>
          <Styled.ButtonInner
            underlayColor={
              Colors[colorScheme ?? "light"].backgroundTouchableHighlight
            }
            onPress={handleEdit}
          >
            <>
              <Styled.ButtonTextIcon
                text={Colors[colorScheme ?? "light"].textButton}
              >
                <FontAwesome
                  size={24}
                  style={{ marginBottom: -3 }}
                  name="pencil"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText
                text={Colors[colorScheme ?? "light"].textButton}
              >
                Editar
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
          <Styled.ButtonInner
            underlayColor={
              Colors[colorScheme ?? "light"].backgroundTouchableHighlight
            }
            onPress={handleDelete}
          >
            <>
              <Styled.ButtonTextIcon
                text={Colors[colorScheme ?? "light"].textButton}
              >
                <FontAwesome
                  size={24}
                  style={{ marginBottom: -3 }}
                  name="trash"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText
                text={Colors[colorScheme ?? "light"].textButton}
              >
                Deletar
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
        </Styled.ButtonView>
      </Animated.View>
    );
  }

  return active ? (
    <Styled.ContainerListItemListItem
      underlayColor={
        Colors[colorScheme ?? "light"].backgroundTouchableHighlight
      }
      height={
        item.amount.length > 5
          ? `${item.amount.length * 50 + 90}`
          : `${item.amount.length * 50 + 110}`
      }
      borderColor={Colors[colorScheme ?? "light"].backgroundHeader}
      background={
        active
          ? Colors[colorScheme ?? "light"].backgroundLighterActive
          : Colors[colorScheme ?? "light"].backgroundLighter
      }
    >
      <>
        <Styled.ContainerListItemListItemInner>
          <Styled.ContainerItemTextIcon>
            <Title>
              <FontAwesome
                onPress={handleOpen}
                size={28}
                style={{ marginBottom: -3 }}
                color={
                  item.amount.length > 0
                    ? Colors[colorScheme ?? "light"].primary
                    : Colors[colorScheme ?? "light"].secondary
                }
                name={item.amount.length > 0 ? "check-circle-o" : "circle-o"}
              />
            </Title>
          </Styled.ContainerItemTextIcon>
          <Styled.ContainerListItemListItemHead>
            <Styled.ContainerItemTextTitle>
              <Title>{item.name}</Title>
            </Styled.ContainerItemTextTitle>
            <Styled.ContainerListItemListItemBody>
              <Styled.ContainerItemTextPriceTotal
                text={Colors[colorScheme ?? "light"].textButton}
              >
                Total: R${" "}
                {getTotalAmount(getAmountOfListItems(item.amount)).toFixed(2)}
              </Styled.ContainerItemTextPriceTotal>
              <Styled.ContainerItemTextPriceTotal
                text={Colors[colorScheme ?? "light"].textButton}
              >
                Un: {getTotalAmountUn(getAmountOfListItems(item.amount))}
              </Styled.ContainerItemTextPriceTotal>
            </Styled.ContainerListItemListItemBody>
          </Styled.ContainerListItemListItemHead>
          <Styled.ContainerItemTextIcon>
            <Title>
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
          background={Colors[colorScheme ?? "light"].backgroundLighterActive}
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
          Colors[colorScheme ?? "light"].backgroundTouchableHighlight
        }
        borderColor={Colors[colorScheme ?? "light"].backgroundHeader}
        background={
          active
            ? Colors[colorScheme ?? "light"].backgroundLighterActive
            : Colors[colorScheme ?? "light"].backgroundLighter
        }
      >
        <Styled.ContainerListItemListItemInner>
          <Styled.ContainerItemTextIcon>
            <Title>
              <FontAwesome
                onPress={handleOpen}
                size={28}
                style={{ marginBottom: -3 }}
                color={
                  item.amount.length > 0
                    ? Colors[colorScheme ?? "light"].primary
                    : Colors[colorScheme ?? "light"].secondary
                }
                name={item.amount.length > 0 ? "check-circle-o" : "circle-o"}
              />
            </Title>
          </Styled.ContainerItemTextIcon>
          <Styled.ContainerListItemListItemHead>
            <Styled.ContainerItemTextTitle>
              <Title>{item.name}</Title>
            </Styled.ContainerItemTextTitle>
            <Styled.ContainerListItemListItemBody>
              <Styled.ContainerItemTextPriceTotal
                text={Colors[colorScheme ?? "light"].textButton}
              >
                Total: R${" "}
                {getTotalAmount(getAmountOfListItems(item.amount)).toFixed(2)}
              </Styled.ContainerItemTextPriceTotal>
              <Styled.ContainerItemTextPriceTotal
                text={Colors[colorScheme ?? "light"].textButton}
              >
                Un: {getTotalAmountUn(getAmountOfListItems(item.amount))}
              </Styled.ContainerItemTextPriceTotal>
            </Styled.ContainerListItemListItemBody>
          </Styled.ContainerListItemListItemHead>
          <Styled.ContainerItemTextIcon>
            <Title>
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
