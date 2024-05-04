import { SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";

import ListGridItem from "./listGridItem";
import { IList } from "../../../../Model/IList";
import { colorTheme } from "../../../../../constants/Colors";
import { useShoppingListContext } from "../../../../context/ShoppingList";
interface ItemProps {
  items: string[];
  color: colorTheme;
  setListArchived: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function ListGrid({
  items,
  color,
  setListArchived,
}: Readonly<ItemProps>) {
  const { getListByUuid } = useShoppingListContext();
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Styled.ContainerListItemListItem>
          {items.map((i: string) => {
            const item = getListByUuid(i);
            return (
              <ListGridItem
                  setListArchived={setListArchived}
                color={color}
                key={"ListGridItem-" + item.uuid}
                item={item}
              />
            );
          })}
        </Styled.ContainerListItemListItem>
      </ScrollView>
    </SafeAreaView>
  );
}
