import { useColorScheme, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import {
  BottomSheetProps,
  ItemInterface,
  ListInterface,
} from "../../../types/types";
import ListGridItem from "./listGridItem";
import { removeUndefinedFromArray } from "../../../utils/functions";

import { Text } from "../../../components/Text";
import { IProduct } from "../../../Model/IProduct";
import ContainerInner from "../../../components/ContainerInner";
import Container from "../../../components/Container";
import {
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../components/GridItemInner";
import I18n from "i18n-js";
import { IList } from "../../../Model/IList";
import { colorTheme } from "../../../../constants/Colors";
import { useStores } from "../../../context/StoreContext";
interface ListProps {
  listId: string;
  listArrItems: IProduct[];
  color: colorTheme;
  filter: string;
}

function ListGrid({
  listArrItems,
  filter,
  listId,
  color,
}: Readonly<ListProps>) {
  const {   ConfigRepository } = useStores();
  // const total = getTotalAmountByListUuid(listId);
  return (
    <Container background={"transparent"}>
      <ContainerInner>
        <Text color={color.text} align="center">
          Teste
        </Text>
        {/* <GridItemWrapperRow height={95}>
          <SafeAreaView style={{ width: "100%" }}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={[{ height: "100%" }]}
              nestedScrollEnabled
            >
              {listArrItems.map((item: IProduct) => (
                <ListGridItem
                  key={"ListGridItem-" + item.uuid}
                  item={item}
                  listId={listId}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </GridItemWrapperRow>
        <GridItemWrapperRow height={5}>
          <GridItemWrapperCol width={50} height={100}>
            <GridItemWrapperInner height={100}>
              <Text color={color.text}>
                TODO
                {/* {I18n.t("items")}: {getTotalQuantityAmountByListUuid(listId)} 
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={50} height={100}>
            <GridItemWrapperInner height={100}>
              <Text color={color.text} align="right"> asd
                {I18n.t("total")}: {ConfigRepository.currency}{" "}
                {/* {total.toFixed(2).replace(".", ",")} 
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
        </GridItemWrapperRow> */}
      </ContainerInner>
    </Container>
  );
}

export default React.memo(ListGrid);
