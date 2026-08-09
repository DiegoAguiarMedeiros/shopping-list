import { useColorScheme, Animated, StyleSheet, TouchableHighlight, View, Text as RNText, Pressable } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { SubTitle, Text, Title2 } from "../../../components/Text";

import { BottomSheetProps } from "../../../components/BottomSheet";
import NewProductForm from "../../../components/NewProductForm";
import { IProduct } from "../../../Model/IProduct";
import AveragePrice from "./AveragePrice";
import LastPrices from "./LastPrices";
import GridItem from "../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../components/GridItemInner";
import I18n from "i18n-js";
import { colorTheme } from "../../../../constants/Colors";
import { useStores } from "../../../context/StoreContext";
import React from "react";
import isEqual from "lodash.isequal";
import { SwipeableMethods } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import { SharedValue } from "react-native-reanimated";

interface ItemProps {
  item: IProduct;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

const ListGridItem = React.memo(
  ({
    item,
    setBottomSheetProps,
    handleCloseBottomSheet,
  }: Readonly<ItemProps>) => {
    const { ProductRepository, TagRepository, ConfigRepository } = useStores();
    const colorScheme = useColorScheme();
    const lastPrice = item.lastPrices ?? [];
    const handleEdit = () => {
      setBottomSheetProps({
        height: "edit",
        children: (
          <NewProductForm
            action="editList"
            buttonText="edit"
            items={item}
            onClose={handleCloseBottomSheet}
          />
        ),
        isVisible: true,
      });
    };

    const handleDelete = () => {
      ProductRepository.removeItem(item.uuid);
      TagRepository.decreaseProductQTD(item.tag);
    };

    const RightSwipe = (progress: SharedValue<number>, translation: SharedValue<number>, swipeableMethods?: SwipeableMethods) => {
      return (
        <Animated.View
          style={{
            width: 200,
            overflow: "hidden",
          }}
        >
          <View style={styles.buttonView}>
            <Pressable
              style={styles.buttonInner}
              android_ripple={{ color: ConfigRepository.color.swipeIconUnderlay }}
              onPress={handleEdit}
            >
              <View style={styles.buttonContent}>
                <RNText style={[styles.buttonTextIcon, { color: ConfigRepository.color.swipeIcon }]}>
                  <FontAwesome
                    size={18}
                    name="pencil"
                  />
                </RNText>
                <RNText style={[styles.buttonText, { color: ConfigRepository.color.swipeIcon }]}>
                  {I18n.t("edit")}
                </RNText>
              </View>
            </Pressable>

            <Pressable
              style={styles.buttonInner}
              android_ripple={{ color: ConfigRepository.color.swipeIconUnderlay }}
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
            </Pressable>
          </View>
        </Animated.View>
      );
    };
    return (
      <GridItem
        renderRightActions={RightSwipe}
        leftThreshold={100}
        rightThreshold={undefined}
      >
        <GridItemInner
          underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
          borderColor={ConfigRepository.color.itemListBackgroundBorder}
          background={ConfigRepository.color.itemListBackground}
          height={lastPrice.length > 0 ? 90 : 60}
          row={false}
          elevation={colorScheme === "light"}
        >
          <GridItemWrapperRow height={lastPrice.length > 0 ? 35 : 40}>
            <GridItemWrapperInner height={lastPrice.length > 0 ? 35 : 40}>
              <SubTitle color={ConfigRepository.color.text}>{item.name}</SubTitle>
            </GridItemWrapperInner>
          </GridItemWrapperRow>
          <GridItemWrapperRow height={lastPrice.length > 0 ? 55 : 0}>
            {lastPrice.length > 0 ? (
              <GridItemWrapperInner
                width="70%"
                justify="flex-start"
              >
                <LastPrices lastPrices={lastPrice} />
              </GridItemWrapperInner>
            ) : (
              <></>
            )}
            {lastPrice.length > 0 ? (
              <GridItemWrapperInner
                width="30%"
                justify="flex-start"
              >
                <AveragePrice price={lastPrice} />
              </GridItemWrapperInner>
            ) : (
              <></>
            )}
          </GridItemWrapperRow>
        </GridItemInner>
      </GridItem>
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.item, nextProps.item);
  }
);

const styles = StyleSheet.create({
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonInner: {
    width: '50%',
    height: '80%',
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextIcon: {
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  }
});

export default ListGridItem;
