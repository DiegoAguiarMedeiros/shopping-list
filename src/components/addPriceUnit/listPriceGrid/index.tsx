import ListPriceItem from "./listPriceItem";
import IAmount from "../../../Model/IAmount";
import { View } from "react-native";

interface ListProps {
  item: IAmount[];
  listProductUuid: string;
}

export default function ListPriceGrid({
  item,
  listProductUuid,
}: Readonly<ListProps>) {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      {item.map((itemAmount: IAmount) =>
        itemAmount ? (
          <ListPriceItem
            listProductUuid={listProductUuid}
            itemAmount={itemAmount}
            key={itemAmount.uuid}
          />
        ) : null
      )}
    </View>
  );
}
