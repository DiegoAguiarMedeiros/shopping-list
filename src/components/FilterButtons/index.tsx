import { FlatList, StyleSheet, View } from "react-native";
import Button from "../Button";
import { useStores } from "../../context/StoreContext";
import I18n from "i18n-js";
interface FilterButtonsProps {
  tags: string[];
  filter: string,
}

const FilterButtons = ({
  tags,
  filter
}: FilterButtonsProps) => {
  const { TagRepository, ProductRepository, ConfigRepository } = useStores();
  const renderButton = ({ item }: { item: string }) => {
    const tag =
      item === I18n.t("all")
        ? { name: item }
        : TagRepository.getItem(item);

    if (!tag?.name) {
      return null;
    }

    const handlePress = () => {
      ProductRepository.setTagFilter(tag.name);
    };

    return (
      <View style={styles.buttonContainer}>
        <Button
          onPress={handlePress}
          radius
          border={
            filter === tag.name
              ? ConfigRepository.color.filterButtonActiveBorder
              : ConfigRepository.color.filterButtonBorder
          }
          background={
            filter === tag.name
              ? ConfigRepository.color.filterButtonActiveBackground
              : ConfigRepository.color.filterButtonBackground
          }
          textColor={
            filter === tag.name
              ? ConfigRepository.color.filterButtonActiveText
              : ConfigRepository.color.filterButtonText
          }
          underlayColor={
            ConfigRepository.color.filterButtonActiveBackground
          }
          text={tag.name}
          style={{ height: 35 }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%", height: 40 }}
        horizontal
        data={[I18n.t("all"), ...tags]}
        keyExtractor={(item) => item}
        renderItem={renderButton}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 5,
    marginLeft: 5,
  }
});

export default FilterButtons;
