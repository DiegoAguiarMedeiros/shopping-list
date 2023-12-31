import React from 'react';
import { TextInputProps, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
import ITag from '../../Domain/Model/ITag';
import { IProduct } from '../../Domain/Model/IProduct';

type SelectProps = {
    items: ITag[] | IProduct[],
    selectedValue: string,
    onValueChange: (itemValue: string, itemIndex: number) => void;
};

const Select = ({ items, selectedValue, onValueChange }: SelectProps) => {
    const colorScheme = useColorScheme();
    return (
        <Styled.Container>
            <Styled.Select
                background={Colors[colorScheme ?? "light"].grayScalePrimary}
                color={Colors[colorScheme ?? "light"].grayScalePrimary}
                selectedValue={selectedValue}
                onValueChange={(itemValue, index) => onValueChange(itemValue as string, index)}
                style={{ borderColor: 'red' }}
            >
                {items.map((item, index) => (
                    <Picker.Item key={index} label={item.name} value={item.uuid} />
                ))}
            </Styled.Select>
        </Styled.Container>
    );
};
export default Select;