import React, { useEffect, useRef, useState } from "react";
import { TextInput, TextInputProps, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import * as Styled from "./styles";

interface InputProps extends TextInputProps {
  placeholder: string;
}

const HeaderInputTextSearch: React.FC<InputProps> = ({ placeholder, ...rest }) => {
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
      background={Colors[colorScheme ?? "light"].secondary}
      border={Colors[colorScheme ?? "light"].secondary}
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
