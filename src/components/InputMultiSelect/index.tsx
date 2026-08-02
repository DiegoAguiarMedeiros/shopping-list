import {View} from "react-native";
import {  ITagsProductsMultiSelect } from "../../Model/IProduct";
import {  MaterialIcons } from "@expo/vector-icons";
import SectionedMultiSelect, {
  Styles,
} from "react-native-sectioned-multi-select";

import I18n from "i18n-js";
import { useStores } from "../../context/StoreContext";
type MultiSelectProps = {
  items: ITagsProductsMultiSelect[];
  selectedItems: string[];
  onValueChange: (itemValue: string[]) => void;
  onFocus?: () => void;
};

const MultiSelect = ({
  items,
  selectedItems,
  onValueChange,
  onFocus,
}: MultiSelectProps) => {

  const { ConfigRepository } = useStores();

  const colors = {
    primary: ConfigRepository.color.primary,
    success: ConfigRepository.color.primary,
    cancel: ConfigRepository.color.alert,
    text: ConfigRepository.color.text,
    subText: ConfigRepository.color.textSecondary,
    selectToggleTextColor: ConfigRepository.color.primary,
    searchPlaceholderTextColor: ConfigRepository.color.textSecondary,
    searchSelectionColor: ConfigRepository.color.text,
    chipColor: ConfigRepository.color.primary,
    itemBackground: ConfigRepository.color.itemListBackground,
    subItemBackground: ConfigRepository.color.itemListBackground,
  };

  const styles: Styles = {
    container: {
      marginHorizontal: 14,
      marginVertical: 24,
      borderRadius: 12,
      flex: 1,
      height: "100%",
      backgroundColor: ConfigRepository.color.backgroundPrimary,
    },
    modalWrapper: {
      flex: 1,
      height: "100%",
      width: "100%",
      padding: 0,
      margin: 0,
    },
    selectToggle: {
      backgroundColor: ConfigRepository.color.itemListBackground,
      height: 45,
      alignContent: "center",
      padding: 10,
      borderRadius: 10,
    },
    selectToggleText: {
      color: ConfigRepository.color.text,
    },
    item: {
      backgroundColor: ConfigRepository.color.backgroundPrimary,
    },
    subItem: {
      backgroundColor: ConfigRepository.color.backgroundPrimary,
    },
    itemText: {
      color: ConfigRepository.color.text,
    },
    selectedItemText: {
      color: ConfigRepository.color.textSecondary,
    },
    selectedSubItemText: {
      color: ConfigRepository.color.filterButtonActiveText,
    },
    subItemText: {
      color: ConfigRepository.color.textSecondary,
    },
    chipsWrapper: {},
    chipContainer: {
      backgroundColor: ConfigRepository.color.itemListBackground,
      borderRadius: 10,
    },
    chipText: {
      color: ConfigRepository.color.text,
    },
    chipIcon: {},
    scrollView: {
      backgroundColor: ConfigRepository.color.backgroundPrimary,
    },
    button: {
      backgroundColor: ConfigRepository.color.primary,
    },
    cancelButton: {
      backgroundColor: ConfigRepository.color.alert,
    },
    confirmText: {
      color: ConfigRepository.color.filterButtonActiveText,
    },
    toggleIcon: {
      backgroundColor: ConfigRepository.color.backgroundPrimary,
    },
    selectedItem: {
      backgroundColor: ConfigRepository.color.backgroundPrimary,
      padding: 5,
    },
    selectedSubItem: {
      backgroundColor: ConfigRepository.color.primary,
      padding: 5,
    },
    listContainer: {
      backgroundColor: ConfigRepository.color.backgroundPrimary,
    },
  };

  const itemFontFamily = {
    fontFamily: "InterBlack",
    fontSize: 18,
  };
  const subItemFontFamily = {
    fontFamily: "Inter",
    fontSize: 16,
  };

  return (
    <View style={{
      flex: 1,
      borderRadius: 10
    }}>
      <SectionedMultiSelect
        colors={colors}
        items={items}
        IconRenderer={MaterialIcons as any}
        uniqueKey="id"
        subKey="children"
        selectText={I18n.t("selectProduct")}
        selectedText={I18n.t("selectedProduct")}
        readOnlyHeadings={true}
        onSelectedItemsChange={onValueChange}
        selectedItems={selectedItems}
        showCancelButton
        animateDropDowns
        expandDropDowns
        hideSearch
        styles={styles}
        itemFontFamily={itemFontFamily}
        subItemFontFamily={subItemFontFamily}
        customChipsRenderer={() => { }}
      />
    </View>
  );
};

export default MultiSelect;
