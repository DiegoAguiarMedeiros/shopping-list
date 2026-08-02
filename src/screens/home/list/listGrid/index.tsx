import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetProps } from "../../../../components/BottomSheet";

import ListGridItem from "./listGridItem";
import { colorTheme } from "../../../../../constants/Colors";
import { IProduct } from "../../../../Model/IProduct";
import { IList } from "../../../../Model/IList";
import { useStores } from "../../../../context/StoreContext";

interface ItemProps {
  lists: string[];
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
  handleCloseBottomSheet: () => void;
  color: colorTheme;
  listRef: React.MutableRefObject<{
    handleAddNewList: (name: string) => void;
    handleRemoveItem: (uuid: string) => void;
    handleEditItem: (uuid: string, name: string) => void;
    handleCopyItem: (uuid: string, name: string) => void;
  } | null>;
  listItemRef: React.MutableRefObject<{
    handleAddItem: (list: IList) => void;
  } | null>;
}
export default function ListGrid({
  lists,
  setBottomSheetProps,
  handleCloseBottomSheet,
  color,
  listRef,
  listItemRef,
}: Readonly<ItemProps>) {
  const { ListRepository } = useStores();

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.containerListItemListItem}>
          {lists.map((l: string) => {
            const list = ListRepository.getListByUuid(l);
            if (!list) return null;

            return (
              <ListGridItem
                handleCloseBottomSheet={handleCloseBottomSheet}
                setBottomSheetProps={setBottomSheetProps}
                key={"ListGridItem-" + list.uuid}
                list={list}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerListItemListItem: {
    width: '100%',
    flex: 1,
    height: '50%',
  },
});