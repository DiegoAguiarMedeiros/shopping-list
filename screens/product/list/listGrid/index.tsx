import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../../../constants/Colors";
import * as Styled from "./styles";
import { ListInterface, ListType } from "../../../../types/types";
import { BottomSheetProps } from "../../../../components/BottomSheet";

import ListGridItem from "./listGridItem";
import { IProduct } from "../../../../Domain/Model/IProduct";
import Container from "../../../../components/Container";
interface ItemProps {
  items: IProduct[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
}
export default function ListGrid({
  items,
  setBottomSheetProps,
  handleCloseBottomSheet,
}: ItemProps) {
  const colorScheme = useColorScheme();

  return (

    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView>
        {items.map((item: IProduct) => (
          <ListGridItem
            handleCloseBottomSheet={handleCloseBottomSheet}
            setBottomSheetProps={setBottomSheetProps}
            key={"ListGridItem-" + item.uuid}
            item={item}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
