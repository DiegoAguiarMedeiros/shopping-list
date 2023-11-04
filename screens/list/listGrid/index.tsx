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
interface ListProps {
  listId: string;
  listArrItems: ItemInterface[];
  deleteItem: (item: ItemInterface) => void;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  tagsWithoutTodos: ITag[];
}

function ListGrid({
  listArrItems,
  listId,
  deleteItem,
  setBottomSheetProps,
  handleCloseBottomSheet,
  tagsWithoutTodos,
}: ListProps) {
  const { list, getTotal, getTotalUn } = useShoppingListContext();
  const colorScheme = useColorScheme();

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
                Total Items: {getTotalUn(listArrItems)}
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
                Total : R$ {getTotal(listArrItems).toFixed(2)}
              </Text>
            </Styled.ContainerItemTotalText>
          </Styled.ContainerListTotal>
          <Styled.ContainerListItemList>
            <SafeAreaView>
              <ScrollView style={[{ height: "100%" }]} nestedScrollEnabled>
                <Styled.ContainerListItemListItem>
                  {listArrItems.map((item: ItemInterface) => (
                    <ListGridItem
                      tagsWithoutTodos={tagsWithoutTodos}
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
