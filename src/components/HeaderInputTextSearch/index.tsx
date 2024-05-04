import React, { useEffect, useRef } from "react";
import { TextInput, TextInputProps } from "react-native";

import * as Styled from "./styles";
import { colorTheme } from "../../../constants/Colors";

interface InputProps extends TextInputProps {
  placeholder: string;
  color: colorTheme;
}

const HeaderInputTextSearch: React.FC<InputProps> = ({
  placeholder,
  color,
  ...rest
}) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <Styled.Input
      ref={inputRef}
      background={color.secondary}
      border={color.secondary}
      color={color.white}
      placeholder={placeholder}
      placeholderTextColor={color.white}
      {...rest}
    />
  );
};

export default HeaderInputTextSearch;
