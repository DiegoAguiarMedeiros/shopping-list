import React, { useEffect, useRef } from "react";
import { TextInput, TextInputProps, StyleSheet, Dimensions } from "react-native";

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
    const timer = setTimeout(() => {
      if (inputRef?.current) {
        inputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TextInput
      ref={inputRef}
      style={[
        styles.input,
        {
          backgroundColor: ConfigRepository.color.secondary,
          borderColor: ConfigRepository.color.secondary,
          color: ConfigRepository.color.onPrimary,

        },
        style
      ]}
      placeholder={placeholder}
      placeholderTextColor={ConfigRepository.color.onPrimary}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get("window").width - 110,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});

export default HeaderInputTextSearch;
