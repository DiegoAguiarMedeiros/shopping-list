import React from "react";
import { TextInputProps, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import * as Styled from "./styles";

interface InputProps extends TextInputProps {
  placeholder: string;
}

const InputText: React.FC<InputProps> = ({ placeholder, ...rest }) => {
  const colorScheme = useColorScheme();
  return (
    <Styled.Input
      background={Colors[colorScheme ?? "light"].inputBackgroundColor}
      color={Colors[colorScheme ?? "light"].inputTextColor}
      placeholder={placeholder}
      placeholderTextColor={Colors[colorScheme ?? "light"].inputPlaceholdBackgroundColor}
      {...rest}
    />
  );
};

export default InputText;
