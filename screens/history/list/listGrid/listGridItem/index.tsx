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
import { Title, Text, Title2 } from "../../../../../components/Text";
import {
  useShoppingListContext,
} from "../../../../../context/ShoppingList";
import CircleProgress from "../../../../../components/CircleProgress";
import { IList } from "../../../../../Domain/Model/IList";
import getTotalAmountByListUuidController from "../../../../../Domain/UseCases/List/GetTotalAmountByListUuid";
import getTotalQuantityWithoutAmountByListUuidController from "../../../../../Domain/UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
import getTotalQuantityAmountByListUuidController from "../../../../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import deleteListByUuidController from "../../../../../Domain/UseCases/ListArchived/DeleteListByUuid";
import GridItem from "../../../../../components/GridItem";
import { GridItemInner, GridItemWrapperCol, GridItemWrapperInner } from "../../../../../components/GridItemInner";

interface ItemProps {
  item: IList;
}

export default function ListGridItem({ item }: ItemProps) {
  const {
    handleDeleteListArchived
  } = useShoppingListContext();
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
    handleDeleteListArchived(item.uuid);
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
                  .textSecondary
              }
              onPress={handleDelete}
            >
              <>
                <Styled.ButtonTextIcon
                  text={Colors[colorScheme ?? "light"].text}
                >
                  <FontAwesome
                    size={18}
                    style={{ marginBottom: -3 }}
                    name="trash"
                  />
                </Styled.ButtonTextIcon>
                <Styled.ButtonText
                  text={Colors[colorScheme ?? "light"].text}
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
    <GridItem
      renderRightActions={RightSwipe} rightThreshold={50} leftThreshold={undefined}>
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
