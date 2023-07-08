import React from 'react';
import { TouchableOpacityProps, useColorScheme } from 'react-native';
import Colors from '../../../../../../constants/Colors';
import * as Styled from './styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface ButtonProps extends TouchableOpacityProps {
    background: string;
    invertSide?: boolean;
    icon?: "minus" | "plus";
}

const Button: React.FC<ButtonProps> = ({  invertSide,icon, background, children, onPress, ...rest }) => {
    const colorScheme = useColorScheme();
    return (
        <Styled.Button onPress={onPress} {...rest}
            border={Colors[colorScheme ?? 'light'].border}
            background={background}
            invertSide={invertSide!}
        >
            {icon !== undefined ? <FontAwesome size={20} style={{ marginBottom: -3 }} name={icon} color={Colors[colorScheme ?? 'light'].textButton} /> : null}
        </Styled.Button>
    );
};

export default Button;