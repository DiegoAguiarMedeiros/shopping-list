import React from "react";
import { TextInputProps, useColorScheme } from "react-native";

import * as Styled from "./styles";
import { useShoppingListContext } from "../../../../../../context/ShoppingList";

interface InputProps extends TextInputProps {
  placeholder: string;
  radius: boolean;
}

const InputText: React.FC<InputProps> = ({ placeholder, radius, ...rest }) => {
  const colorScheme = useColorScheme();

  const { getTheme, getColor } = useShoppingListContext();
  return (
    <Styled.Input
      radius={radius}
      background={getColor().backgroundPrimary}
      color={getColor().text}
      placeholder={placeholder}
      placeholderTextColor={getColor().textSecondary}
      {...rest}
    />
  );
};

export default InputText;
