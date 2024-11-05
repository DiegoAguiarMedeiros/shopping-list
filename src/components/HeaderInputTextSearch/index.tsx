import React, { useEffect, useRef } from "react";
import { TextInput, TextInputProps } from "react-native";

import * as Styled from "./styles";
import { colorTheme } from "../../../constants/Colors";
import { useStores } from "../../context/StoreContext";

interface InputProps extends TextInputProps {
  placeholder: string;
}

const HeaderInputTextSearch: React.FC<InputProps> = ({
  placeholder,
  ...rest
}) => {
  const inputRef = useRef<TextInput>(null);
  const { ConfigRepository } = useStores();
  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current.focus();
    }
  }, [inputRef]);

  return (
    <Styled.Input
      ref={inputRef}
      background={ConfigRepository.color.secondary}
      border={ConfigRepository.color.secondary}
      color={ConfigRepository.color.white}
      placeholder={placeholder}
      placeholderTextColor={ConfigRepository.color.white}
      {...rest}
    />
  );
};

export default HeaderInputTextSearch;
