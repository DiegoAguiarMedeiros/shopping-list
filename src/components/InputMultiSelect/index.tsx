import React, { useState } from "react";
import { TextInputProps, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Styled from "./styles";
import ITag from "../../Model/ITag";
import { IProduct, ITagsProductsMultiSelect } from "../../Model/IProduct";
import { useShoppingListContext } from "../../context/ShoppingList";
import { colorTheme } from "../../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import SectionedMultiSelect, {
  Styles,
} from "react-native-sectioned-multi-select";

import Icon from "react-native-vector-icons/MaterialIcons";
import I18n from "i18n-js";
type MultiSelectProps = {
  items: ITagsProductsMultiSelect[];
  selectedItems: string[];
  onValueChange: (itemValue: string[]) => void;
  onFocus?: () => void;
  color: colorTheme;
};

const MultiSelect = ({
  items,
  selectedItems,
  onValueChange,
  onFocus,
  color,
}: MultiSelectProps) => {
  const colors = {
    primary: color.primary,
    success: color.primary,
    cancel: color.alert,
    text: color.text,
    subText: color.textSecondary,
    selectToggleTextColor: color.primary,
    searchPlaceholderTextColor: color.textSecondary,
    searchSelectionColor: color.text,
    chipColor: color.primary,
    itemBackground: color.itemListBackground,
    subItemBackground: color.itemListBackground,
    disabled: "#0f0",
  };

  const styles: Styles = {
    selectToggle: {
      backgroundColor: color.itemListBackground,
      height: 45,
      alignContent: "center",
      padding: 10,
      borderRadius: 10,
    },
    selectToggleText: {
      color: color.text,
    },
    item: {
      backgroundColor: color.backgroundPrimary,
    },
    subItem: {
      backgroundColor: color.backgroundPrimary,
    },
    itemText: {
      color: color.text,
    },
    selectedItemText: {
      color: color.textSecondary,
    },
    selectedSubItemText: {
      color: color.filterButtonActiveText,
    },
    subItemText: {
      color: color.textSecondary,
    },
    chipsWrapper: {},
    chipContainer: {
      backgroundColor: color.itemListBackground,
      borderRadius: 10,
    },
    chipText: {
      color: color.text,
    },
    chipIcon: {},
    scrollView: {
      backgroundColor: color.backgroundPrimary,
    },
    button: {
      backgroundColor: color.primary,
    },
    cancelButton: {
      backgroundColor: color.alert,
    },
    confirmText: {
      color: color.filterButtonActiveText,
    },
    toggleIcon: {
      backgroundColor: color.backgroundPrimary,
    },
    selectedItem: {
      backgroundColor: color.backgroundPrimary,
      padding: 5,
    },
    selectedSubItem: {
      backgroundColor: color.primary,
      padding: 5,
    },
    listContainer: {
      backgroundColor: color.backgroundPrimary,
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
        customChipsRenderer={() => {}}
      />
    </Styled.Container>
  );
};

export default MultiSelect;
