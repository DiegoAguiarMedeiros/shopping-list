import { useColorScheme, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  BottomSheetProps,
  ItemAmountInterface,
  ItemInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../../../types/types";
import { FontAwesome } from "@expo/vector-icons";

import { Swipeable } from "react-native-gesture-handler";
import { Title, Text, Title2 } from "../../../components/Text";
import { IProduct } from "../../../Model/IProduct";
import GridItem from "../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperRow,
} from "../../../components/GridItemInner";
import ContainerInner from "../../../components/ContainerInner";
import Container from "../../../components/Container";
import { colorTheme } from "../../../../constants/Colors";
import { useStores } from "../../../context/StoreContext";

interface ListProps {
  item: IProduct;
  listId: string;
}

function ListGridItem({ item, listId }: Readonly<ListProps>) {
  const colorScheme = useColorScheme();
  const { ListRepository, ProductRepository, ConfigRepository } = useStores();
  const listIditemuuid = `${listId}-${item.uuid}`;

  return (
    <>
      {!item.amount || item.amount.length === 0 ? (
        <GridItemInner
          underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
          borderColor={ConfigRepository.color.itemListBackgroundBorder}
          background={ConfigRepository.color.itemListBackground}
          height={60}
          row
          elevation={colorScheme === "light"}
        >
          <GridItemWrapperCol width="60%" height={60}>
            <Title2 color={ConfigRepository.color.text}>{item.name}</Title2>
          </GridItemWrapperCol>
          <GridItemWrapperCol width="40%" height={60}>
            <GridItemWrapperRow>
              <GridItemWrapperCol width="50%">
                <Text color={ConfigRepository.color.textSecondary}>0 Un</Text>
              </GridItemWrapperCol>
              <GridItemWrapperCol width="50%">
                <Text color={ConfigRepository.color.textSecondary} align="right">
                  {ConfigRepository.currency} 0,00
                </Text>
              </GridItemWrapperCol>
            </GridItemWrapperRow>
          </GridItemWrapperCol>
        </GridItemInner>
      ) : (
        item.amount?.map((amount) => (
          <GridItemInner
            underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
            borderColor={ConfigRepository.color.itemListBackgroundBorder}
            background={ConfigRepository.color.itemListBackground}
            height={60}
            row
            elevation={colorScheme === "light"}
            key={`ContainerListItemListItem-` + amount.uuid}
          >
            <>
              <GridItemWrapperCol width="60%">
                <Title2 color={ConfigRepository.color.text}>{item.name}</Title2>
              </GridItemWrapperCol>
              <GridItemWrapperCol width="40%">
                <GridItemWrapperRow>
                  <GridItemWrapperCol width="50%" >
                    <Text color={ConfigRepository.color.text}>
                      {`${amount.quantity}`} {amount.type ? `Kg` : `Un`}
                      {" x"}
                    </Text>
                  </GridItemWrapperCol>
                  <GridItemWrapperCol width="50%">
                    <Text color={ConfigRepository.color.text} align="right">
                      {ConfigRepository.currency}{" "}
                      {Number(amount.amount).toFixed(2).replace(".", ",")}
                    </Text>
                    <View style={styles.containerItemTextPriceTotalLine} />
                    <View style={styles.containerItemTextPriceTotal}>
                      <Text
                        color={ConfigRepository.color.itemProductListAveragePrice}
                        align="right"
                      >
                        {ConfigRepository.currency}{" "}
                        {(Number(amount.quantity) * Number(amount.amount))
                          .toFixed(2)
                          .replace(".", ",")}
                      </Text>
                    </View>
                  </GridItemWrapperCol>
                </GridItemWrapperRow>
              </GridItemWrapperCol>
            </>
          </GridItemInner>
        ))
      )}
    </>
  );
}

const styles = StyleSheet.create({
    containerItemTextPriceTotalLine: {
        width: '100%',
        height: 1,
    },
    containerItemTextPriceTotal: {
        width: '100%',
        height: '49%',
    },
});

export default React.memo(ListGridItem);
