import { useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import * as Styled from "./styles";
import { ListInterface } from "../../../types/types";
import ListGrid from "./listGrid";
interface ItemProps {
  items: ListInterface[];
}

export default function List({ items }: ItemProps) {
  const colorScheme = useColorScheme();

  return (
    <Styled.Container
      background={Colors[colorScheme ?? "light"].bodyBackgroundColor}
    >
      <Styled.ContainerListList>
        <ListGrid items={items} />
      </Styled.ContainerListList>
      <Styled.ContainerListInner></Styled.ContainerListInner>
    </Styled.Container>
  );
}
