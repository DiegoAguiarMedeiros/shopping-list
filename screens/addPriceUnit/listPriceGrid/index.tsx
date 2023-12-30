import ListPriceItem from "./listPriceItem";
import IAmount from "../../../Domain/Model/IAmount";
import Container from "../../../components/Container";
import { GridItemWrapperCol, GridItemWrapperRow } from "../../../components/GridItemInner";
import { SafeAreaView, ScrollView } from "react-native";

interface ListProps {
  item: IAmount[];
}

export default function ListPriceGrid({ item }: Readonly<ListProps>) {

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView nestedScrollEnabled>
        {item.map((itemAmount: IAmount) => {
          return itemAmount ? (
            <ListPriceItem
              itemAmount={itemAmount}
              listItemId={itemAmount.listProductUuid}
              key={itemAmount.uuid}
            />
          ) : <></>;
        })}

      </ScrollView>
    </SafeAreaView>
  );
}
