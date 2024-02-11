import React, { useEffect, useRef } from "react";
import { TextInput, TextInputProps, useColorScheme } from "react-native";


import * as Styled from "./styles";
import { useShoppingListContext } from "../../context/ShoppingList";

interface InputProps extends TextInputProps {
  placeholder: string;
  radius?: boolean;
}

const InputText: React.FC<InputProps> = ({ placeholder, radius, ...rest }) => {
  const colorScheme = useColorScheme();
  const inputRef = useRef<TextInput>(null);

  const { getTheme, getColor } = useShoppingListContext();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <Styled.Input
      ref={inputRef}
      radius={!radius}
      background={getColor().backgroundPrimary}
      color={getColor().textSecondary}
      placeholder={placeholder}
      placeholderTextColor={getColor().textSecondary}
      {...rest}
    />
  );
};

export default InputText;
