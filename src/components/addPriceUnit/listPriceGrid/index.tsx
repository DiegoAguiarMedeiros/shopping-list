import ListPriceItem from "./listPriceItem";
import IAmount from "../../../Model/IAmount";
import { SafeAreaView, ScrollView } from "react-native";
import { colorTheme } from "../../../../constants/Colors";

interface ListProps {
  item: IAmount[];
  listProductUuid: string;
}

export default function ListPriceGrid({
  item,
  listProductUuid,
}: Readonly<ListProps>) {
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
        {item.map((itemAmount: IAmount) => {
          return itemAmount ? (
            <ListPriceItem
              listProductUuid={listProductUuid}
              itemAmount={itemAmount}
              key={itemAmount.uuid}
            />
          ) : (
            <></>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
