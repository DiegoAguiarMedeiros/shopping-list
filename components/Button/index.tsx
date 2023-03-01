import React from 'react';
import { TouchableOpacityProps, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import * as Styled from './styles';
interface ButtonProps extends TouchableOpacityProps {
    text: string;
    background: string;
}

const Button: React.FC<ButtonProps> = ({ text,background, onPress, ...rest }) => {
    const colorScheme = useColorScheme();
    return (
        <Styled.Button onPress={onPress} {...rest}
            border={Colors[colorScheme ?? 'light'].border} 
            background={background}
        >
            <Styled.Text text={Colors[colorScheme ?? 'light'].textButton}>{text}</Styled.Text>
        </Styled.Button>
    );
};

export default Button;