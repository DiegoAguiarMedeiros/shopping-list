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
import Tag from "../../../../../Domain/Model/Implementation/Tag";
import { IList, IListInterface } from "@/Domain/Model/IList";
import { IListProductInterface } from "../../../../../Domain/Model/IProduct";
import { IListAmountInterface } from "../../../../../Domain/Model/IAmount";
import getListProductController from "../../../../../Domain/UseCases/ListProduct/GetListProduct";
import deleteTagByUuidController from "../../../../../Domain/UseCases/Tag/DeleteTagByUuid";
import saveListArchivedByUuidController from "../../../../../Domain/UseCases/ListArchived/SaveListByUuid";
import NewTagForm from "../../../../../components/NewTagForm";
import ITag from "@/Domain/Model/ITag";
interface ItemProps {
  item: Tag;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

export default function ListGridItem({
  item,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: ItemProps) {
  const {
    tags,
    setTags,
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

  const handleOpenList = useCallback(() => {

    setBottomSheetProps({
      isVisible: false,
      height: "edit",
      children: (
        <NewTagForm
          onClose={handleCloseBottomSheet}
          action="addTag"
          buttonText="add"
        />
      ),
    });
    router.push({ pathname: "/Items", params: { listId: item.uuid } });
  }, [item.uuid, router]);

  const handleEdit = () => {
    setBottomSheetProps({
      // listId: item.uuid,
      // items: item,
      // buttonText: "edit",
      // action: "editList",
      height: "add",
      children: (
        <NewTagForm
          action="editTag"
          buttonText="edit"
          tag={item}
          onClose={handleCloseBottomSheet}
        />
      ),
      isVisible: true,
    });
  };

  const handleDelete = () => {
    console.log('handleDelete')
    const updatedList: ITag[] = JSON.parse(JSON.stringify(tags));
    const newupdatedList = updatedList.filter(i => item.uuid !== i.uuid)
    deleteTagByUuidController.handle(item.uuid);
    setTags(newupdatedList);
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
  };

  return (
    <Swipeable
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
            </Styled.ContainerListItemBody>
          </Styled.ContainerListItemHead>
        </Styled.ContainerListItemInner>
      </Styled.ContainerListItem>
    </Swipeable>
  );
}
