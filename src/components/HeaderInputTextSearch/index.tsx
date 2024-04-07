import React, { useEffect, useRef, useState } from "react";
import { TextInput, TextInputProps, useColorScheme } from "react-native";


import * as Styled from "./styles";
import { useShoppingListContext } from "../../context/ShoppingList";

interface InputProps extends TextInputProps {
  placeholder: string;
}

const HeaderInputTextSearch: React.FC<InputProps> = ({
  placeholder,
  ...rest
}) => {
  const colorScheme = useColorScheme();

  const { getTheme, getColor } = useShoppingListContext();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <Styled.Input
      ref={inputRef}
      background={getColor().secondary}
      border={getColor().secondary}
      color={getColor().white}
      placeholder={placeholder}
      placeholderTextColor={getColor().white}
      {...rest}
    />
  );
};

export default HeaderInputTextSearch;
