import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useStores } from "../../context/StoreContext";

type QuantitySelectorButtonsProps = {
  value: string;
  onDecrement: () => void;
  onIncrement: () => void;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;

  TextInputBackgoundColor: string;
};

const QuantitySelectorButtons = ({
  value,
  onDecrement,
  onIncrement,
  onChangeText,
  keyboardType = "numeric",
  placeholder,
  TextInputBackgoundColor,
}: QuantitySelectorButtonsProps) => {
  const { ConfigRepository } = useStores();

  return (
    <View style={[styles.qtdContainer]}>
      <TouchableOpacity
        style={[
          styles.qtdBtn,
          {
            backgroundColor: ConfigRepository.color.primary,
          },
        ]}
        onPress={onDecrement}
      >
        <FontAwesome
          name="minus"
          size={12}
          color={ConfigRepository.color.onPrimary}
        />
      </TouchableOpacity>

      <TextInput
        style={[
          styles.qtdInput,
          {
            color: ConfigRepository.color.text,
            backgroundColor: TextInputBackgoundColor,
          },
        ]}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={ConfigRepository.color.textSecondary}
      />

      <TouchableOpacity
        style={[
          styles.qtdBtn,
          {
            backgroundColor: ConfigRepository.color.primary,
          },
        ]}
        onPress={onIncrement}
      >
        <FontAwesome
          name="plus"
          size={12}
          color={ConfigRepository.color.onPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  qtdBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  qtdInput: {
    width: 42,
    height: 28,
    marginHorizontal: 6,
    borderRadius: 6,
    textAlign: "center",
    fontSize: 14,
    padding: 0,
  },
});

export default QuantitySelectorButtons;
