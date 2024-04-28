import React from "react";
import { TextInputProps, useColorScheme } from "react-native";

import * as Styled from "./styles";
import { colorTheme } from "../../../../../../../constants/Colors";

interface InputProps extends TextInputProps {
  placeholder: string;
  radius: boolean;
  color: colorTheme;
}

const InputText: React.FC<InputProps> = ({
  placeholder,
  radius,
  color,
  ...rest
}) => {
  const colorScheme = useColorScheme();

  return (
    <Styled.Input
      radius={radius}
      background={color.backgroundPrimary}
      color={color.text}
      placeholder={placeholder}
      placeholderTextColor={color.textSecondary}
      {...rest}
    />
  );
};

export default InputText;
