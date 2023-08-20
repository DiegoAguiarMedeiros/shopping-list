import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../../constants/Colors";
import * as Styled from "./styles";
import React, { useState } from "react";
import { BottomSheetProps, ItemInterface } from "../../../types/types";
import ListGridItem from "./listGridItem";
import { useShoppingListContext } from "../../../context/ShoppingList";
import { Text } from "../../../components/Text";

import Button from "../../../components/Button";
import BottomSheetComponent from "../../../components/BottomSheetComponent";
interface ListProps {
  listId: string;
  listArrItems: ItemInterface[];
  deleteItem: (item: ItemInterface) => void;
}

function ListGrid({ listArrItems, listId, deleteItem }: ListProps) {
  const { getTotal, getTotalUn } = useShoppingListContext();
  const colorScheme = useColorScheme();
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    listId: listId,
    buttonText: "add",
    action: "addListItem",
    isVisible: false,
    onClose: (item: BottomSheetProps) => setBottomSheetProps(item),
  });

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
              <Text color={
                    colorScheme !== "dark"
                      ? Colors[colorScheme ?? "light"].black
                      : Colors[colorScheme ?? "light"].white
                  }>Total Items: {getTotalUn(listArrItems)}</Text>
            </Styled.ContainerItemTotalUnitText>
            <Styled.ContainerItemTotalText
              text={Colors[colorScheme ?? "light"].bodyTextColor}
            >
              <Text color={
                    colorScheme !== "dark"
                      ? Colors[colorScheme ?? "light"].black
                      : Colors[colorScheme ?? "light"].white
                  }>Total : R$ {getTotal(listArrItems).toFixed(2)}</Text>
            </Styled.ContainerItemTotalText>
          </Styled.ContainerListTotal>
          <Styled.ContainerListItemList>
            <SafeAreaView>
              <ScrollView style={[{ height: "100%" }]} nestedScrollEnabled>
                <Styled.ContainerListItemListItem
                  height={`${listArrItems.length * 100 + 410}`}
                >
                  {listArrItems.map((item: ItemInterface) => (
                    <ListGridItem
                      key={"ListGridItem-" + item.uuid}
                      setBottomSheetProps={setBottomSheetProps}
                      item={item}
                      listId={listId}
                      deleteItem={deleteItem}
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
              background={
                Colors[colorScheme ?? "light"].buttonActiveBackgroundColor
              }
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
