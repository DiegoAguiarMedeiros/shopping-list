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
  onFocus?: () => void;
  background: string;
  dropdownIconColor: string;
  textColor: string;
};

const Select = ({
  items,
  selectedValue,
  onValueChange,
  onFocus,
  background,
  dropdownIconColor,
  textColor,
}: SelectProps) => {
  return (
    <Styled.Container>
      <Styled.Select
        onFocus={() => onFocus && onFocus()}
        background={background}
        color={textColor}
        selectedValue={selectedValue}
        onValueChange={(itemValue, index) =>
          onValueChange(itemValue as string, index)
        }
        dropdownIconColor={dropdownIconColor}
      >
        {items.map((item, index) => (
          <Picker.Item
            style={{
              backgroundColor: background,
              color: textColor,
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