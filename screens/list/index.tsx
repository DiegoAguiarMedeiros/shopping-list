import { TouchableOpacity, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import {
  ItemInterface,
  ListItemAmountInterface,
  ListItemInterface,
  ListType,
} from "../../types/types";
import {
  getTagsFromListItemInterface,
  removeUndefinedFromArray,
} from "../../utils/functions";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import EmptyList from "../../components/EmptyList";
import ListGrid from "./listGrid";
import CircleProgress from "../../components/CircleProgress";
import FilterButtons from "../../components/FilterButtons";
import { Title, Text } from "../../components/Text";
import BottomSheet, { BottomSheetProps } from "../../components/BottomSheet";
import Button from "../../components/Button";
import NewItemForm from "../../components/NewItemForm";
import getListProductController from "../../Domain/UseCases/ListProduct/GetListProductByUuid";
import getTotalQuantityAmountByListUuidController from "../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import getTotalAmountByListUuidController from "../../Domain/UseCases/List/GetTotalAmountByListUuid";
import getTagUuidByTagNameController from "../../Domain/UseCases/Tag/GetTagUuidByTagName";
import getTotalQuantityWithoutAmountByListUuidController from "../../Domain/UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
type TotalType = {
  amount: number;
  un: number;
};

interface ListProps {
  listId: string;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
}

export default function List({ listId,
  bottomSheetProps,
  setBottomSheetProps,
  handleCloseBottomSheet, }: ListProps) {
  const colorScheme = useColorScheme();
  const {
    list,
    setList,
  } = useShoppingListContext();
  const selectedItem = list.find((i) => i.uuid === listId);
  const [listArr, setListArr] = useState(selectedItem);

  const [listArrItems, setListArrItems] = useState(getListProductController.handle(selectedItem?.items ? selectedItem?.items : []));

  const tagsWithoutUndefinedFromArray = removeUndefinedFromArray(listArr?.tags!);
  tagsWithoutUndefinedFromArray.unshift("Todos");
  console.log("tagsWithoutUndefinedFromArray", tagsWithoutUndefinedFromArray)
  const totalQuantity = getTotalQuantityAmountByListUuidController.handle(listId);


  const [filter, setFilter] = useState("Todos");
  const [total, setTotal] = useState<TotalType>({
    amount: 0,
    un: 0,
  });
  const router = useRouter();




  useEffect(() => {
    const productsList = getListProductController.handle(selectedItem?.items ? selectedItem?.items : []);
    if (filter === "Todos") {
      setListArrItems(productsList);

      const newTotal: TotalType = {
        un: getTotalQuantityAmountByListUuidController.handle(listId),
        amount: getTotalQuantityWithoutAmountByListUuidController.handle(listId),
      };
      setTotal(newTotal);
      return;
    }
    setListArrItems(productsList.filter(product => getTagUuidByTagNameController.handle(filter) === product.tag));

    // const newFilteredList = listItemarr.filter(
    //   (item: ItemInterface) => item.tags === filter
    // );
    // setListArrItems(newFilteredList);

    // const newTotal: TotalType = {
    //   un: getTotalUn(newFilteredList),
    //   amount: getTotalWithAmount(newFilteredList),
    // };
    // setTotal(newTotal);

    return () => { };
  }, [filter]);

  const deleteItem = (item: ItemInterface) => {
    // const updatedList: ListItemInterface = JSON.parse(JSON.stringify(listItem));
    // handleDeleteAmountInList(updatedList[item.uuid].amount);
    // delete updatedList[item.uuid];
    // setListItem(updatedList);
    // handleDeleteItemListFromList(updatedList, item.uuid);
  };
  const handleDeleteAmountInList = (itemAmountUuid: string[]): void => {
    // const updatedList: ListItemAmountInterface = JSON.parse(
    //   JSON.stringify(itemAmountList)
    // );
    // itemAmountUuid.forEach((i) => {
    //   delete updatedList[i];
    // });
    // setItemAmountList(updatedList);
  };
  const handleDeleteItemListFromList = (
    updatedList: ListItemInterface,
    itemUuid: string
  ): void => {
    // const updatedListItem: ListType = JSON.parse(JSON.stringify(list));
    // const item = updatedListItem[listId];
    // if (item) {
    //   const newArray = item.items.filter((i) => i !== itemUuid);
    //   item.items = newArray;
    //   item.tags = getTagsFromListItemInterface(updatedList);
    //   setList(updatedListItem);
    // }
  };


  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].headerBackgroundColor}
    >
      <Styled.ContainerHeader>
        <Styled.ContainerHeaderInnerIconBack>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome
              name="angle-left"
              size={35}
              color={Colors[colorScheme ?? "light"].white}
            />
          </TouchableOpacity>
        </Styled.ContainerHeaderInnerIconBack>
        <Styled.ContainerHeaderInnerText>
          <Title color={Colors[colorScheme ?? "light"].white}>
            {listArr?.name}
          </Title>
        </Styled.ContainerHeaderInnerText>

        <Styled.ContainerHeaderInnerProgress>
          <CircleProgress
            activeStrokeColor={
              Colors[colorScheme ?? "light"]
                .circleProgresBackgroundFilledListColor
            }
            titleColor={
              Colors[colorScheme ?? "light"].circleProgresTextListColor
            }
            circleBackgroundColor={
              Colors[colorScheme ?? "light"].circleProgresBackgroundListColor
            }
            filled={total.amount}
            progress={total.un && total.amount ? total.amount : 0}
            total={total.un}
            size={30}
          />
        </Styled.ContainerHeaderInnerProgress>
      </Styled.ContainerHeader>
      {listArr && listArr.tags.length > 0 ? (
        <Styled.ContainerHeaderInnerFilterButtons>
          <FilterButtons
            tags={tagsWithoutUndefinedFromArray}
            filter={filter}
            setFilter={setFilter}
          />
        </Styled.ContainerHeaderInnerFilterButtons>
      ) : null}

      <Styled.ContainerBody>
        <Styled.ContainerListInner>
          {listArrItems.length > 0 ? (
            <ListGrid
              setBottomSheetProps={setBottomSheetProps}
              deleteItem={deleteItem}
              listArrItems={listArrItems}
              listId={listId}
              handleCloseBottomSheet={handleCloseBottomSheet}
            />
          ) : (
            <EmptyList mensage="Você não tem nenhuma item na lista" />
          )}
        </Styled.ContainerListInner>
      </Styled.ContainerBody>
    </Styled.Container>
  );
}
