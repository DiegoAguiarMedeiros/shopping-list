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
      background={Colors[colorScheme ?? "light"].inputBackground}
      color={Colors[colorScheme ?? "light"].inputTextColor}
      placeholder={placeholder}
      placeholderTextColor={Colors[colorScheme ?? "light"].inputTextColor}
      {...rest}
    />
  );
};

export default InputText;
