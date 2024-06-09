import ListPriceItem from "./listPriceItem";
import IAmount from "../../../Model/IAmount";
import { SafeAreaView, ScrollView } from "react-native";
import { colorTheme } from "../../../../constants/Colors";

interface ListProps {
  item: IAmount[];
  color: colorTheme;
  setListArrAmountItems: React.Dispatch<React.SetStateAction<IAmount[]>>;
  totalUpdate: (total: number, amount: number, un: number) => void;
  filter: string;
}

export default function ListPriceGrid({
  item,
  color,
  setListArrAmountItems,
  totalUpdate,
  filter,
}: Readonly<ListProps>) {
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
        {item.map((itemAmount: IAmount) => {
          return itemAmount ? (
            <ListPriceItem
              filter={filter}
              totalUpdate={totalUpdate}
              setListArrAmountItems={setListArrAmountItems}
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
