import React from 'react';
import { TextInputProps, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import ITag from '../../Domain/Model/ITag';
import { IProduct } from '../../Domain/Model/IProduct';
import { useShoppingListContext } from "../../context/ShoppingList";

type SelectProps = {
  items: ITag[] | IProduct[];
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
};

const Select = ({ items, selectedValue, onValueChange }: SelectProps) => {
  const colorScheme = useColorScheme();

  const { getTheme } = useShoppingListContext();
  return (
    <Styled.Container>
      <Styled.Select
        background={Colors[getTheme()].backgroundPrimary}
        color={Colors[getTheme()].textSecondary}
        selectedValue={selectedValue}
        onValueChange={(itemValue, index) =>
          onValueChange(itemValue as string, index)
        }
        dropdownIconColor={Colors[getTheme()].primary}
      >
        {items.map((item, index) => (
          <Picker.Item
            style={{
              backgroundColor: Colors[getTheme()].backgroundPrimary,
              color: Colors[getTheme()].text,
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