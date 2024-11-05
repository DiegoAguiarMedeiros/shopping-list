import React, { useState } from "react";
import { TextInputProps, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Styled from "./styles";
import ITag from "../../Model/ITag";
import { IProduct, ITagsProductsMultiSelect } from "../../Model/IProduct";
import { colorTheme } from "../../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import SectionedMultiSelect, {
  Styles,
} from "react-native-sectioned-multi-select";

import Icon from "react-native-vector-icons/MaterialIcons";
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
    disabled: "#0f0",
  };

  const styles: Styles = {
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
    <Styled.Container>
      <SectionedMultiSelect
        colors={colors}
        items={items}
        //@ts-ignore
        IconRenderer={Icon}
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
    </Styled.Container>
  );
};

export default MultiSelect;