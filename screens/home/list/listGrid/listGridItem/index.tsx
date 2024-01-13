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
import { Title, Text, SubTitle, Title2 } from "../../../../../components/Text";
import {
  useShoppingListContext,
} from "../../../../../context/ShoppingList";
import CircleProgress from "../../../../../components/CircleProgress";

import { BottomSheetProps } from "../../../../../components/BottomSheet";
import NewListForm from "../../../../../components/NewListForm";
import List from "../../../../../Domain/Model/Implementation/List";
import { IList, IListInterface } from "../../../../../Domain/Model/IList";
import getListProductController from "../../../../../Domain/UseCases/ListProduct/GetListProductByUuid";
import deleteListByUuid from "../../../../../Domain/UseCases/List/DeleteListByUuid";
import saveListArchivedByUuidController from "../../../../../Domain/UseCases/ListArchived/SaveListByUuid";
import NewProductForm from "../../../../../components/NewProductForm";
import NewItemForm from "../../../../../components/NewItemForm";
import getTotalAmountByListUuidController from "../../../../../Domain/UseCases/List/GetTotalAmountByListUuid";
import getTotalQuantityAmountByListUuidController from "../../../../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import getTotalQuantityWithoutAmountByListUuidController from "../../../../../Domain/UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
import GridItem from "../../../../../components/GridItem";
import { GridItemInner, GridItemWrapperCol, GridItemWrapperInner } from "../../../../../components/GridItemInner";
import getNumberOfProductsByTagsUuidController from "../../../../../Domain/UseCases/ListProduct/GetNumberOfProductsByTagsUuid";
interface ItemProps {
  item: IList;
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
    listArchived,
    listProduct,
    handleDeleteList,
    handleArchived
  } = useShoppingListContext();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const items = removeUndefinedFromArray(
    getListProductController.handle(item.items)
  );

  const total = getTotalAmountByListUuidController.handle(item.uuid);
  const totalWithAmount =
    getTotalQuantityWithoutAmountByListUuidController.handle(item.uuid);
  const totalUn =
    getTotalQuantityAmountByListUuidController.handle(item.uuid);

  const handleCloseBottomSheetProductList = () => {
    setBottomSheetProps({
      children: (
        <NewItemForm
          buttonText="add"
          onClose={handleCloseBottomSheetProductList}
          listId={item.uuid} />
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
        <NewItemForm
          onClose={handleCloseBottomSheetProductList}
          buttonText="add"
          listId={item.uuid}
        />
      ),
    });
    router.push({ pathname: "/Items", params: { listId: item.uuid } });
  }, [item.uuid, router]);

  const handleEdit = () => {
    setBottomSheetProps({
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
    setBottomSheetProps({
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
    handleDeleteList(item.uuid);
  };

  const archivedList = (): void => {
    handleArchived(item.uuid);
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
                .backgroundPrimary
            }
            onPress={handleEdit}
          >
            <>
              <Styled.ButtonTextIcon
                text={Colors[colorScheme ?? "light"].swipeIcon}
              >
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="pencil"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText
                text={Colors[colorScheme ?? "light"].swipeIcon}
              >
                Editar
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
          <Styled.ButtonInner
            underlayColor={
              Colors[colorScheme ?? "light"]
                .text
            }
            onPress={handleCopy}
          >
            <>
              <Styled.ButtonTextIcon
                text={Colors[colorScheme ?? "light"].swipeIcon}
              >
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="copy"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText
                text={Colors[colorScheme ?? "light"].swipeIcon}
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
                .backgroundPrimary
            }
            onPress={archivedList}
          >
            <>
              <Styled.ButtonTextIcon
                text={Colors[colorScheme ?? "light"].swipeIcon}
              >
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="archive"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText
                text={Colors[colorScheme ?? "light"].swipeIcon}
              >
                Arquivar
              </Styled.ButtonText>
            </>
          </Styled.ButtonInner>
          <Styled.ButtonInner
            underlayColor={
              Colors[colorScheme ?? "light"]
                .backgroundPrimary
            }
            onPress={handleDelete}
          >
            <>
              <Styled.ButtonTextIcon
                text={Colors[colorScheme ?? "light"].swipeIcon}
              >
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="trash"
                />
              </Styled.ButtonTextIcon>
              <Styled.ButtonText
                text={Colors[colorScheme ?? "light"].swipeIcon}
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
      renderLeftActions={RightSwipe}
      leftThreshold={100} rightThreshold={undefined}>
      <GridItemInner
        underlayColor={Colors[colorScheme ?? "light"].itemListBackgroundUnderlay}
        borderColor={
          Colors[colorScheme ?? "light"].itemListBackgroundBorder
        }
        background={Colors[colorScheme ?? "light"].itemListBackground}
        height={60}
        row
        onPress={handleOpenList}
      >
        <>
          <GridItemWrapperCol width={85} height={100} >
            <GridItemWrapperInner height={100}>
              <Title2
                color={Colors[colorScheme ?? "light"].itemListText}
              >
                {item.name}
              </Title2>
              <Text
                color={Colors[colorScheme ?? "light"].itemListTextSecondary}
              >
                Total: R$ {total.toFixed(2).replace(".", ",")}
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={15} height={100} >
            <GridItemWrapperInner height={100}>
              <CircleProgress
                activeStrokeColor={
                  Colors[colorScheme ?? "light"]
                    .circularItemFilled
                }
                titleColor={Colors[colorScheme ?? "light"].circularItemText}
                circleBackgroundColor={
                  Colors[colorScheme ?? "light"].circularItemBackground
                }
                filled={totalWithAmount}
                progress={totalUn && totalWithAmount ? totalWithAmount : 0}
                total={totalUn}
                size={22}
              />
            </GridItemWrapperInner>
          </GridItemWrapperCol>
        </>
      </GridItemInner>
    </GridItem>
  );
}
