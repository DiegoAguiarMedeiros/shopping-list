import React from 'react';
import { TextInputProps, useColorScheme } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import * as Styled from "./styles";
import ITag from "../../Domain/Model/ITag";
import { IProduct } from "../../Domain/Model/IProduct";
import { useShoppingListContext } from "../../context/ShoppingList";

type SelectProps = {
  items: ITag[] | IProduct[];
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
};

const Select = ({ items, selectedValue, onValueChange }: SelectProps) => {
  const colorScheme = useColorScheme();

  const { getTheme, getColor } = useShoppingListContext();
  return (
    <Styled.Container>
      <Styled.Select
        background={getColor().backgroundPrimary}
        color={getColor().textSecondary}
        selectedValue={selectedValue}
        onValueChange={(itemValue, index) =>
          onValueChange(itemValue as string, index)
        }
        dropdownIconColor={getColor().primary}
      >
        {items.map((item, index) => (
          <Picker.Item
            style={{
              backgroundColor: getColor().backgroundPrimary,
              color: getColor().text,
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