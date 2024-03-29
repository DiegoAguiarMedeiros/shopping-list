import { useColorScheme, SafeAreaView, ScrollView } from "react-native";
import * as Styled from "./styles";
import { ListInterface, ListType } from "../../../../types/types";
import { BottomSheetProps } from "../../../../components/BottomSheet";

import ListGridItem from "./listGridItem";
import ITag from "../../../../Domain/Model/ITag";
interface ItemProps {
  items: ITag[];
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
      <ScrollView keyboardShouldPersistTaps="handled">
        {items.map((item: ITag) => (
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
