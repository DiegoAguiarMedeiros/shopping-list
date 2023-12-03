import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../../constants/Colors";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { ItemInterface, TagsIterface } from "../../../types/types";
import ListGridItem from "./listGridItem";
import { useShoppingListContext } from "../../../context/ShoppingList";
import { Text } from "../../../components/Text";

import Button from "../../../components/Button";

import { BottomSheetProps } from "../../../components/BottomSheet";
import BottomSheet from "../../../components/BottomSheet";
import { removeUndefinedFromArray } from "../../../utils/functions";
import ITag from "../../../Domain/Model/ITag";
import { IProduct } from "../../../Domain/Model/IProduct";
import getTotalQuantityAmountByListUuidController from "../../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import getTotalAmountByListProductUuidController from "../../../Domain/UseCases/List/GetTotalAmountByListUuid";
import getTotalQuantityWithoutAmountByListUuidController from "../../../Domain/UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
interface ListProps {
  listId: string;
  listArrItems: IProduct[];
  deleteItem: (item: ItemInterface) => void;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

function ListGrid({
  listArrItems,
  listId,
  deleteItem,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: ListProps) {
  const { list } = useShoppingListContext();
  const colorScheme = useColorScheme();
  const totalQuantity = getTotalQuantityAmountByListUuidController.handle(listId);
  const total = getTotalAmountByListProductUuidController.handle(listId);

  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerList>
        <Styled.ContainerListInner>
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
                Total Items: {totalQuantity}
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
                Total : R$ {total}
              </Text>
            </Styled.ContainerItemTotalText>
          </Styled.ContainerListTotal>
          <Styled.ContainerListItemList>
            <SafeAreaView>
              <ScrollView style={[{ height: "100%" }]} nestedScrollEnabled>
                <Styled.ContainerListItemListItem>
                  {listArrItems.map((item: IProduct) => (
                    <ListGridItem
                      key={"ListGridItem-" + item.uuid}
                      setBottomSheetProps={setBottomSheetProps}
                      item={item}
                      listId={listId}
                      deleteItem={deleteItem}
                      handleCloseBottomSheet={handleCloseBottomSheet}
                    />
                  ))}
                </Styled.ContainerListItemListItem>
              </ScrollView>
            </SafeAreaView>
          </Styled.ContainerListItemList>
        </Styled.ContainerListInner>
      </Styled.ContainerList>
    </Styled.Container>
  );
}

export default React.memo(ListGrid);
