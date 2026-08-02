import React from "react";
import { TextInputProps, StyleSheet, TextInput } from "react-native";
import { useStores } from "../../../../../../context/StoreContext";

interface InputProps extends TextInputProps {
  placeholder: string;
  radius: boolean;
}

const InputText: React.FC<InputProps> = ({
  placeholder,
  radius,
  ...rest
}) => {
  const { ConfigRepository } = useStores();

  return (
    <TextInput
      style={[styles.input,
      {
        backgroundColor: ConfigRepository.color.backgroundPrimary,
        color: ConfigRepository.color.text,
        borderRadius: radius ? 10 : 0,
        
      }
      ]}
      placeholder={placeholder}
      placeholderTextColor={ConfigRepository.color.textSecondary}
      underlineColorAndroid="transparent"
      textAlignVertical="center"
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    fontSize: 20,
    flex: 1,
    margin: 0,
    padding: 0,
    paddingVertical: 0,
    includeFontPadding: false,
    textAlign: 'center',
  },
});

export default InputText;
