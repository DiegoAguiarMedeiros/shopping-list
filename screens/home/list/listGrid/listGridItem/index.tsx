import { useColorScheme, Animated } from "react-native";
import Colors from "../../../../../constants/Colors";
import * as Styled from "./styles";
import { lazy, useCallback } from "react";
import {
  BottomSheetProps,
  ItemInterface,
  ListInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
  listInterface,
} from "../../../../../types/types";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Swipeable } from "react-native-gesture-handler";
import {
  getTotal,
  getTotalUn,
  getTotalWithAmount,
  removeList,
} from "../../../../../utils/functions";
import { Title, Text } from "../../../../../components/Text";
import {
  useShoppingListArchivedContext,
  useShoppingListContext,
} from "../../../../../context/ShoppingList";
const CircleProgress = lazy(
  () => import("../../../../../components/CircleProgress")
);

interface ItemProps {
  item: listInterface;
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
  } = useShoppingListContext();
  const { archived, setArchived } = useShoppingListArchivedContext();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const total = item.items ? /*getTotal(item.items)*/ 1 : 0;
  const totalWithAmount = item.items ? /*getTotalWithAmount(item.items)*/ 1 : 0;
  const totalUn = item.items ? /*getTotalUn(item.items)*/ 1 : 0;

  const handleOpenList = useCallback(() => {
    router.push({ pathname: "/iTems", params: { listId: item.uuid } });
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
      handleDeleteAmountInList(updatedList[i].amount);
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

  const handleArchived = () => {
    setList(removeList(list, item.uuid));
    archived ? setArchived([item, ...archived]) : setValue([item]);
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
              onPress={handleCopy}
            >
              <>
                <Styled.ButtonTextIcon
                  text={Colors[colorScheme ?? "light"].textButton}
                >
                  <FontAwesome
                    size={24}
                    style={{ marginBottom: -3 }}
                    name="copy"
                  />
                </Styled.ButtonTextIcon>
                <Styled.ButtonText
                  text={Colors[colorScheme ?? "light"].textButton}
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
            height: 100,
            overflow: "hidden",
          }}
        >
          <Styled.ButtonView>
            <Styled.ButtonInner
              underlayColor={
                Colors[colorScheme ?? "light"].backgroundTouchableHighlight
              }
              onPress={handleArchived}
            >
              <>
                <Styled.ButtonTextIcon
                  text={Colors[colorScheme ?? "light"].textButton}
                >
                  <FontAwesome
                    size={24}
                    style={{ marginBottom: -3 }}
                    name="archive"
                  />
                </Styled.ButtonTextIcon>
                <Styled.ButtonText
                  text={Colors[colorScheme ?? "light"].textButton}
                >
                  Arquivar
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
