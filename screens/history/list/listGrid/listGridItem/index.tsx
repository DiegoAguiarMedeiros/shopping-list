import { useColorScheme, Animated } from "react-native";
import Colors from "../../../../../constants/Colors";
import * as Styled from "./styles";
import { lazy, useCallback, useRef } from "react";
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
const CircleProgress = lazy(
  () => import("../../../../../components/CircleProgress")
);

interface ItemProps {
  item: ListInterface;
}

export default function ListGridItem({ item }: ItemProps) {
  const {
    listArchived,
    setListArchived,
    listItemArchived,
    setListItemArchived,
    itemAmountListArchived,
    setItemAmountListArchived,
    getListItemsOfListArchived,
    getTotalArchived,
    getTotalWithAmountArchived,
    getTotalUnArchived,
  } = useShoppingListArchivedContext();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const items = removeUndefinedFromArray(
    getListItemsOfListArchived(item.items)
  );
  const total = item.items.length > 0 ? getTotalArchived(items) : 0;
  const totalWithAmount =
    item.items.length > 0 ? getTotalWithAmountArchived(items) : 0;
  const totalUn = item.items.length > 0 ? getTotalUnArchived(items) : 0;

  const handleOpenList = useCallback(() => {
    router.push({ pathname: "/ItemsArchived", params: { listId: item.uuid } });
  }, [item.uuid, router]);

  const HandleClose = () => {
    const swipeable = useRef<Swipeable>();
    swipeable.current?.close();
  };

  const handleDelete = () => {
    const updatedList: ListType = JSON.parse(JSON.stringify(listArchived));
    handleDeleteListItem(updatedList[item.uuid].items);
    delete updatedList[item.uuid];
    setListArchived(updatedList);
  };

  const handleDeleteListItem = (listUuid: string[]): void => {
    listUuid.forEach((i) => {
      const updatedList: ListItemInterface = JSON.parse(
        JSON.stringify(listItemArchived)
      );
      updatedList[i]?.amount &&
        handleDeleteAmountInList(updatedList[i]?.amount);
      delete updatedList[i];
      setListItemArchived(updatedList);
    });
  };
  const handleDeleteAmountInList = (itemAmountUuid: string[]): void => {
    itemAmountUuid.forEach((i) => {
      const updatedList: ListItemAmountInterface = JSON.parse(
        JSON.stringify(itemAmountListArchived)
      );
      delete updatedList[i];
      setItemAmountListArchived(updatedList);
    });
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
            width: 100,
            height: 100,
            overflow: "hidden",
          }}
        >
          <Styled.ButtonView>
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
    },
    []
  );

  return (
    <Swipeable
      renderRightActions={RightSwipe}
      rightThreshold={100}
      friction={2} // Adjust the friction to control how far it can be swiped (default is 1)
      overshootFriction={8} // Adjust the overshootFriction to control overshooting (default is 1)
    >
      <Styled.ContainerListItem
        underlayColor={
          Colors[colorScheme ?? "light"].backgroundTouchableHighlight
        }
        background={Colors[colorScheme ?? "light"].backgroundLighter}
        onPress={handleOpenList}
      >
        <Styled.ContainerListItemInner>
          <Styled.ContainerListItemHead>
            <Styled.ContainerItemTitle>
              <Title>{item.name}</Title>
            </Styled.ContainerItemTitle>
            <Styled.ContainerItemCircleProgress
              text={Colors[colorScheme ?? "light"].textButton}
            >
              <CircleProgress
                filled={totalWithAmount}
                progress={
                  totalUn && totalWithAmount
                    ? Number(totalWithAmount / totalUn)
                    : 0
                }
                total={totalUn}
                size={50}
              />
            </Styled.ContainerItemCircleProgress>
          </Styled.ContainerListItemHead>
          <Styled.ContainerListItemBody>
            <Text>Total: R$ {total.toFixed(2)}</Text>
          </Styled.ContainerListItemBody>
        </Styled.ContainerListItemInner>
      </Styled.ContainerListItem>
    </Swipeable>
  );
}
