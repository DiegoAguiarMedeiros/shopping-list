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
import { useShoppingListContext } from "../../../context/ShoppingList";

import Button from "../../../components/Button";
import BottomSheetComponent from "../../../components/BottomSheetComponent";
interface ListProps {
  filter: string;
  listId: string;
}

function ListGrid({ filter, listId }: ListProps) {
  const { list, getListItemsOfList, getTotal, getTotalUn } =
    useShoppingListContext();
  const colorScheme = useColorScheme();
  const [filteredList, setFilteredList] = useState<ItemInterface[]>();
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    listId: listId,
    buttonText: "add",
    action: "addListItem",
    isVisible: false,
    onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
  });
  const listArr = list[Array.isArray(listId) ? "" : listId];
  const listArrItems = removeUndefinedFromArray(
    getListItemsOfList(listArr.items)
  );
  useEffect(() => {
    const newFilteredList = listArrItems.filter(
      (item: ItemInterface) => item.tags === filter
    );
    setFilteredList(newFilteredList);
  }, [filter]);

  return (
    <Styled.Container background={Colors[colorScheme ?? "light"].background}>
      <Styled.ContainerList>
        <Styled.ContainerListInner>
          <Styled.ContainerListTotal>
            <Styled.ContainerItemTotalUnitText
              text={Colors[colorScheme ?? "light"].text}
            >
              Total Items:{" "}
              {getTotalUn(
                filteredList !== undefined && filteredList.length > 0
                  ? filteredList
                  : listArrItems
              )}
            </Styled.ContainerItemTotalUnitText>
            <Styled.ContainerItemTotalText
              text={Colors[colorScheme ?? "light"].text}
            >
              Total : R${" "}
              {getTotal(
                filteredList !== undefined && filteredList.length > 0
                  ? filteredList
                  : listArrItems
              ).toFixed(2)}
            </Styled.ContainerItemTotalText>
          </Styled.ContainerListTotal>
          <Styled.ContainerListItemList>
            <SafeAreaView>
              <ScrollView style={[{ height: "100%" }]} nestedScrollEnabled>
                <Styled.ContainerListItemListItem
                  height={
                    filter === "Todos"
                      ? `${listArrItems.length * 100 + 410}`
                      : `${filteredList!.length * 100 + 410}`
                  }
                >
                  {filter === "Todos"
                    ? listArrItems.map((item: ItemInterface) => (
                        <ListGridItem
                          key={"ListGridItem-" + item.uuid}
                          setBottomSheetProps={setBottomSheetProps}
                          item={item}
                          listId={listId}
                        />
                      ))
                    : filteredList?.map((item: ItemInterface) => (
                        <ListGridItem
                          key={"ListGridItem-" + item.uuid}
                          setBottomSheetProps={setBottomSheetProps}
                          item={item}
                          listId={listId}
                        />
                      ))}
                </Styled.ContainerListItemListItem>
              </ScrollView>
            </SafeAreaView>
          </Styled.ContainerListItemList>
          <Styled.ContainerButtonAdd>
            <Button
              text="Adicionar"
              onPress={() =>
                setBottomSheetProps({ ...bottomSheetProps, isVisible: true })
              }
              background={Colors[colorScheme ?? "light"].buttonBackground}
              icon="plus"
            />
          </Styled.ContainerButtonAdd>
        </Styled.ContainerListInner>
      </Styled.ContainerList>
      <BottomSheetComponent {...bottomSheetProps} />
    </Styled.Container>
  );
}

export default React.memo(ListGrid);
