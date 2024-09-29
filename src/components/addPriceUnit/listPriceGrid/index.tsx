import ListPriceItem from "./listPriceItem";
import IAmount from "../../../Model/IAmount";
import { SafeAreaView, ScrollView } from "react-native";
import { colorTheme } from "../../../../constants/Colors";

interface ListProps {
  item: IAmount[];
  listProductUuid: string;
  color: colorTheme;
  totalUpdate: (total: number, amount: number, un: number) => void;
}

export default function ListPriceGrid({
  item,
  color,
  totalUpdate,
  listProductUuid,
}: Readonly<ListProps>) {
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
        {item.map((itemAmount: IAmount) => {
          return itemAmount ? (
            <ListPriceItem
              totalUpdate={totalUpdate}
              listProductUuid={listProductUuid}
              color={color}
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
