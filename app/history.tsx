import { BottomSheetProps } from "../src/components/BottomSheet";
import { colorTheme } from "../constants/Colors";
import { useState, useImperativeHandle, useEffect } from "react";
import React from "react";
import { IList } from "../src/Model/IList";
import { HistoryView } from "../src/views/History/HistoryView";
import { useListViewModel } from "../src/viewmodels/List/ListViewModel";
import UUIDGenerator from "react-native-uuid";
import EmptyList from "../src/components/EmptyList";
import I18n from "i18n-js";
import { observer } from "mobx-react-lite";
import { useStores } from "../src/context/StoreContext";

const HistoryContainer = () => {
    const { ListRepository } = useStores();
    return ListRepository.listsArchived && ListRepository.listsArchived.length > 0 ? (
      <HistoryView
        lists={ListRepository.listsArchived} />
    ) : (
      <EmptyList mensage={I18n.t("noArchivedLists")} />
    );
  };


export default HistoryContainer;
