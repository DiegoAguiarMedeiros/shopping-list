import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListGridItem from "./listGridItem";
import { useStores } from "../../../../context/StoreContext";

interface ItemProps {
  items: string[];
}
export default function ListGrid({
  items,
}: Readonly<ItemProps>) {
  const { ListRepository } = useStores();

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.containerListItemListItem}>
          {items.map((i: string) => {
            const item = ListRepository.getListByUuid(i);
            if (!item) return null;
            return (
              <ListGridItem
                key={"ListGridItem-" + item.uuid}
                list={item}
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
    height: ' 50%',
  },
});