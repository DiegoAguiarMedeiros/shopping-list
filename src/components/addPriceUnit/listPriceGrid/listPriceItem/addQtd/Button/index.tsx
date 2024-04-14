import React from "react";
import { TouchableHighlightProps, useColorScheme } from "react-native";
import * as Styled from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useShoppingListContext } from "../../../../../../context/ShoppingList";

interface ButtonProps extends TouchableHighlightProps {
  invertSide?: boolean;
  icon?: "minus" | "plus";
}

const Button: React.FC<ButtonProps> = ({
  invertSide,
  icon,
  children,
  onPress,
  ...rest
}) => {
  const colorScheme = useColorScheme();
  const { getTheme, getColor } = useShoppingListContext();
  return (
    <Styled.Button
      onPress={onPress}
      {...rest}
      border={getColor().itemListItemOpenButtonBorder}
      background={getColor().itemListItemOpenButtonBackGround}
      invertSide={invertSide!}
    >
      {icon !== undefined ? (
        <FontAwesome
          size={20}
          style={{ marginBottom: -3 }}
          name={icon}
          color={getColor().itemListItemOpenButtonText}
        />
      ) : null}
    </Styled.Button>
  );
};

export default Button;
