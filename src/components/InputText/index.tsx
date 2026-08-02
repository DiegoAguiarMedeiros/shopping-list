import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";

interface InputProps extends TextInputProps {
  placeholder: string;
  radius?: boolean;
  background: string;
  color: string;
  placeholderTextColor: string;
}

const InputText: React.FC<InputProps> = ({
  placeholder,
  radius,
  background,
  color,
  placeholderTextColor,
  style,
  ...rest
}) => {
  const hasRightRadius = !radius;

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: background,
          borderColor: background,
          color: color,
          borderTopRightRadius: hasRightRadius ? 10 : 0,
          borderBottomRightRadius: hasRightRadius ? 10 : 0,
        },
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    width: "100%",
    height: "100%",
  },
});

export default InputText;