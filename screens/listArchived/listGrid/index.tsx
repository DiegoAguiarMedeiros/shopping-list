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
  useShoppingListArchivedContext,
  useShoppingListContext,
} from "../../../context/ShoppingList";

import { Text } from "../../../components/Text";
import getListProductController from "../../../Domain/UseCases/ListProduct/GetListProductByUuid";
import { IProduct } from "../../../Domain/Model/IProduct";
import getTotalQuantityAmountByListUuidController from "../../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import getTotalQuantityWithoutAmountByListUuidController from "../../../Domain/UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
import getTotalAmountByListUuidController from "../../../Domain/UseCases/List/GetTotalAmountByListUuid";
interface ListProps {
  listArrItems: IProduct[];
  filter: string;
  listId: string;
}

function ListGrid({ filter, listId, listArrItems }: ListProps) {
  const {
    listArchived
  } = useShoppingListArchivedContext();
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
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerList>
        <Styled.ContainerListInner>
          <Styled.ContainerListItemList>
            <SafeAreaView>
              <ScrollView style={[{ height: "100%" }]} nestedScrollEnabled>
                <Styled.ContainerListItemListItem
                  height={`${listArrItems.length * 100 + 410}`}
                >
                  {listArrItems.map((item: IProduct) => (
                    <ListGridItem
                      key={"ListGridItem-" + item.uuid}
                      item={item}
                      listId={listId}
                    />
                  ))}
                </Styled.ContainerListItemListItem>
              </ScrollView>
            </SafeAreaView>
          </Styled.ContainerListItemList>
          <Styled.ContainerListTotal>
            <Styled.ContainerItemTotalUnitText
              text={Colors[colorScheme ?? "light"].bodyTextColor}
            >
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
            </Styled.ContainerItemTotalUnitText>
            <Styled.ContainerItemTotalText
              text={Colors[colorScheme ?? "light"].bodyTextColor}
            >
              <Text
                color={
                  colorScheme !== "dark"
                    ? Colors[colorScheme ?? "light"].black
                    : Colors[colorScheme ?? "light"].white
                }
              >
                Total : R${" "}
                {total}
              </Text>
            </Styled.ContainerItemTotalText>
          </Styled.ContainerListTotal>
        </Styled.ContainerListInner>
      </Styled.ContainerList>
    </Styled.Container>
  );
}

export default React.memo(ListGrid);
