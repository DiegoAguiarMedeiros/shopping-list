import {
  useColorScheme,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Styled from "./styles";
import React, { useEffect, useState } from "react";
import { ItemInterface, TagsIterface, TotalType } from "../../../types/types";
import ListGridItem from "./listGridItem";

import Button from "../../../components/Button";

import { BottomSheetProps } from "../../../components/BottomSheet";
import BottomSheet from "../../../components/BottomSheet";
import { removeUndefinedFromArray } from "../../../utils/functions";
import { IProduct } from "../../../Model/IProduct";
import Container from "../../../components/Container";
import ContainerInner from "../../../components/ContainerInner";
import {
  GridItemWrapperCol,
  GridItemWrapperInner,
  GridItemWrapperRow,
} from "../../../components/GridItemInner";
import I18n from "i18n-js";
import { IList } from "../../../Model/IList";
import { colorTheme } from "../../../../constants/Colors";
import Total from "./total";
import Header from "../../../components/Header";
import FilterButtons from "../../../components/FilterButtons";
import { useNavigation } from "expo-router";
import CircleProgress from "../../../components/CircleProgress";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Title } from "../../../components/Text";
import { useStores } from "../../../context/StoreContext";

interface ListProps {
  listId: string;
  list: IList;
  color: colorTheme;
  setList: React.Dispatch<React.SetStateAction<IList>>;
  handleCloseBottomSheetList: () => void;
  setActiveRouteHeader: React.Dispatch<
    React.SetStateAction<{
      name: React.ReactNode;
      left: React.ReactNode | null;
      right: React.ReactNode | null;
    }>
  >;
}

function ListGrid({
  list,
  listId,
  color,
  setList,
  handleCloseBottomSheetList,
  setActiveRouteHeader,
}: Readonly<ListProps>) {
  const { ProductRepository, TagRepository, ListRepository } = useStores();
  const [active, setActive] = useState("");
  const [total, setTotal] = useState<TotalType>({
    total: 0,
    amount: 0,
    un: 0,
  });
  const navigation = useNavigation<any>();
  const [tags, setTags] = useState(list?.tags ? ["Todos", ...list.tags] : []);
  const productsList: IProduct[] = [];
  list.items.forEach((i: string) => {
    const result = ProductRepository.getProductByUuid(i);
    if (result) productsList.push(result);
  });

  const [listArrItems, setListArrItems] = useState(productsList);
  const [filter, setFilter] = useState("Todos");

  const handleOpen = (uuid: string) => {
    setActive(uuid);
  };
  const handleClose = () => {
    setActive("");
  };
  const totalUpdate = (total: number, completedUnits: number, un: number): void => {
    const newTotal: TotalType = {
      total,
      un,
      amount: completedUnits,
    };
    setTotal(newTotal);
    attHeader(completedUnits, un);
  };
  const filterUpdate = (): void => {
    const productsList: IProduct[] = [];
    list.items.forEach((i: string) => {
      const result = ProductRepository.getProductByUuid(i);
      if (result) productsList.push(result);
    });
    setTags(list?.tags ? ["Todos", ...list.tags] : []);
    totalUpdate(
      ListRepository.listActive?.total || 0,
      ListRepository.listActive?.totalWithoutAmount || 0,
      ListRepository.listActive?.totalUn || 0
    );
    if (filter === "Todos") {
      setListArrItems(productsList);
      return;
    }
    const filteredProductsList = productsList.filter(
      (product) => TagRepository.getTagUuidByName(filter) === product.tag
    );
    setListArrItems(filteredProductsList);
  };

  const returnToHome = () => {
    handleCloseBottomSheetList();
    navigation.navigate("home");
  };

  const attHeader = (amount: number, un: number) => {
    setActiveRouteHeader({
      left: (
        <TouchableHighlight
          underlayColor={color.primary}
          style={{ marginLeft: 20, marginRight: 10 }}
          onPress={() => returnToHome()}
        >
          <FontAwesome name="angle-left" size={35} color={color.white} />
        </TouchableHighlight>
      ),
      name: <Title color={color.white}>{list?.name}</Title>,
      right: (
        <Styled.Container>
          <CircleProgress
            activeStrokeColor={color.circularHeaderFilled}
            circleBackgroundColor={color.circularHeaderBackground}
            progress={un && amount ? amount : 0}
            total={un}
            size={24}
          />
        </Styled.Container>
      ),
    });
  };

  useEffect(() => {
    filterUpdate();
    return () => { };
  }, [filter, list]);

  return (
    <Container background={"transparent"}>
      <Header
        background={color.backgroundPrimary}
        bottom={
          list && list.tags.length > 0 ? (
            <FilterButtons
              tags={tags}
              filter={filter}
            />
          ) : null
        }
      />
      <ContainerInner>
        <GridItemWrapperRow height={90}>
          <SafeAreaView style={{ flex: 1, width: "100%" }}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
              nestedScrollEnabled
            >
              {listArrItems.map((item, index) => {
                return (
                  <ListGridItem
                    key={"ListGridItem-" + item.uuid}
                    index={index}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    item={item}
                    listId={listId}
                    active={active == item.uuid}
                  />
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </GridItemWrapperRow>
        <Total color={color} total={total.total} un={total.un} />
      </ContainerInner>
    </Container>
  );
}

export default React.memo(ListGrid);
