import React from "react";
import { TouchableHighlightProps, useColorScheme } from "react-native";
import Colors from "../../../../../../constants/Colors";
import * as Styled from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
  return (
    <Styled.Button
      onPress={onPress}
      {...rest}
      border={Colors[colorScheme ?? "light"].itemListItemOpenButtonBorder}
      background={Colors[colorScheme ?? "light"].itemListItemOpenButtonBackGround}
      invertSide={invertSide!}
    >
      {icon !== undefined ? (
        <FontAwesome
          size={20}
          style={{ marginBottom: -3 }}
          name={icon}
          color={Colors[colorScheme ?? "light"].itemListItemOpenButtonText}
        />
      ) : null}
    </Styled.Button>
  );
};

export default Button;
