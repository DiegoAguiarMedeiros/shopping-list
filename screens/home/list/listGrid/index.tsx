import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../../../constants/Colors";
import * as Styled from "./styles";
import {
  BottomSheetProps,
  ListInterface,
  ListType,
} from "../../../../types/types";

import ListGridItem from "./listGridItem";
interface ItemProps {
  items: ListInterface[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
}
export default function ListGrid({ items, setBottomSheetProps }: ItemProps) {
  const colorScheme = useColorScheme();
  console.log("items", items);
  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerList>
        <SafeAreaView>
          <ScrollView>
            <Styled.ContainerListItemListItem>
              {items.map((item: ListInterface) => (
                <ListGridItem
                  setBottomSheetProps={setBottomSheetProps}
                  key={"ListGridItem-" + item.uuid}
                  item={item}
                />
              ))}
            </Styled.ContainerListItemListItem>
          </ScrollView>
        </SafeAreaView>
      </Styled.ContainerList>
    </Styled.Container>
  );
}
