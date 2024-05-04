import { useShoppingListContext } from "../../context/ShoppingList";
import EmptyList from "../../components/EmptyList";
import ListComponent from "./list";

import Container from "../../components/Container";
import I18n from "i18n-js";
import { colorTheme } from "../../../constants/Colors";
import { useState } from "react";

interface HistoryProps {
  color: colorTheme;
}

export default function History({ color }: Readonly<HistoryProps>) {
  const { getListArchived } = useShoppingListContext();
  const [listArchived, setListArchived] = useState<string[]>(getListArchived());
  console.log("listArchived", listArchived);
  return (
    <Container background={color.backgroundPrimary}>
      {listArchived && listArchived.length > 0 ? (
        <ListComponent
          setListArchived={setListArchived}
          color={color}
          items={listArchived}
        />
      ) : (
        <EmptyList color={color} mensage={I18n.t("noArchivedLists")} />
      )}
    </Container>
  );
}
