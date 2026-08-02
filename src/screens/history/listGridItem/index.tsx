import { useColorScheme, Animated, StyleSheet, View, TouchableHighlight, Text as RNText } from "react-native";
import { useCallback } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

import { Text, Title2 } from "../../../components/Text";
import CircleProgress from "../../../components/CircleProgress";
import { IList } from "../../../Model/IList";
import GridItem from "../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
} from "../../../components/GridItemInner";
import I18n from "i18n-js";
import { colorTheme } from "../../../../constants/Colors";
import { useStores } from "../../../context/StoreContext";
import { SharedValue } from "react-native-reanimated";
import { SwipeableMethods } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";

interface ItemProps {
  list: IList;
}

export default function ListGridItem({
  list,
}: Readonly<ItemProps>) {

  const { ListRepository, ProductRepository, TagRepository, ConfigRepository } = useStores();
  const colorScheme = useColorScheme();
  const navigation = useNavigation<any>();
  const total = list.total ?? 0;
  const totalWithoutAmount = list.totalWithoutAmount ?? 0;
  const totalUn = list.totalUn ?? 0;

  const handleOpenList = useCallback(() => {
    ListRepository.setListActive(list.uuid);
    TagRepository.setTagAcitveNull();
    ProductRepository.load();
    navigation.navigate("ItemsArchived", { listId: list.uuid });
  }, [list.uuid, navigation, TagRepository, ListRepository, ProductRepository]);

  const handleDelete = () => {
    ListRepository.removeItemArchived(list.uuid);
  };

  const RightSwipe = useCallback((progress: SharedValue<number>, translation: SharedValue<number>, swipeableMethods?: SwipeableMethods) => {
    return (
      <Animated.View
        style={{
          width: 100,
          overflow: "hidden",
        }}
      >
        <View style={styles.buttonView}>
          <TouchableHighlight
            style={styles.buttonInner}
            underlayColor={ConfigRepository.color.swipeIconUnderlay}
            onPress={handleDelete}
          >
            <View style={styles.buttonContent}>
              <RNText style={[styles.buttonTextIcon, { color: ConfigRepository.color.swipeIcon }]}>
                <FontAwesome
                  size={18}
                  style={{ marginBottom: -3 }}
                  name="trash"
                />
              </RNText>
              <RNText style={[styles.buttonText, { color: ConfigRepository.color.swipeIcon }]}>
                {I18n.t("delete")}
              </RNText>
            </View>
          </TouchableHighlight>
        </View>
      </Animated.View>
    );
  },
    [list]
  );

  return (
    <GridItem
      renderRightActions={RightSwipe}
      rightThreshold={undefined}
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
          <GridItemWrapperCol width="85%" >
            <GridItemWrapperInner align="flex-start">
              <Title2 color={ConfigRepository.color.itemListText}>{list.name}</Title2>
              <Text color={ConfigRepository.color.itemListTextSecondary}>
                {I18n.t("total")}: {ConfigRepository.currency}{" "}
                {total}
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width="15%" >
            <GridItemWrapperInner align="flex-end">
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

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  buttonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  buttonContent: {
    flex: 1,
  },
  buttonTextIcon: {
    flex: 10,
    paddingTop: 15,
    paddingBottom: 0,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  buttonText: {
    flex: 10,
    fontSize: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,
    textAlign: 'center',
  }
});