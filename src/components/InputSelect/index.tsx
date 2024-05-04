import React from 'react';
import { TextInputProps, useColorScheme } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import * as Styled from "./styles";
import ITag from "../../Model/ITag";
import { IProduct } from "../../Model/IProduct";
import { useShoppingListContext } from "../../context/ShoppingList";
import { colorTheme } from "../../../constants/Colors";

type SelectProps = {
  items: ITag[] | IProduct[];
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  color: colorTheme;
};

const Select = ({
  items,
  selectedValue,
  onValueChange,
  color,
}: SelectProps) => {
  return (
    <Styled.Container>
      <Styled.Select
        background={color.itemListBackgroundUnderlay}
        color={color.textSecondary}
        selectedValue={selectedValue}
        onValueChange={(itemValue, index) =>
          onValueChange(itemValue as string, index)
        }
        dropdownIconColor={color.primary}
      >
        {items.map((item, index) => (
          <Picker.Item
            style={{
              backgroundColor: color.itemListBackgroundUnderlay,
              color: color.text,
            }}
            key={`Picker.Item.${item.uuid}.index`}
            label={item.name}
            value={item.uuid}
          />
        ))}
      </Styled.Select>
    </Styled.Container>
  );
};
export default Select;