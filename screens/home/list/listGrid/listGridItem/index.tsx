import { useColorScheme, Animated } from "react-native";
import Colors from "../../../../../constants/Colors";
import * as Styled from "./styles";
import { useCallback, useRef } from "react";
import {
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

import { BottomSheetProps } from "../../../../../components/BottomSheet";
import NewListForm from "../../../../../components/NewListForm";
import List from "../../../../../Domain/Model/Implementation/List";
import { IList, IListInterface } from "@/Domain/Model/IList";
import { IListProductInterface } from "../../../../../Domain/Model/IProduct";
import { IListAmountInterface } from "../../../../../Domain/Model/IAmount";
import getListProductController from "../../../../../Domain/UseCases/ListProduct/GetListProduct";
import deleteListByUuid from "../../../../../Domain/UseCases/List/DeleteListByUuid";
interface ItemProps {
  item: List;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

export default function ListGridItem({
  item,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: ItemProps) {
  const {
    list,
    setList,
    listProduct,
    setListProduct,
    listAmount,
    setListAmount,
  } = useShoppingListContext();
  const {
    listArchived,
    setListArchived,
    listProductArchived,
    setListProductArchived,
    listAmountArchived,
    setListAmountArchived,
  } = useShoppingListArchivedContext();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const items = []; /*removeUndefinedFromArray(
    getListProductController.handle(item.items)
  );*/
  const total = item.items.length > 0 ? /*getTotal(items)*/ 0 : 0;
  const totalWithAmount =
    item.items.length > 0 ? /*getTotalWithAmount(items)*/ 0 : 0;
  const totalUn = item.items.length > 0 ? /*getTotalUn(items)*/ 0 : 0;
  const handleOpenList = useCallback(() => {
    router.push({ pathname: "/Items", params: { listId: item.uuid } });
  }, [item.uuid, router]);

  const handleEdit = () => {
    return setBottomSheetProps({
      // listId: item.uuid,
      // items: item,
      // buttonText: "edit",
      // action: "editList",
      height: "add",
      children: (
        <NewListForm
          action="editList"
          buttonText="edit"
          items={item}
          onClose={handleCloseBottomSheet}
        />
      ),
      isVisible: true,
    });
  };

  const handleCopy = () => {
    return setBottomSheetProps({
      // listId: item.uuid,
      // items: item,
      // buttonText: "copy",
      // action: "copyList",
      height: "add",
      children: (
        <NewListForm
          action="copyList"
          buttonText="copy"
          items={item}
          onClose={handleCloseBottomSheet}
        />
      ),
      isVisible: true,
    });
  };

  const handleDelete = () => {
    const updatedList: IList[] = JSON.parse(JSON.stringify(list));
    console.log('item.uuid', item.uuid)
    console.log('updatedList', updatedList)
    const newupdatedList = updatedList.filter(i => item.uuid !== i.uuid)
    console.log('newupdatedList', newupdatedList)
    deleteListByUuid.handle(item.uuid);
    setList(newupdatedList);
  };

  const handleDeleteListItem = (listUuid: string[]): void => {
    if (listUuid) {
      const updatedList: IListProductInterface = JSON.parse(
        JSON.stringify(listProduct)
      );
      listUuid.forEach((i) => {
        updatedList[i]?.amount &&
          handleDeleteAmountInList(updatedList[i]?.amount);
        delete updatedList[i];
      });
      setListProduct(updatedList);
    }
  };
  const handleDeleteAmountInList = (itemAmountUuid: string[]): void => {
    const updatedList: IListAmountInterface = JSON.parse(
      JSON.stringify(listAmount)
    );
    itemAmountUuid.forEach((i) => {
      delete updatedList[i];
    });
    setListAmount(updatedList);
  };

  const handleArchivedItemList = (items: string[]): void => {
    items.forEach((item) => {
      const archivedItemList: IListProductInterface = JSON.parse(
        JSON.stringify(listProduct)
      );
      const itemsArchived = archivedItemList[item];
      if (itemsArchived) {
        handleArchivedItemListAmount(itemsArchived.amount);
        setListProductArchived((newValue) => ({
          ...newValue,
          [itemsArchived.uuid]: itemsArchived,
        }));
      }
    });
  };
  const handleArchivedItemListAmount = (amounts: string[]): void => {
    amounts.forEach((amount) => {
      const archivedItemAmountList: IListAmountInterface = JSON.parse(
        JSON.stringify(listAmountArchived)
      );
      const itemsAmountArchived = archivedItemAmountList[amount];
      if (itemsAmountArchived) {
        setListAmountArchived((newValue) => ({
          ...newValue,
          [itemsAmountArchived.uuid]: itemsAmountArchived,
        }));
      }
    });
  };
  const handleArchived = (): void => {
    const archivedList: IListInterface = JSON.parse(JSON.stringify(list));
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

  const RightSwipe = (
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
  };
  const LeftSwipe = (
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
  };

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
