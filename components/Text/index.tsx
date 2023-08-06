import React from "react";
import * as Styled from "./styles";
import Colors from "../../constants/Colors";
import { useColorScheme } from "react-native";
interface TextProps {
  children: React.ReactNode;
  dark?: boolean;
}

const Title: React.FC<TextProps> = ({ children, dark }) => {
  const colorScheme = useColorScheme();
  return (
    <Styled.Title
      color={
        dark
          ? Colors[colorScheme ?? "light"].titleDark
          : Colors[colorScheme ?? "light"].title
      }
    >
      {children}
    </Styled.Title>
  );
};
const SubTitle: React.FC<TextProps> = ({ children, dark }) => {
  const colorScheme = useColorScheme();
  return (
    <Styled.SubTitle
      color={
        dark
          ? Colors[colorScheme ?? "light"].subTitleDark
          : Colors[colorScheme ?? "light"].subTitle
      }
    >
      {children}
    </Styled.SubTitle>
  );
};
const Text: React.FC<TextProps> = ({ children, dark }) => {
  const colorScheme = useColorScheme();
  return (
    <Styled.Text
      color={
        dark
          ? Colors[colorScheme ?? "light"].textDark
          : Colors[colorScheme ?? "light"].text
      }
    >
      {children}
    </Styled.Text>
  );
};

export { Title, SubTitle, Text };
