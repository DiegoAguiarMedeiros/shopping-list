import ListGrid from "./listGrid";
import { IList } from "../../../Model/IList";
import { colorTheme } from "../../../../constants/Colors";
interface ItemProps {
  items: string[];
  color: colorTheme;setListArchived: React.Dispatch<React.SetStateAction<string[]>>
}

export default function List({ items, color,setListArchived }: Readonly<ItemProps>) {
  return <ListGrid color={color} items={items}setListArchived={setListArchived} />;
}
