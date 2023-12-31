import React from "react";
import { TextInputProps, useColorScheme } from "react-native";

import Colors from "../../../../../../constants/Colors";
import * as Styled from "./styles";

interface InputProps extends TextInputProps {
  placeholder: string;
  radius: boolean;
}

const InputText: React.FC<InputProps> = ({ placeholder, radius, ...rest }) => {
  const colorScheme = useColorScheme();
  return (
    <Styled.Input
      radius={radius}
      background={Colors[colorScheme ?? "light"].grayScalePrimary}
      color={Colors[colorScheme ?? "light"].text}
      placeholder={placeholder}
      placeholderTextColor={Colors[colorScheme ?? "light"].textSecondary}
      {...rest}
    />
  );
};

export default InputText;
