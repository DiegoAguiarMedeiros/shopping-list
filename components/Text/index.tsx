import React from 'react';
import * as Styled from './styles';
import Colors from '../../constants/Colors';
import { useColorScheme } from 'react-native';
interface TextProps {
    children: React.ReactNode;
}

const Title: React.FC<TextProps> = ({ children }) => {
    const colorScheme = useColorScheme();
    return (
        <Styled.Title color={Colors[colorScheme ?? 'light'].inputTextColor}>{children}</Styled.Title>
    );
};
const SubTitle: React.FC<TextProps> = ({ children }) => {
    const colorScheme = useColorScheme();
    return (
        <Styled.SubTitle color={Colors[colorScheme ?? 'light'].inputTextColor}>{children}</Styled.SubTitle>
    );
};
const Text: React.FC<TextProps> = ({ children }) => {
    const colorScheme = useColorScheme();
    return (
        <Styled.Text color={Colors[colorScheme ?? 'light'].inputTextColor}>{children}</Styled.Text>
    );
};

export { Title, SubTitle, Text };