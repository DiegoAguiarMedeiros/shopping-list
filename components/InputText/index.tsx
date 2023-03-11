import React from 'react';
import { TextInputProps, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import * as Styled from './styles';

interface InputProps extends TextInputProps {
    placeholder: string;
}

const InputText: React.FC<InputProps> = ({ placeholder, ...rest }) => {
    const colorScheme = useColorScheme();
    return <Styled.Input placeholder={placeholder} {...rest} />;
};

export default InputText;