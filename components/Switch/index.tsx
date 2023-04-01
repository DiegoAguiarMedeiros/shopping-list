import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Switch as RNSwitch, useColorScheme } from 'react-native';
import * as Styled from './styles';
import Colors from '../../constants/Colors';
interface labelOnOff {
    on: string;
    off: string;
}

interface SwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    label: labelOnOff;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange, label }) => {
    const colorScheme = useColorScheme();
    return (
        <Styled.Container>
            <Styled.Label color={Colors[colorScheme ?? 'light'].inputTextColor}>{label[value ? 'on' : 'off']}</Styled.Label>
            <RNSwitch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: Colors[colorScheme ?? 'light'].secondary, true: Colors[colorScheme ?? 'light'].primary }}
                thumbColor={value ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].secondary}
            />
        </Styled.Container>
    );
};

export default Switch;