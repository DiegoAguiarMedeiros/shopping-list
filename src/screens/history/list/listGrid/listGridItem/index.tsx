import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";
import { useCallback } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

import { Text, Title2 } from "../../../../../components/Text";
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
import { useStores } from "../../../../../context/StoreContext";

interface ItemProps {
  list: IList;
}

export default function ListGridItem({
  list,
}: Readonly<ItemProps>) {

  const { ListRepository, ProductRepository, ConfigRepository } = useStores();
  const colorScheme = useColorScheme();
  const navigation = useNavigation<any>();
  const total = list.total ?? 0;
  const totalWithoutAmount = list.totalWithoutAmount ?? 0;
  const totalUn = list.totalUn ?? 0;

  const handleOpenList = useCallback(() => {
    ListRepository.setListActive(list.uuid);
    ProductRepository.load();
    navigation.navigate("ItemsArchived", { listId: list.uuid });
  }, [list.uuid, navigation]);

  const handleDelete = () => {
    ListRepository.removeItemArchived(list.uuid);
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
              underlayColor={ConfigRepository.color.swipeIconUnderlay}
              onPress={handleDelete}
            >
              <Styled.ButtonContent>
                <Styled.ButtonTextIcon text={ConfigRepository.color.swipeIcon}>
                  <FontAwesome
                    size={18}
                    style={{ marginBottom: -3 }}
                    name="trash"
                  />
                </Styled.ButtonTextIcon>
                <Styled.ButtonText text={ConfigRepository.color.swipeIcon}>
                  {I18n.t("delete")}
                </Styled.ButtonText>
              </Styled.ButtonContent>
            </Styled.ButtonInner>
          </Styled.ButtonView>
        </Animated.View>
      );
    },
    [list]
  );

  return (
    <GridItem
      renderRightActions={RightSwipe}
      rightThreshold={50}
      leftThreshold={undefined}
    >
      <GridItemInner
        underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
        borderColor={ConfigRepository.color.itemListBackgroundBorder}
        background={ConfigRepository.color.itemListBackground}
        height={70}
        row
        onPress={handleOpenList}
        elevation={colorScheme === "light"}
      >
        <>
          <GridItemWrapperCol width={85} height={100}>
            <GridItemWrapperInner height={100}>
              <Title2 color={ConfigRepository.color.itemListText}>{list.name}</Title2>
              <Text color={ConfigRepository.color.itemListTextSecondary}>
                {I18n.t("total")}: {ConfigRepository.currency}{" "}
                {total}
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={15} height={100}>
            <GridItemWrapperInner height={100} align="flex-end">
              <CircleProgress
                activeStrokeColor={ConfigRepository.color.circularItemFilled}
                circleBackgroundColor={ConfigRepository.color.circularItemBackground}
                progress={totalUn && totalWithoutAmount ? totalWithoutAmount : 0}
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
