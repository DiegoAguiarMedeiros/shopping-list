import React from "react";
import { TextInputProps, useColorScheme } from "react-native";

import * as Styled from "./styles";

interface InputProps extends TextInputProps {
  placeholder: string;
  radius?: boolean;
  background: string;
  color: string;
  placeholderTextColor: string;
}

const InputText: React.FC<InputProps> = ({ placeholder, radius, ...rest }) => {
  const Input = Styled.Input as unknown as React.ComponentType<any>;

  return (
    <Input
      radius={!radius}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default InputText;
