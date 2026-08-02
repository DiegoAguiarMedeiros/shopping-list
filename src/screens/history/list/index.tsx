import ListGrid from "./listGrid";
import { IList } from "../../../Model/IList";
import { colorTheme } from "../../../../constants/Colors";
interface ItemProps {
  items: string[];
}

export default function List({ items }: Readonly<ItemProps>) {
  return <ListGrid items={items} />;
}
