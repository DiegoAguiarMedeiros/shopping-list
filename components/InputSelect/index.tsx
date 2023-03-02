import React from 'react';
import { TextInputProps, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../constants/Colors';
import * as Styled from './styles';

type SelectProps = {
    items: { label: string, value: string }[],
    selectedValue: string,
    onValueChange: (itemValue: unknown, itemIndex: number) => void,
};

const Select = ({ items, selectedValue, onValueChange }: SelectProps) => {
    return (
        <Styled.select
            selectedValue={selectedValue}
            onValueChange={onValueChange}
        >
            {items.map((item, index) => (
                <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
        </Styled.select>
    );
};
export default Select;