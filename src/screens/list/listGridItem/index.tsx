import { useColorScheme, Animated, View, TouchableHighlight, StyleSheet, Text as RNText } from "react-native";
import React, { useState } from "react";

import { FontAwesome } from "@expo/vector-icons";

import { Title, Text, Title2 } from "../../../components/Text";

import AddPriceUnit from "../../../components/addPriceUnit";
import { IProduct } from "../../../Model/IProduct";
import GridItem from "../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../components/GridItemInner";
import GridItemNoSwipeable from "../../../components/GridItemNoSwipeable";
import I18n from "i18n-js";
import IAmount from "../../../Model/IAmount";
import { colorTheme } from "../../../../constants/Colors";
import { IList } from "../../../Model/IList";
import isEqual from "lodash.isequal";
import { useStores } from "../../../context/StoreContext";
import { SwipeableMethods } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import { SharedValue } from "react-native-reanimated";

interface ListProps {
  item: IProduct;
  listId: string;
  handleOpen: (uuid: string, index: number) => void;
  handleClose: () => void;
  active: boolean;
  index: number;
  tagRepository?: string;
}

function ListGridItem({
  item,
  listId,
  handleOpen,
  handleClose,
  active,
  index,
  tagRepository
}: ListProps) {
  const colorScheme = useColorScheme();
  const listProductUuid = `${listId}-${item.uuid}`;
  const { AmountRepository, ProductRepository, ConfigRepository } = useStores();
  const handleDelete = () => {
    ProductRepository.removeItemFromlist(item.uuid);
    AmountRepository.removeAllItems(listProductUuid);
    ProductRepository.load();
    ProductRepository.updateTotal();
    ProductRepository.updateTotalUn();
    ProductRepository.updateTotalWithAmount();
    ProductRepository.updateTotalWithoutAmount();
  };

  function RightSwipe(progress: SharedValue<number>, translation: SharedValue<number>, swipeableMethods?: SwipeableMethods) {
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
  }

  const showUnitFromAmount = (amounts: IAmount[]): string => {
    let checkUnit: boolean = true;
    let unit: string = "Un";
    let quantity: number = 0;
    amounts.forEach((amount) => {
      if (checkUnit) unit = amount.type ? "Kg" : "Un";
      if (!amount.type) checkUnit = false;
      quantity = Number(quantity) + Number(amount.quantity);
    });
    if (unit === "Un") return `${unit}: ${quantity.toFixed(0)}`;
    return `${unit}: ${quantity.toFixed(3)}`;
  };

  const itemHeights = [115, 180, 240, 280, 330];

  return active ? (
    <GridItemNoSwipeable>
      <GridItemInner
        underlayColor={ConfigRepository.color.itemListItemOpenBackgroundUnderlay}
        borderColor={ConfigRepository.color.itemListItemOpenBackgroundBorder}
        background={ConfigRepository.color.itemListItemOpenBackground}
        height={itemHeights[item.amount.length > 4 ? 4 : item.amount.length]}
        row
        elevation={colorScheme === "light"}
      >
        <GridItemWrapperCol width="100%">
          <GridItemWrapperRow maxHeight={50}>
            <GridItemWrapperInner width="10%" >
              <Title color={ConfigRepository.color.itemListItemOpenIcon}>
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  color={
                    item.amount.length > 0
                      ? ConfigRepository.color.itemListItemOpenIconFilled
                      : ConfigRepository.color.itemListItemOpenIcon
                  }
                  name={item.amount.length > 0 ? "check-circle-o" : "circle-o"}
                />
              </Title>
            </GridItemWrapperInner>
            <GridItemWrapperInner width="80%" >
              <GridItemWrapperCol width="100%">
                <GridItemWrapperInner width="100%" height="50%">
                  <Title2 color={ConfigRepository.color.text}>{item.name}</Title2>
                </GridItemWrapperInner>
                <GridItemWrapperRow height="50%" justify="space-between" align="flex-start">
                  <GridItemWrapperInner
                    width="50%"
                    justify="flex-start"
                    align="flex-start"
                  >
                    <Text color={ConfigRepository.color.textSecondary}>
                      {I18n.t("total")}: {ConfigRepository.currency} {item.total}
                    </Text>
                  </GridItemWrapperInner>
                  <GridItemWrapperInner width="50%" justify="flex-start" align="flex-start">
                    <Text color={ConfigRepository.color.textSecondary}>
                      {showUnitFromAmount(item.amount)}
                    </Text>
                  </GridItemWrapperInner>
                </GridItemWrapperRow>
              </GridItemWrapperCol>
            </GridItemWrapperInner>
            <GridItemWrapperInner width="10%" >
              <Title color={ConfigRepository.color.text} align="right">
                <FontAwesome
                  onPress={() => handleClose()}
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="angle-up"
                />
              </Title>
            </GridItemWrapperInner>
          </GridItemWrapperRow>
          <View style={styles.addPriceUnit}>
            <AddPriceUnit
              amounts={item.amount}
              listProductUuid={listProductUuid}
            />
          </View>
        </GridItemWrapperCol>
      </GridItemInner>
    </GridItemNoSwipeable>
  ) : (
    <GridItem
      renderRightActions={RightSwipe}
      leftThreshold={undefined}
      rightThreshold={100}
    >
      <GridItemInner
        onPress={() => handleOpen(item.uuid, index)}
        underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
        borderColor={ConfigRepository.color.itemListBackgroundBorder}
        background={ConfigRepository.color.itemListBackground}
        height={70}
        row
        elevation={colorScheme === "light"}
      >
        <GridItemWrapperRow maxHeight={60}>
          <GridItemWrapperInner width="10%" height="100%">
            <Title color={ConfigRepository.color.text}>
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                color={
                  item.amount.length > 0
                    ? ConfigRepository.color.itemListIconFilled
                    : ConfigRepository.color.itemListIcon
                }
                name={item.amount.length > 0 ? "check-circle-o" : "circle-o"}
              />
            </Title>
          </GridItemWrapperInner>
          <GridItemWrapperInner width="80%" height="100%">
            <GridItemWrapperCol width="100%">
              <GridItemWrapperInner width="100%" height="50%">
                <Title2 color={ConfigRepository.color.text}>{item.name}</Title2>
              </GridItemWrapperInner>
              <GridItemWrapperRow height="50%" justify="space-between" align="flex-start">
                <GridItemWrapperInner
                  width="50%"
                  justify="flex-start"
                  align="flex-start"
                >
                  <Text color={ConfigRepository.color.textSecondary}>
                    {I18n.t("total")}: {ConfigRepository.currency} {item.total}
                  </Text>
                </GridItemWrapperInner>
                <GridItemWrapperInner width="50%" justify="flex-start" align="flex-start">
                  <Text color={ConfigRepository.color.textSecondary}>
                    {showUnitFromAmount(item.amount)}
                  </Text>
                </GridItemWrapperInner>
              </GridItemWrapperRow>
            </GridItemWrapperCol>
          </GridItemWrapperInner>
          <GridItemWrapperInner width="10%" height="100%">
            <Title color={ConfigRepository.color.text} align="right">
              <FontAwesome
                onPress={() => handleOpen(item.uuid, index)}
                size={28}
                style={{ marginBottom: -3 }}
                name="angle-down"
              />
            </Title>
          </GridItemWrapperInner>
        </GridItemWrapperRow>
      </GridItemInner>
    </GridItem>
  );
}


const styles = StyleSheet.create({
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  buttonInner: {
    borderRadius: 15,
    width: '100%',
    height: '100%',
  },
  buttonContent: {
    flex: 1
  },
  buttonTextIcon: {
    flex: 1
  },
  buttonText: {
    flex: 10,
    paddingTop: 15,
    paddingBottom: 0,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  addPriceUnit: {
    flex: 1,
    width: '100%',
    paddingTop: 6,
  },
});

export default React.memo(ListGridItem, (prevProps, nextProps) => {
  return (
    isEqual(prevProps.active, nextProps.active) &&
    isEqual(prevProps.item.amount, nextProps.item.amount) &&
    isEqual(prevProps.tagRepository, nextProps.tagRepository)
  );
});
