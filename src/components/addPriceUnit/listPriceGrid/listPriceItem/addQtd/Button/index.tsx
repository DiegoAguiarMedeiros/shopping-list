import React from "react";
import { TouchableHighlightProps, useColorScheme } from "react-native";
import * as Styled from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useShoppingListContext } from "../../../../../../context/ShoppingList";
import { colorTheme } from "../../../../../../../constants/Colors";

interface ButtonProps extends TouchableHighlightProps {
  invertSide?: boolean;
  icon?: "minus" | "plus";
  color: colorTheme;
}

const Button: React.FC<ButtonProps> = ({
  invertSide,
  icon,
  children,
  onPress,
  color,
  ...rest
}) => {
  return (
    <Styled.Button
      onPress={onPress}
      {...rest}
      border={color.itemListItemOpenButtonBorder}
      background={color.itemListItemOpenButtonBackGround}
      underlayColor={color.itemListItemOpenButtonBackGround}
      invertSide={invertSide!}
    >
      {icon !== undefined ? (
        <FontAwesome
          size={20}
          style={{ marginBottom: -3 }}
          name={icon}
          color={color.itemListItemOpenButtonText}
        />
      ) : null}
    </Styled.Button>
  );
};

export default Button;
