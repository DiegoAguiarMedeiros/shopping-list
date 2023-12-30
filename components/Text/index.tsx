import React from "react";
import * as Styled from "./styles";
import Colors from "../../constants/Colors";
import { useColorScheme } from "react-native";
interface TextProps {
  children: React.ReactNode;
  color: string;
  align?: "center" | "end" | "justify" | "left" | "right" | "start";
}

const Title: React.FC<TextProps> = ({ children, color }) => {
  const colorScheme = useColorScheme();
  return (
    <Styled.Title
      color={color}
    >
      {children}
    </Styled.Title>
  );
};
const SubTitle: React.FC<TextProps> = ({ children, color, align }) => {
  const colorScheme = useColorScheme();
  return (
    <Styled.SubTitle
      color={color}
      align={align ?? "left"}
    >
      {children}
    </Styled.SubTitle>
  );
};
const Text: React.FC<TextProps> = ({ children, color, align }) => {
  const colorScheme = useColorScheme();
  return (
    <Styled.Text
      color={color}
      align={align ?? "left"}
    >
      {children}
    </Styled.Text>
  );
};

export { Title, SubTitle, Text };
