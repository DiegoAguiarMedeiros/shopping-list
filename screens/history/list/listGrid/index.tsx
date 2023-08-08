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
}
export default function ListGrid({ items }: ItemProps) {
  const colorScheme = useColorScheme();

  return (
    <Styled.Container background={Colors[colorScheme ?? "light"].bodyBackgroundColor}>
      <Styled.ContainerList>
        <Styled.ContainerListInner>
          <Styled.ContainerListItemList>
            <SafeAreaView>
              <ScrollView>
                <Styled.ContainerListItemListItem>
                  {items.map((item: ListInterface) => (
                    <ListGridItem
                      key={"ListGridItem-" + item.uuid}
                      item={item}
                    />
                  ))}
                </Styled.ContainerListItemListItem>
              </ScrollView>
            </SafeAreaView>
          </Styled.ContainerListItemList>
        </Styled.ContainerListInner>
      </Styled.ContainerList>
    </Styled.Container>
  );
}
