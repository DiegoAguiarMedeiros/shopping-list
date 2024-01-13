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
                background={Colors[colorScheme ?? "light"].backgroundPrimary}
                color={Colors[colorScheme ?? "light"].textSecondary}
                selectedValue={selectedValue}
                onValueChange={(itemValue, index) => onValueChange(itemValue as string, index)}
                dropdownIconColor={Colors[colorScheme ?? "light"].primary}
                itemStyle={{ backgroundColor: "#0f0", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
            >
                {items.map((item, index) => (
                    <Picker.Item key={`Picker.Item.${item.uuid}`} label={item.name} value={item.uuid} />
                ))}

            </Styled.Select>
        </Styled.Container >
    );
};
export default Select;