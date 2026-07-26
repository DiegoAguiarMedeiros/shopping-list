import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Styled from "./styles";

import ListGridItem from "./listGridItem";
import { IList } from "../../../../Model/IList";
import { colorTheme } from "../../../../../constants/Colors";
import { useStores } from "../../../../context/StoreContext";

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
  const { ListRepository } = useStores();

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Styled.ContainerListItemListItem>
          {items.map((i: string) => {
            const item = ListRepository.getListByUuid(i);
            if (!item) return null;
            return (
              <ListGridItem
                key={"ListGridItem-" + item.uuid}
                list={item}
              />
            );
          })}
        </Styled.ContainerListItemListItem>
      </ScrollView>
    </SafeAreaView>
  );
}
