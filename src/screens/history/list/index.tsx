import { useColorScheme } from "react-native";
import * as Styled from "./styles";
import { ListInterface } from "../../../types/types";
import ListGrid from "./listGrid";
import { IList } from "../../../Domain/Model/IList";
import { colorTheme } from "../../../constants/Colors";
interface ItemProps {
  items: IList[];
  color: colorTheme;
}

export default function List({ items, color }: ItemProps) {
  const colorScheme = useColorScheme();

  return <ListGrid color={color} items={items} />;
}
