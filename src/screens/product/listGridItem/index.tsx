import { useColorScheme, Animated, StyleSheet, TouchableHighlight, View, Text as RNText } from "react-native";

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

    const LeftSwipe =  (progress: SharedValue<number>, translation: SharedValue<number>, swipeableMethods?: SwipeableMethods) => {
      return (
        <Animated.View
          style={{
            width: 200,
            overflow: "hidden",
          }}
        >
          <GridItemInner row>
            <>
              <GridItemWrapperCol width={50}>
                <TouchableHighlight
                  style={styles.buttonInner}
                  underlayColor={ConfigRepository.color.swipeIconUnderlay}
                  onPress={handleEdit}
                >
                  <View style={styles.buttonContent}>
                    <GridItemWrapperInner height={lastPrice.length > 0 ? 50 : 60}>
                      <RNText style={[styles.buttonTextIcon, { color: ConfigRepository.color.swipeIcon }]}>
                        <FontAwesome
                          size={lastPrice.length > 0 ? 26 : 18}
                          style={{ marginBottom: -3 }}
                          name="pencil"
                        />
                      </RNText>
                    </GridItemWrapperInner>

                    <GridItemWrapperInner
                      height={lastPrice.length > 0 ? 50 : 40}
                      justify={lastPrice.length > 0 ? "flex-start" : "flex-end"}
                    >
                      {lastPrice.length > 0 ? (
                        <SubTitle color={ConfigRepository.color.swipeIcon} align="center">
                          {I18n.t("edit")}
                        </SubTitle>
                      ) : (
                        <Text color={ConfigRepository.color.swipeIcon} align="center">
                          {I18n.t("edit")}
                        </Text>
                      )}
                    </GridItemWrapperInner>
                  </View>
                </TouchableHighlight>
              </GridItemWrapperCol>

              <GridItemWrapperCol width={50}>
                <TouchableHighlight
                  style={styles.buttonInner}
                  underlayColor={ConfigRepository.color.swipeIconUnderlay}
                  onPress={handleDelete}
                >
                  <View style={styles.buttonContent}>
                    <GridItemWrapperInner height={lastPrice.length > 0 ? 50 : 60}>
                      <RNText style={[styles.buttonTextIcon, { color: ConfigRepository.color.swipeIcon }]}>
                        <FontAwesome
                          size={lastPrice.length > 0 ? 26 : 18}
                          style={{ marginBottom: -3 }}
                          name="trash"
                        />
                      </RNText>
                    </GridItemWrapperInner>
                    <GridItemWrapperInner
                      height={lastPrice.length > 0 ? 50 : 40}
                      justify={lastPrice.length > 0 ? "flex-start" : "flex-end"}
                    >
                      {lastPrice.length > 0 ? (
                        <SubTitle color={ConfigRepository.color.swipeIcon} align="center">
                          {I18n.t("delete")}
                        </SubTitle>
                      ) : (
                        <Text color={ConfigRepository.color.swipeIcon} align="center">
                          {I18n.t("delete")}
                        </Text>
                      )}
                    </GridItemWrapperInner>
                  </View>
                </TouchableHighlight>
              </GridItemWrapperCol>
            </>
          </GridItemInner>
        </Animated.View>
      );
    };
    return (
      <GridItem
        renderRightActions={LeftSwipe}
        leftThreshold={100}
        rightThreshold={undefined}
      >
        <GridItemInner
          underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
          borderColor={ConfigRepository.color.itemListBackgroundBorder}
          background={ConfigRepository.color.itemListBackground}
          height={lastPrice.length > 0 ? 115 : 60}
          row={false}
          elevation={colorScheme === "light"}
        >
          <>
            <GridItemWrapperRow height={lastPrice.length >= 0 ? 35 : 100}>
              <GridItemWrapperInner height={lastPrice.length >= 0 ? 35 : 100}>
                <SubTitle color={ConfigRepository.color.text}>{item.name}2</SubTitle>
              </GridItemWrapperInner>
            </GridItemWrapperRow>
            <GridItemWrapperRow height={lastPrice.length > 0 ? 67 : 0}>
              {lastPrice.length > 0 ? (
                <GridItemWrapperInner
                  width={70}
                  height={100}
                  justify="flex-start"
                >
                  <LastPrices lastPrices={lastPrice} />
                </GridItemWrapperInner>
              ) : (
                <></>
              )}
              {lastPrice.length > 0 ? (
                <GridItemWrapperInner
                  width={30}
                  height={100}
                  justify="flex-start"
                >
                  <AveragePrice price={lastPrice} />
                </GridItemWrapperInner>
              ) : (
                <></>
              )}
            </GridItemWrapperRow>
          </>
        </GridItemInner>
      </GridItem>
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.item, nextProps.item);
  }
);

const styles = StyleSheet.create({
  buttonInner: {
    height: '100%',
    borderRadius: 15,
  },
  buttonContent: {
    flexDirection: 'column',
    flex: 1,
  },
  buttonTextIcon: {
    width: '100%',
    textAlign: 'center',
  },
});

export default ListGridItem;
