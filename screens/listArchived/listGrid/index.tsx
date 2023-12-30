import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../../constants/Colors";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import {
  BottomSheetProps,
  ItemInterface,
  ListInterface,
} from "../../../types/types";
import ListGridItem from "./listGridItem";
import { removeUndefinedFromArray } from "../../../utils/functions";
import {
  useShoppingListContext,
} from "../../../context/ShoppingList";

import { Text } from "../../../components/Text";
import getListProductController from "../../../Domain/UseCases/ListProduct/GetListProductByUuid";
import { IProduct } from "../../../Domain/Model/IProduct";
import getTotalQuantityAmountByListUuidController from "../../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import getTotalQuantityWithoutAmountByListUuidController from "../../../Domain/UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
import getTotalAmountByListUuidController from "../../../Domain/UseCases/List/GetTotalAmountByListUuid";
import ContainerInner from "../../../components/ContainerInner";
import Container from "../../../components/Container";
import { GridItemWrapperCol, GridItemWrapperInner, GridItemWrapperRow } from "../../../components/GridItemInner";
interface ListProps {
  listArrItems: IProduct[];
  filter: string;
  listId: string;
}

function ListGrid({ filter, listId, listArrItems }: ListProps) {
  const {
    listArchived
  } = useShoppingListContext();
  const colorScheme = useColorScheme();
  const [filteredList, setFilteredList] = useState<ItemInterface[]>();


  const total = getTotalAmountByListUuidController.handle(listId);


  // useEffect(() => {
  //   const newFilteredList = listArrItems.filter(
  //     (item: ItemInterface) => item.tags === filter
  //   );
  //   setFilteredList(newFilteredList);
  // }, [filter]);

  return (
    <Container
      background={"transparent"}
    >
      <ContainerInner>
        <GridItemWrapperRow height={85} >

          <SafeAreaView style={{ width: "100%" }}>
            <ScrollView style={[{ height: "100%" }]} nestedScrollEnabled>
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
        <GridItemWrapperRow height={5} >
          <GridItemWrapperCol width={40} height={100} >

            <GridItemWrapperInner height={100}>
              <Text
                color={
                  colorScheme !== "dark"
                    ? Colors[colorScheme ?? "light"].black
                    : Colors[colorScheme ?? "light"].white
                }
              >
                Items:{" "}
                {getTotalQuantityWithoutAmountByListUuidController.handle(listId)}
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
          <GridItemWrapperCol width={50} height={100} >

            <GridItemWrapperInner height={100}>
              <Text
                color={
                  colorScheme !== "dark"
                    ? Colors[colorScheme ?? "light"].black
                    : Colors[colorScheme ?? "light"].white
                }
                align="right"
              >
                Total : R${" "}
                {total}
              </Text>
            </GridItemWrapperInner>
          </GridItemWrapperCol>
        </GridItemWrapperRow>
      </ContainerInner>
    </Container>
  );
}

export default React.memo(ListGrid);
