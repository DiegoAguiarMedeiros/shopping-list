import React from "react";
import { TouchableHighlightProps, StyleSheet, TouchableHighlight } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
    <TouchableHighlight
      onPress={onPress}
      {...rest}

      style={[styles.button,
      { borderColor: ConfigRepository.color.itemListItemOpenButtonBorder, borderWidth: 1, borderStyle: 'solid' },
      { backgroundColor: ConfigRepository.color.itemListItemOpenButtonBackGround },
      !!invertSide ? { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 } : { borderTopRightRadius: 10, borderBottomRightRadius: 10 }
      ]}
      underlayColor={ConfigRepository.color.itemListItemOpenButtonBackGround}
    >
      {icon !== undefined ? (
        <FontAwesome
          size={20}
          style={{ marginBottom: -3 }}
          name={icon}
          color={ConfigRepository.color.itemListItemOpenButtonText}
        />
      ) : null}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
});

export default Button;
