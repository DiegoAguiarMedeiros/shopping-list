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
import ListGridItem from "./listGridItem";

interface ListProps {
  item: IProduct;
  listId: string;
  handleOpen: (uuid: string, index: number) => void;
  handleClose: VoidFunction;
  active: boolean;
  index: number;
  tagRepository?: string;
}

function List({
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
  const { ListRepository, AmountRepository, ProductRepository, ConfigRepository } = useStores();
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



  const getAmountLength = (item: IProduct): number => {
    return item.amount.filter((a) => a.amount !== "").length;
  };

  const itemsQTY = ListRepository.listActive?.itemsQTY && ListRepository.listActive?.itemsQTY[item.uuid] ? ListRepository.listActive?.itemsQTY[item.uuid] : "1"
  const itemHeights = [115, 180, 240, 280, 330];
  const renderItemInner = () => (
    <GridItemInner
      onPress={active ? () => handleClose() : () => handleOpen(item.uuid, index)}
      underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
      borderColor={ConfigRepository.color.itemListItemOpenBackgroundBorder}
      background={active ? ConfigRepository.color.itemListItemOpenBackground : ConfigRepository.color.itemListBackground}
      height={active ? itemHeights[item.amount.length > 4 ? 4 : getAmountLength(item)] : 70}
      row
      elevation={colorScheme === "light"}
    >
      <GridItemWrapperCol width="100%">
        <ListGridItem item={item} handleClose={handleClose} active={active} />

        {active && <View style={styles.addPriceUnit}>
          <AddPriceUnit
            amounts={item.amount}
            itemsQTY={itemsQTY}
            listProductUuid={listProductUuid}
          />
        </View>}
      </GridItemWrapperCol>
    </GridItemInner>);

  return (
    <GridItemNoSwipeable>
      {active ? renderItemInner() :
        <GridItem
          renderRightActions={RightSwipe}
          leftThreshold={undefined}
          rightThreshold={100}
        >
          {renderItemInner()}
        </GridItem>}
    </GridItemNoSwipeable >
  )
}


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
  },
  addPriceUnit: {
    flex: 1,
    width: '100%',
    paddingTop: 6,
  },
});

export default React.memo(List, (prevProps, nextProps) => {
  return (
    isEqual(prevProps.active, nextProps.active) &&
    isEqual(prevProps.item.amount, nextProps.item.amount) &&
    isEqual(prevProps.tagRepository, nextProps.tagRepository)
  );
});
