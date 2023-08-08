import { useColorScheme, Animated } from "react-native";
import Colors from "../../../../../constants/Colors";
import * as Styled from "./styles";
import { useCallback, useRef } from "react";
import {
  BottomSheetProps,
  ItemInterface,
  ListInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../../../../../types/types";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Swipeable } from "react-native-gesture-handler";
import { removeUndefinedFromArray } from "../../../../../utils/functions";
import { Title, Text } from "../../../../../components/Text";
import {
  useShoppingListArchivedContext,
  useShoppingListContext,
} from "../../../../../context/ShoppingList";
import CircleProgress from "../../../../../components/CircleProgress";

interface ItemProps {
  item: ListInterface;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
}

export default function ListGridItem({ item, setBottomSheetProps }: ItemProps) {
  const {
    list,
    setList,
    listItem,
    setListItem,
    itemAmountList,
    setItemAmountList,
    getListItemsOfList,
    getTotalWithAmount,
    getTotal,
    getTotalUn,
  } = useShoppingListContext();
  const {
    listArchived,
    setListArchived,
    listItemArchived,
    setListItemArchived,
    itemAmountListArchived,
    setItemAmountListArchived,
  } = useShoppingListArchivedContext();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const items = removeUndefinedFromArray(getListItemsOfList(item.items));
  const total = item.items.length > 0 ? getTotal(items) : 0;
  const totalWithAmount = item.items.length > 0 ? getTotalWithAmount(items) : 0;
  const totalUn = item.items.length > 0 ? getTotalUn(items) : 0;

  const handleOpenList = useCallback(() => {
    router.push({ pathname: "/Items", params: { listId: item.uuid } });
  }, [item.uuid, router]);

  const handleEdit = useCallback(() => {
    return setBottomSheetProps({
      listId: item.uuid,
      items: item,
      buttonText: "edit",
      action: "editList",
      isVisible: true,
      onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
    });
  }, [item, setBottomSheetProps]);

  const handleCopy = useCallback(() => {
    return setBottomSheetProps({
      listId: item.uuid,
      items: item,
      buttonText: "copy",
      action: "copyList",
      isVisible: true,
      onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
    });
  }, [item, setBottomSheetProps]);

  const handleDelete = () => {
    const updatedList: ListType = JSON.parse(JSON.stringify(list));
    handleDeleteListItem(updatedList[item.uuid].items);
    delete updatedList[item.uuid];
    setList(updatedList);
  };

  const handleDeleteListItem = (listUuid: string[]): void => {
    listUuid.forEach((i) => {
      const updatedList: ListItemInterface = JSON.parse(
        JSON.stringify(listItem)
      );
      updatedList[i]?.amount &&
        handleDeleteAmountInList(updatedList[i]?.amount);
      delete updatedList[i];
      setListItem(updatedList);
    });
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

  const handleArchivedItemList = (items: string[]): void => {
    items.forEach((item) => {
      const archivedItemList: ListItemInterface = JSON.parse(
        JSON.stringify(listItem)
      );
      const itemsArchived = archivedItemList[item];
      if (itemsArchived) {
        handleArchivedItemListAmount(itemsArchived.amount);
        setListItemArchived((newValue) => ({
          ...newValue,
          [itemsArchived.uuid]: itemsArchived,
        }));
      }
    });
  };
  const handleArchivedItemListAmount = (amounts: string[]): void => {
    amounts.forEach((amount) => {
      const archivedItemAmountList: ListItemAmountInterface = JSON.parse(
        JSON.stringify(itemAmountList)
      );
      const itemsAmountArchived = archivedItemAmountList[amount];
      if (itemsAmountArchived) {
        setItemAmountListArchived((newValue) => ({
          ...newValue,
          [itemsAmountArchived.uuid]: itemsAmountArchived,
        }));
      }
    });
  };
  const handleArchived = (): void => {
    const archivedList: ListType = JSON.parse(JSON.stringify(list));
    const itemsArchived = archivedList[item.uuid];
    if (itemsArchived) {
      handleArchivedItemList(itemsArchived.items);
      setListArchived((newValue) => ({
        ...newValue,
        [itemsArchived.uuid]: itemsArchived,
      }));
      handleDelete();
    }
  };

  const RightSwipe = useCallback(
    (
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
              onPress={handleCopy}
            >
              <>
                <Styled.ButtonTextIcon
                  text={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
                >
                  <FontAwesome
                    size={18}
                    style={{ marginBottom: -3 }}
                    name="copy"
                  />
                </Styled.ButtonTextIcon>
                <Styled.ButtonText
                  text={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
                >
                  Copiar
                </Styled.ButtonText>
              </>
            </Styled.ButtonInner>
          </Styled.ButtonView>
        </Animated.View>
      );
    },
    []
  );
  const LeftSwipe = useCallback(
    (
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
              underlayColor={
                Colors[colorScheme ?? "light"]
                  .swipeablebuttonTouchableHighlightBackgroundColor
              }
              onPress={handleArchived}
            >
              <>
                <Styled.ButtonTextIcon
                  text={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
                >
                  <FontAwesome
                    size={18}
                    style={{ marginBottom: -3 }}
                    name="archive"
                  />
                </Styled.ButtonTextIcon>
                <Styled.ButtonText
                  text={Colors[colorScheme ?? "light"].swipeablebuttonTextColor}
                >
                  Arquivar
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
    },
    []
  );

  return (
    <Swipeable
      renderLeftActions={RightSwipe}
      renderRightActions={LeftSwipe}
      leftThreshold={100}
    >
      <Styled.ContainerListItem
        underlayColor={Colors[colorScheme ?? "light"].listItemBackgroundColor}
        borderColor={
          Colors[colorScheme ?? "light"].listItemBackgroundBorderColor
        }
        background={Colors[colorScheme ?? "light"].listItemBackgroundColor}
        onPress={handleOpenList}
      >
        <Styled.ContainerListItemInner>
          <Styled.ContainerListItemHead>
            <Styled.ContainerItemTitle>
              <Title>{item.name}</Title>
            </Styled.ContainerItemTitle>
            <Styled.ContainerListItemBody>
              <Text>Total: R$ {total.toFixed(2)}</Text>
            </Styled.ContainerListItemBody>
          </Styled.ContainerListItemHead>
          <Styled.ContainerItemCircleProgress>
            <CircleProgress
              filled={totalWithAmount}
              progress={totalUn && totalWithAmount ? totalWithAmount : 0}
              total={totalUn}
              size={22}
            />
          </Styled.ContainerItemCircleProgress>
        </Styled.ContainerListItemInner>
      </Styled.ContainerListItem>
    </Swipeable>
  );
}
