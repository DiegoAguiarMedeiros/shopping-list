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
import { IList } from "../../../../../Domain/Model/IList";
import getTotalAmountByListUuidController from "../../../../../Domain/UseCases/List/GetTotalAmountByListUuid";
import getTotalQuantityWithoutAmountByListUuidController from "../../../../../Domain/UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
import getTotalQuantityAmountByListUuidController from "../../../../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import deleteListByUuidController from "../../../../../Domain/UseCases/ListArchived/DeleteListByUuid";

interface ItemProps {
  item: IList;
}

export default function ListGridItem({ item }: ItemProps) {
  const {
    listArchived,
    setListArchived,
  } = useShoppingListArchivedContext();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const total = getTotalAmountByListUuidController.handle(item.uuid);
  const totalWithAmount =
    getTotalQuantityWithoutAmountByListUuidController.handle(item.uuid);
  const totalUn =
    getTotalQuantityAmountByListUuidController.handle(item.uuid);


  const handleOpenList = useCallback(() => {
    router.push({ pathname: "/ItemsArchived", params: { listId: item.uuid } });
  }, [item.uuid, router]);

  const handleDelete = () => {
    const updatedList: IList[] = JSON.parse(JSON.stringify(listArchived));
    const newupdatedList = updatedList.filter(i => item.uuid !== i.uuid)
    deleteListByUuidController.handle(item.uuid);
    setListArchived(newupdatedList);
  };



  const handleDeleteListItem = (listUuid: string[]): void => {
    // listUuid.forEach((i) => {
    //   const updatedList: ListItemInterface = JSON.parse(
    //     JSON.stringify(listItemArchived)
    //   );
    //   updatedList[i]?.amount &&
    //     handleDeleteAmountInList(updatedList[i]?.amount);
    //   delete updatedList[i];
    //   setListItemArchived(updatedList);
    // });
  };
  const handleDeleteAmountInList = (itemAmountUuid: string[]): void => {
    // itemAmountUuid.forEach((i) => {
    //   const updatedList: ListItemAmountInterface = JSON.parse(
    //     JSON.stringify(itemAmountListArchived)
    //   );
    //   delete updatedList[i];
    // //   setItemAmountListArchived(updatedList);
    // });
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
            overflow: "hidden",
          }}
        >
          <Styled.ButtonView>
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
    [item]
  );

  return (
    <Swipeable renderRightActions={RightSwipe} rightThreshold={50}>
      <Styled.ContainerListItem
        underlayColor={Colors[colorScheme ?? "light"].listItemBackgroundColor}
        background={Colors[colorScheme ?? "light"].listItemBackgroundColor}
        borderColor={
          Colors[colorScheme ?? "light"].listItemBackgroundBorderColor
        }
        onPress={handleOpenList}
      >
        <Styled.ContainerListItemInner>
          <Styled.ContainerListItemHead>
            <Styled.ContainerItemTitle>
              <Title
                color={
                  colorScheme !== "dark"
                    ? Colors[colorScheme ?? "light"].black
                    : Colors[colorScheme ?? "light"].white
                }
              >
                {item.name}
              </Title>
            </Styled.ContainerItemTitle>
            <Styled.ContainerListItemBody>
              <Text
                color={
                  colorScheme !== "dark"
                    ? Colors[colorScheme ?? "light"].black
                    : Colors[colorScheme ?? "light"].white
                }
              >
                Total: R$ {total.toFixed(2)}
              </Text>
            </Styled.ContainerListItemBody>
          </Styled.ContainerListItemHead>
          <Styled.ContainerItemCircleProgress>
            <CircleProgress
              activeStrokeColor={
                Colors[colorScheme ?? "light"]
                  .circleProgresBackgroundFilledColor
              }
              titleColor={Colors[colorScheme ?? "light"].circleProgresTextColor}
              circleBackgroundColor={
                Colors[colorScheme ?? "light"].circleProgresBackgroundColor
              }
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
