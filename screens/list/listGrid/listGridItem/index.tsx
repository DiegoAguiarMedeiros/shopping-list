import { useColorScheme, Animated } from "react-native";
import Colors from "../../../../constants/Colors";
import * as Styled from "./styles";
import React, { lazy, useState } from "react";
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

const AddPriceUnit = lazy(() => import("../../../addPriceUnit"));

interface ListProps {
  item: ItemInterface;
  listId: string;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
}

function ListGridItem({ item, listId, setBottomSheetProps }: ListProps) {
  const colorScheme = useColorScheme();
  const [active, setActive] = useState(false);
  const {
    list,
    setList,
    listItem,
    setListItem,
    setItemAmountList,
    itemAmountList,
    getListItemsOfList,
    getAmountOfListItems,
  } = useShoppingListContext();

  const deleteItem = () => {
    const updatedList: ListItemInterface = JSON.parse(JSON.stringify(listItem));
    handleDeleteAmountInList(updatedList[item.uuid].amount);
    delete updatedList[item.uuid];
    setListItem(updatedList);
    handleDeleteItemListFromList(updatedList);
  };
  const handleDeleteAmountInList = (itemAmountUuid: string[]): void => {
    itemAmountUuid.forEach((i) => {
      const updatedList: ListItemAmountInterface = JSON.parse(
        JSON.stringify(itemAmountList)
      );
      delete updatedList[i];
      setItemAmountList(updatedList);
    });
  };
  const handleDeleteItemListFromList = (
    updatedList: ListItemInterface
  ): void => {
    const updatedListItem: ListType = JSON.parse(JSON.stringify(list));

    const item = updatedListItem[listId];
    if (item) {
      const listArrItems = removeUndefinedFromArray(
        getListItemsOfList(item.items)
      );
      const newArray = item.items.filter((i) => i !== item.uuid);
      item.items = newArray;
      item.tags = getTagsFromListItemInterface(updatedList);
      setList(updatedListItem);
    }
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

  function LeftRightSwipe(
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
            onPress={deleteItem}
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
      background={
        active
          ? Colors[colorScheme ?? "light"].backgroundLighterActive
          : Colors[colorScheme ?? "light"].backgroundLighter
      }
    >
      <>
        <Styled.ContainerListItemListItemInner>
          <Styled.ContainerListItemListItemHead>
            <Styled.ContainerItemTextTitle>
              <Title>{item.name}</Title>
            </Styled.ContainerItemTextTitle>
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
          </Styled.ContainerListItemListItemHead>
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
        </Styled.ContainerListItemListItemInner>
        <Styled.ContainerListItemListItemAMount
          height={`${item.amount.length * 55 + 60}`}
          background={Colors[colorScheme ?? "light"].backgroundLighterActive}
        >
          <AddPriceUnit listId={listId} listItemId={item.uuid} />
        </Styled.ContainerListItemListItemAMount>
      </>
    </Styled.ContainerListItemListItem>
  ) : (
    <Swipeable
      renderLeftActions={LeftRightSwipe}
      renderRightActions={LeftRightSwipe}
      leftThreshold={100}
    >
      <Styled.ContainerListItemListItem
        underlayColor={
          Colors[colorScheme ?? "light"].backgroundTouchableHighlight
        }
        background={
          active
            ? Colors[colorScheme ?? "light"].backgroundLighterActive
            : Colors[colorScheme ?? "light"].backgroundLighter
        }
      >
        <>
          <Styled.ContainerListItemListItemHead>
            <Styled.ContainerItemTextTitle>
              <Title>{item.name}</Title>
            </Styled.ContainerItemTextTitle>
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
          </Styled.ContainerListItemListItemHead>
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
        </>
      </Styled.ContainerListItemListItem>
    </Swipeable>
  );
}

export default React.memo(ListGridItem);
