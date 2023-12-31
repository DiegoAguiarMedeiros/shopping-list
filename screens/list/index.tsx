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
  removeDuplicates,
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
import getTagsController from "../../Domain/UseCases/ListProduct/GetTagsByProductUuidArray";
import Container from "../../components/Container";
import Header from "../../components/Header";
import ContainerInner from "../../components/ContainerInner";
type TotalType = {
  amount: number;
  un: number;
};

interface ListProps {
  listId: string;
  handleCloseBottomSheetList: () => void;
}

export default function List({
  listId,
  handleCloseBottomSheetList }: Readonly<ListProps>) {
  const colorScheme = useColorScheme();
  const {
    list,
    listProduct,
    amount,
  } = useShoppingListContext();
  const selectedItem = list.find((i) => i.uuid === listId);
  const [tags, setTags] = useState(selectedItem?.tags ? ["Todos", ...selectedItem?.tags] : []);
  const [listArr, setListArr] = useState(selectedItem);

  const [listArrItems, setListArrItems] = useState(getListProductController.handle(selectedItem?.items ? selectedItem?.items : []));

  const totalQuantity = getTotalQuantityAmountByListUuidController.handle(listId);


  const [filter, setFilter] = useState("Todos");
  const [total, setTotal] = useState<TotalType>({
    amount: 0,
    un: 0,
  });
  const router = useRouter();

  const returnToHome = () => {
    handleCloseBottomSheetList();
    router.push({ pathname: "/home" })
  }

  useEffect(() => {
    const productsList = getListProductController.handle(selectedItem?.items ? selectedItem?.items : []);
    setTags(selectedItem?.tags ? ["Todos", ...selectedItem?.tags] : []);
    if (filter === "Todos") {
      setListArrItems(productsList);

      const newTotal: TotalType = {
        un: getTotalQuantityAmountByListUuidController.handle(listId),
        amount: getTotalQuantityWithoutAmountByListUuidController.handle(listId),
      };
      setTotal(newTotal);
      return;
    }

    const filteredProductsList = productsList.filter(product => getTagUuidByTagNameController.handle(filter) === product.tag)
    const newTotal: TotalType = {
      un: getTotalQuantityAmountByListUuidController.handle(listId, filteredProductsList),
      amount: getTotalQuantityWithoutAmountByListUuidController.handle(listId, filteredProductsList),
    };

    setTotal(newTotal);
    setListArrItems(filteredProductsList);

    return () => { };
  }, [filter, amount, listProduct, list]);



  return (
    <Container
      background={Colors[colorScheme ?? "light"].grayScalePrimary}
      noPadding
    >
      <Header
        background={Colors[colorScheme ?? "light"].primary}
        left={<TouchableOpacity onPress={() => returnToHome()}>
          <FontAwesome
            name="angle-left"
            size={35}
            color={Colors[colorScheme ?? "light"].white}
          />
        </TouchableOpacity>}

        title={<Title color={Colors[colorScheme ?? "light"].white}>
          {listArr?.name}
        </Title>}

        right={<CircleProgress
          activeStrokeColor={
            Colors[colorScheme ?? "light"]
              .secondary
          }
          titleColor={
            Colors[colorScheme ?? "light"].text
          }
          circleBackgroundColor={
            Colors[colorScheme ?? "light"].primary
          }
          filled={total.amount}
          progress={total.un && total.amount ? total.amount : 0}
          total={total.un}
          size={25}
        />}


        bottom={listArr && listArr.tags.length > 0 ? (
          <FilterButtons
            tags={tags}
            filter={filter}
            setFilter={setFilter}
          />
        ) : null}
      />
      <ContainerInner
        justify="center"
        background={Colors[colorScheme ?? "light"].grayScalePrimary}>
        {listArrItems.length > 0 ? (
          <ListGrid
            listArrItems={listArrItems}
            listId={listId}
          />
        ) : (
          <EmptyList mensage="Você não tem nenhuma item na lista" />
        )}
      </ContainerInner>
    </Container >
  );
}

