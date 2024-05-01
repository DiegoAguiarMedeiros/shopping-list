import ListPriceItem from "./listPriceItem";
import IAmount from "../../../Model/IAmount";
import { SafeAreaView, ScrollView } from "react-native";
import { colorTheme } from "../../../../constants/Colors";

interface ListProps {
  item: IAmount[];
  color: colorTheme;
  setListArrItems: React.Dispatch<React.SetStateAction<IAmount[]>>;
  filterUpdate: () => void;
}

export default function ListPriceGrid({
  item,
  color,
  setListArrItems,
  filterUpdate,
}: Readonly<ListProps>) {
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
        {item.map((itemAmount: IAmount) => {
          return itemAmount ? (
            <ListPriceItem
              filterUpdate={filterUpdate}
              setListArrItems={setListArrItems}
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
