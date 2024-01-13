import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../../../constants/Colors";
import * as Styled from "./styles";
import {
  BottomSheetProps,
  ListInterface,
  ListType,
} from "../../../../types/types";

import ListGridItem from "./listGridItem";
import { IList } from "../../../../Domain/Model/IList";
interface ItemProps {
  items: IList[];
}
export default function ListGrid({ items }: ItemProps) {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Styled.ContainerListItemListItem>
          {items.map((item: IList) => (
            <ListGridItem
              key={"ListGridItem-" + item.uuid}
              item={item}
            />
          ))}
        </Styled.ContainerListItemListItem>
      </ScrollView>
    </SafeAreaView>
  );
}
