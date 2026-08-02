import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";

import Container from "../../components/Container";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { useState } from "react";
import { useStores } from "../../context/StoreContext";

interface HistoryProps {
  color: colorTheme;
}

export default function History({ color }: Readonly<HistoryProps>) {
  const { ListRepository } = useStores();
  const listArchived = ListRepository.getAllItemsMap("listArchived");
  return (
    <Container background={color.backgroundPrimary}>
      {listArchived && listArchived.length > 0 ? (
        <ListComponent
          items={listArchived}
        />
      ) : (
        <EmptyList mensage={I18n.t("noArchivedLists")} />
      )}
    </Container>
  );
}
