import React from "react";
import { TextInputProps, useColorScheme } from "react-native";

import Colors from "../../../../../../constants/Colors";
import * as Styled from "./styles";
import { useShoppingListContext } from "../../../../../../context/ShoppingList";

interface InputProps extends TextInputProps {
  placeholder: string;
  radius: boolean;
}

const InputText: React.FC<InputProps> = ({ placeholder, radius, ...rest }) => {
  const colorScheme = useColorScheme();

  const { getTheme } = useShoppingListContext();
  return (
    <Styled.Input
      radius={radius}
      background={Colors[getTheme()].backgroundPrimary}
      color={Colors[getTheme()].text}
      placeholder={placeholder}
      placeholderTextColor={Colors[getTheme()].textSecondary}
      {...rest}
    />
  );
};

export default InputText;
