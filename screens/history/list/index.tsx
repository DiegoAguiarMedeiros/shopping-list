import { useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import * as Styled from "./styles";
import { ListInterface } from "../../../types/types";
import ListGrid from "./listGrid";
import { IList } from "../../../Domain/Model/IList";
interface ItemProps {
  items: IList[];
}

export default function List({ items }: ItemProps) {
  const colorScheme = useColorScheme();

  return (
    <ListGrid items={items} />
  );
}
