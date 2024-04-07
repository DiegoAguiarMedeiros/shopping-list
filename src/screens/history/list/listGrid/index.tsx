import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";
import {
  BottomSheetProps,
  ListInterface,
  ListType,
} from "../../../../types/types";

import ListGridItem from "./listGridItem";
import { IList } from "../../../../Domain/Model/IList";
import { colorTheme } from "../../../../constants/Colors";
interface ItemProps {
  items: IList[];
  color: colorTheme;
}
export default function ListGrid({ items, color }: ItemProps) {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Styled.ContainerListItemListItem>
          {items.map((item: IList) => (
            <ListGridItem
              color={color}
              key={"ListGridItem-" + item.uuid}
              item={item}
            />
          ))}
        </Styled.ContainerListItemListItem>
      </ScrollView>
    </SafeAreaView>
  );
}
