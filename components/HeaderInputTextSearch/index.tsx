import React from "react";
import { TextInputProps, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import * as Styled from "./styles";

interface InputProps extends TextInputProps {
  placeholder: string;
}

const HeaderInputTextSearch: React.FC<InputProps> = ({ placeholder, ...rest }) => {
  const colorScheme = useColorScheme();
  return (
    <Styled.Input
      background={Colors[colorScheme ?? "light"].primary}
      color={Colors[colorScheme ?? "light"].text}
      placeholder={placeholder}
      placeholderTextColor={
        Colors[colorScheme ?? "light"].textSecondary
      }
      {...rest}
    />
  );
};

export default HeaderInputTextSearch;
