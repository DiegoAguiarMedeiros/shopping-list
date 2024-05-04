import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";
import { useCallback } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Text, Title2 } from "../../../../../components/Text";
import { useShoppingListContext } from "../../../../../context/ShoppingList";
import CircleProgress from "../../../../../components/CircleProgress";
import { IList } from "../../../../../Model/IList";
import GridItem from "../../../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
} from "../../../../../components/GridItemInner";
import I18n from "i18n-js";
import { colorTheme } from "../../../../../../constants/Colors";

interface ItemProps {
  item: IList;
  color: colorTheme;
  setListArchived: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ListGridItem({
  item,
  color,
  setListArchived,
}: Readonly<ItemProps>) {
  const {
    handleDeleteListArchived,
    getCurrency,
    getTotalAmountByListUuid,
    getTotalQuantityWithoutAmountByListUuid,
    getTotalQuantityAmountByListUuid,
  } = useShoppingListContext();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const total = getTotalAmountByListUuid(item.uuid);
  const totalWithAmount = getTotalQuantityWithoutAmountByListUuid(item.uuid);
  const totalUn = getTotalQuantityAmountByListUuid(item.uuid);

  const handleOpenList = useCallback(() => {
    router.push({ pathname: "/ItemsArchived", params: { listId: item.uuid } });
  }, [item.uuid, router]);

  const handleDelete = () => {
    handleDeleteListArchived(item.uuid);
    setListArchived((prev) => prev.filter((p) => p !== item.uuid));
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
              underlayColor={color.swipeIconUnderlay}
              onPress={handleDelete}
            >
              <>
                <Styled.ButtonTextIcon text={color.swipeIcon}>
                  <FontAwesome
                    size={18}
                    style={{ marginBottom: -3 }}
                    name="trash"
                  />
                </Styled.ButtonTextIcon>
                <Styled.ButtonText text={color.swipeIcon}>
                  {I18n.t("delete")}
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
      renderRightActions={RightSwipe}
      rightThreshold={50}
      leftThreshold={undefined}
    >
      <GridItemInner
        underlayColor={color.itemListBackgroundUnderlay}
        borderColor={color.itemListBackgroundBorder}
        background={color.itemListBackground}
        height={70}
        row
        onPress={handleOpenList}
        elevation={colorScheme === "light"}
      >
        <>
          <GridItemWrapperCol width={85} height={100}>
            <GridItemWrapperInner height={100}>
              <Title2 color={color.itemListText}>{item.name}</Title2>
              <Text color={color.itemListTextSecondary}>
                {I18n.t("total")}: {getCurrency()}{" "}
                {total.toFixed(2).replace(".", ",")}
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={15} height={100}>
            <GridItemWrapperInner height={100} align="flex-end">
              <CircleProgress
                activeStrokeColor={color.circularItemFilled}
                titleColor={color.circularItemText}
                circleBackgroundColor={color.circularItemBackground}
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
