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
import { Title, Text, SubTitle } from "../../../../../components/Text";
import {
  useShoppingListContext,
} from "../../../../../context/ShoppingList";
import CircleProgress from "../../../../../components/CircleProgress";

import { BottomSheetProps } from "../../../../../components/BottomSheet";
import NewListForm from "../../../../../components/NewListForm";
import Tag from "../../../../../Domain/Model/Implementation/Tag";
import { IList, IListInterface } from "../../../../../Domain/Model/IList";
import getListProductController from "../../../../../Domain/UseCases/ListProduct/GetListProductByUuid";
import deleteTagByUuidController from "../../../../../Domain/UseCases/Tag/DeleteTagByUuid";
import saveListArchivedByUuidController from "../../../../../Domain/UseCases/ListArchived/SaveListByUuid";
import NewTagForm from "../../../../../components/NewTagForm";
import ITag from "../../../../../Domain/Model/ITag";
import getNumberOfProductsByTagsUuidController from "../../../../../Domain/UseCases/ListProduct/GetNumberOfProductsByTagsUuid";
import GridItem from "../../../../../components/GridItem";
import { GridItemInner, GridItemWrapperCol, GridItemWrapperInner, GridItemWrapperRow } from "../../../../../components/GridItemInner";
import NewProductForm from "../../../../../components/NewProductForm";
interface ItemProps {
  item: Tag;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

export default function ListGridItem({
  item,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: Readonly<ItemProps>) {
  const {
    tags,
    setTags,
  } = useShoppingListContext();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleCloseBottomSheetProduct = () => {
    setBottomSheetProps({
      children: (
        <NewProductForm
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
          tagUuid={item.uuid}
        />
      ),
      height: "add",
      isVisible: false,
    });
  };

  const handleOpenList = useCallback(() => {


    setBottomSheetProps({
      isVisible: false,
      height: "add",
      children: (
        <NewProductForm
          onClose={handleCloseBottomSheetProduct}
          action="addList"
          buttonText="add"
          tagUuid={item.uuid}
        />
      ),
    });
    router.push({ pathname: "/ProductsList", params: { tagUuid: item.uuid } });
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
    <GridItem
      renderRightActions={LeftSwipe}
      leftThreshold={100} rightThreshold={undefined}>
      <GridItemInner
        underlayColor={Colors[colorScheme ?? "light"].listItemBackgroundColor}
        borderColor={
          Colors[colorScheme ?? "light"].listItemBackgroundBorderColor
        }
        background={Colors[colorScheme ?? "light"].listItemBackgroundColor}
        height={60}
        row
        onPress={handleOpenList}
      >
        <>
          <GridItemWrapperCol width={70} height={100} >
            <GridItemWrapperInner height={100}>
              <Title
                color={
                  colorScheme !== "dark"
                    ? Colors[colorScheme ?? "light"].black
                    : Colors[colorScheme ?? "light"].white
                }
              >
                {item.name}
              </Title>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={30} height={100} >
            <GridItemWrapperInner height={100}>
              <SubTitle
                color={
                  colorScheme !== "dark"
                    ? Colors[colorScheme ?? "light"].black
                    : Colors[colorScheme ?? "light"].white
                }
              >
                Produtos: {getNumberOfProductsByTagsUuidController.handle(item.uuid)}
              </SubTitle>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
        </>
      </GridItemInner>
    </GridItem >
  );
}
