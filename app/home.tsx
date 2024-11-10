import Home from "../src/screens/home/Home";
import { BottomSheetProps } from "../src/components/BottomSheet";
import { colorTheme } from "../constants/Colors";
import { useState, useImperativeHandle, useEffect } from "react";
import React from "react";
import { IList } from "../src/Model/IList";
import { ListView } from "../src/views/List/ListView";
import { useListViewModel } from "../src/viewmodels/List/ListViewModel";
import UUIDGenerator from "react-native-uuid";
import EmptyList from "../src/components/EmptyList";
import I18n from "i18n-js";
import { observer } from "mobx-react-lite";
import { useStores } from "../src/context/StoreContext";
interface HomeContainerProps {
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}

const HomeContainer = ({
  setBottomSheetProps,
  handleCloseBottomSheet,
}: Readonly<HomeContainerProps>) => {
  const { ListRepository } = useStores();
  console.log("ListRepository", ListRepository.lists)
  return ListRepository.lists && ListRepository.lists.length > 0 ? (
    <ListView
      lists={ListRepository.lists}
      setBottomSheetProps={setBottomSheetProps}
      handleCloseBottomSheet={handleCloseBottomSheet}
    />
  ) : (
    <EmptyList mensage={I18n.t("noListCreated")} />
  );
};


export default HomeContainer;
