import React, { useEffect, useRef, useState } from "react";
import { TextInput, TextInputProps, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import { useShoppingListContext } from "../../context/ShoppingList";

interface InputProps extends TextInputProps {
  placeholder: string;
}

const HeaderInputTextSearch: React.FC<InputProps> = ({ placeholder, ...rest }) => {
  const colorScheme = useColorScheme();

  const { getTheme } = useShoppingListContext();
  const inputRef = useRef<TextInput>(null);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef])

  return (
    <Styled.Input
      ref={inputRef}
      background={Colors[getTheme()].secondary}
      border={Colors[getTheme()].secondary}
      color={Colors[getTheme()].white}
      placeholder={placeholder}
      placeholderTextColor={Colors[getTheme()].white}
      {...rest}
    />
  );
};

export default HeaderInputTextSearch;
