import React from "react";
import * as Styled from "./styles";

import { useColorScheme } from "react-native";
interface TextProps {
  children: React.ReactNode;
  color: string;
  align?: "center" | "end" | "justify" | "left" | "right" | "start";
}

const Title: React.FC<TextProps> = ({ children, color, align }: TextProps) => {

  return (
    <Styled.Title
      align={align ?? "left"}
      color={color}
    >
      {children}
    </Styled.Title>
  );
};
const Title2: React.FC<TextProps> = ({ children, color, align }: TextProps) => {

  return (
    <Styled.Title2
      align={align ?? "left"}
      color={color}
    >
      {children}
    </Styled.Title2>
  );
};
const SubTitle: React.FC<TextProps> = ({ children, color, align }: TextProps) => {

  return (
    <Styled.SubTitle
      color={color}
      align={align ?? "left"}
    >
      {children}
    </Styled.SubTitle>
  );
};
const Text: React.FC<TextProps> = ({ children, color, align }: TextProps) => {

  return (
    <Styled.Text
      color={color}
      align={align ?? "left"}
    >
      {children}
    </Styled.Text>
  );
};

export { Title, Title2, SubTitle, Text };
