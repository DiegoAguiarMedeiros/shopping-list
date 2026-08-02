import React, { useEffect, useRef } from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";

import { useStores } from "../../context/StoreContext";

interface InputProps extends TextInputProps {
  placeholder: string;
}

const HeaderInputTextSearch: React.FC<InputProps> = ({
  placeholder,
  style,
  ...rest
}) => {
  const inputRef = useRef<TextInput>(null);
  const { ConfigRepository } = useStores();

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <TextInput
      ref={inputRef}
      style={[
        styles.input,
        {
          backgroundColor: ConfigRepository.color.secondary,
          borderColor: ConfigRepository.color.secondary,
          color: ConfigRepository.color.white,
        },
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={ConfigRepository.color.white}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});

export default HeaderInputTextSearch;