import ListPriceItem from "./listPriceItem";
import IAmount from "../../../Model/IAmount";
import { ScrollView } from "react-native";

interface ListProps {
  item: IAmount[];
  listProductUuid: string;
}

export default function ListPriceGrid({
  item,
  listProductUuid,
}: Readonly<ListProps>) {
  return (
    <ScrollView
      style={{ width: "100%" }}
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
    >
      {item.map((itemAmount: IAmount) =>
        itemAmount ? (
          <ListPriceItem
            listProductUuid={listProductUuid}
            itemAmount={itemAmount}
            key={itemAmount.uuid}
          />
        ) : null
      )}
    </ScrollView>
  );
}
