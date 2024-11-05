import React from "react";
import { TouchableHighlightProps, useColorScheme } from "react-native";
import * as Styled from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colorTheme } from "../../../../../../../constants/Colors";
import { useStores } from "../../../../../../context/StoreContext";

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
  const { ConfigRepository } = useStores();
  return (
    <Styled.Button
      onPress={onPress}
      {...rest}
      border={ConfigRepository.color.itemListItemOpenButtonBorder}
      background={ConfigRepository.color.itemListItemOpenButtonBackGround}
      underlayColor={ConfigRepository.color.itemListItemOpenButtonBackGround}
      invertSide={invertSide!}
    >
      {icon !== undefined ? (
        <FontAwesome
          size={20}
          style={{ marginBottom: -3 }}
          name={icon}
          color={ConfigRepository.color.itemListItemOpenButtonText}
        />
      ) : null}
    </Styled.Button>
  );
};

export default Button;
