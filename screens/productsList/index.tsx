import { TouchableOpacity, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { useShoppingListContext } from "../../context/ShoppingList";
import {
  ItemInterface,
  ListItemInterface,
} from "../../types/types";

import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import EmptyList from "../../components/EmptyList";
import ListGrid from "./listGrid";
import CircleProgress from "../../components/CircleProgress";
import FilterButtons from "../../components/FilterButtons";
import { Title } from "../../components/Text";
import { BottomSheetProps } from "../../components/BottomSheet";
import getListProductController from "../../Domain/UseCases/ListProduct/GetListProductByUuid";
import getTotalQuantityAmountByListUuidController from "../../Domain/UseCases/List/GetTotalQuantityAmountByListUuid";
import getTagUuidByTagNameController from "../../Domain/UseCases/Tag/GetTagUuidByTagName";
import getTotalQuantityWithoutAmountByListUuidController from "../../Domain/UseCases/List/GetTotalQuantityWithoutAmountByListUuid";
import Container from "../../components/Container";
import ContainerInner from "../../components/ContainerInner";
import Header from "../../components/Header";
type TotalType = {
  amount: number;
  un: number;
};

interface ProductsListProps {
  tagUuid: string;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  bottomSheetProps: BottomSheetProps;
  handleCloseBottomSheet: () => void;
}

export default function ProductsList({ tagUuid,
  bottomSheetProps,
  setBottomSheetProps,
  handleCloseBottomSheet, }: Readonly<ProductsListProps>) {
  const colorScheme = useColorScheme();
  const {
    list,
    listProduct,
    amount,
  } = useShoppingListContext();
  const selectedItem = list.find((i) => i.uuid === tagUuid);
  const [tags, setTags] = useState(selectedItem?.tags ? ["Todos", ...selectedItem?.tags] : []);
  const [listArr, setListArr] = useState(selectedItem);

  const [listArrItems, setListArrItems] = useState(getListProductController.handle(selectedItem?.items ? selectedItem?.items : []));

  const totalQuantity = getTotalQuantityAmountByListUuidController.handle(tagUuid);


  const [filter, setFilter] = useState("Todos");
  const [total, setTotal] = useState<TotalType>({
    amount: 0,
    un: 0,
  });
  const router = useRouter();
  useEffect(() => {
    const productsList = getListProductController.handle(selectedItem?.items ? selectedItem?.items : []);
    setTags(selectedItem?.tags ? ["Todos", ...selectedItem?.tags] : []);
    if (filter === "Todos") {
      setListArrItems(productsList);

      const newTotal: TotalType = {
        un: getTotalQuantityAmountByListUuidController.handle(tagUuid),
        amount: getTotalQuantityWithoutAmountByListUuidController.handle(tagUuid),
      };
      setTotal(newTotal);
      return;
    }

    const filteredProductsList = productsList.filter(product => getTagUuidByTagNameController.handle(filter) === product.tag)
    const newTotal: TotalType = {
      un: getTotalQuantityAmountByListUuidController.handle(tagUuid, filteredProductsList),
      amount: getTotalQuantityWithoutAmountByListUuidController.handle(tagUuid, filteredProductsList),
    };

    setTotal(newTotal);
    setListArrItems(filteredProductsList);

    return () => { };
  }, [filter, amount, listProduct, list]);

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
    // const item = updatedListItem[tagUuid];
    // if (item) {
    //   const newArray = item.items.filter((i) => i !== itemUuid);
    //   item.items = newArray;
    //   item.tags = getTagsFromListItemInterface(updatedList);
    //   setList(updatedListItem);
    // }
  };
  return (

    <Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
      noPadding
    >

      {/* <Styled.ContainerHeader>
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
      </Styled.ContainerHeader> */}
      {/* {listArr && listArr.tags.length > 0 ? (
        <Styled.ContainerHeaderInnerFilterButtons>
          <FilterButtons
            tags={tags}
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
              tagUuid={tagUuid}
              handleCloseBottomSheet={handleCloseBottomSheet}
            />
          ) : ( */}

      {/* )} */}
      {/* </Styled.ContainerListInner>
      </Styled.ContainerBody> */}

      <>
        <Header
          background={Colors[colorScheme ?? "light"].headerBackgroundColor}
          left={<TouchableOpacity onPress={() => router.back()}>
            <FontAwesome
              name="angle-left"
              size={35}
              color={Colors[colorScheme ?? "light"].white}
            />
          </TouchableOpacity>}

          title={<Title color={Colors[colorScheme ?? "light"].white}>
            {/* {listArr?.name} */}
            Header
          </Title>} />


        <ContainerInner
          justify="center"
          background={Colors[colorScheme ?? "light"].bodyBackgroundColor}>
          {tags && tags.length > 0 ? (
            <ListGrid
              setBottomSheetProps={setBottomSheetProps}
              deleteItem={deleteItem}
              listArrItems={listArrItems}
              tagUuid={tagUuid}
              handleCloseBottomSheet={handleCloseBottomSheet}
            />
          ) :
            <EmptyList mensage="Você não tem nenhum produto cadastrado nesta Categoria" />
          }
        </ContainerInner>
      </>
    </Container >

  );
}

