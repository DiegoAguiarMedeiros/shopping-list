import React, { useEffect, useRef } from "react";
import { TextInput, TextInputProps, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import * as Styled from "./styles";

interface InputProps extends TextInputProps {
  placeholder: string;
  radius?: boolean;
}

const InputText: React.FC<InputProps> = ({ placeholder, radius, ...rest }) => {
  const colorScheme = useColorScheme();
  const inputRef = useRef<TextInput>(null);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef])


  return (
    <Styled.Input
      ref={inputRef}
      radius={!radius}
      background={Colors[colorScheme ?? "light"].backgroundPrimary}
      color={Colors[colorScheme ?? "light"].textSecondary}
      placeholder={placeholder}
      placeholderTextColor={
        Colors[colorScheme ?? "light"].textSecondary
      }
      {...rest}
    />
  );
};

export default InputText;
