import { useColorScheme, Animated } from "react-native";
import * as Styled from "./styles";
import React, { useState } from "react";
import {
  BottomSheetProps,
  ItemAmountInterface,
  ItemInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../../../../types/types";
import { FontAwesome } from "@expo/vector-icons";

import { Swipeable } from "react-native-gesture-handler";
import { Title, Text, Title2 } from "../../../../components/Text";
import { IProduct } from "../../../../Model/IProduct";
import GridItem from "../../../../components/GridItem";
import {
  GridItemInner,
  GridItemWrapperCol,
  GridItemWrapperRow,
} from "../../../../components/GridItemInner";
import ContainerInner from "../../../../components/ContainerInner";
import Container from "../../../../components/Container";
import { colorTheme } from "../../../../../constants/Colors";
import { useStores } from "../../../../context/StoreContext";

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
      {ProductRepository.products.length == 0 ? (
        <GridItemInner
          underlayColor={ConfigRepository.color.itemListBackgroundUnderlay}
          borderColor={ConfigRepository.color.itemListBackgroundBorder}
          background={ConfigRepository.color.itemListBackground}
          height={60}
          row
          elevation={colorScheme === "light"}
        >
          <GridItemWrapperCol width={100}>
            <Title2 color={ConfigRepository.color.text}>{item.name}</Title2>
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
              <GridItemWrapperCol width={60} height={100}>
                <Title2 color={ConfigRepository.color.text}>{item.name}</Title2>
              </GridItemWrapperCol>
              <GridItemWrapperCol width={40} height={100}>
                <GridItemWrapperRow height={100}>
                  <GridItemWrapperCol width={50} height={100}>
                    <Text color={ConfigRepository.color.text}>
                      {`${amount.quantity}`} {amount.type ? `Kg` : `Un`}
                      {" x"}
                    </Text>
                  </GridItemWrapperCol>
                  <GridItemWrapperCol width={50} height={100}>
                    <Text color={ConfigRepository.color.text} align="right">
                      {ConfigRepository.currency}{" "}
                      {Number(amount.amount).toFixed(2).replace(".", ",")}
                    </Text>
                    <Styled.ContainerItemTextPriceTotalLine
                      border={ConfigRepository.color.primary}
                    />
                    <Styled.ContainerItemTextPriceTotal>
                      <Text
                        color={ConfigRepository.color.itemProductListAveragePrice}
                        align="right"
                      >
                        {ConfigRepository.currency}{" "}
                        {(Number(amount.quantity) * Number(amount.amount))
                          .toFixed(2)
                          .replace(".", ",")}
                      </Text>
                    </Styled.ContainerItemTextPriceTotal>
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

export default React.memo(ListGridItem);
