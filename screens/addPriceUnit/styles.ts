import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View<{
  background: string;
}>`
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${(props: { background: string }) => props.background};
  border-radius: 10px;
`;

export const WrapperGrid = styled.View`
  flex: 2;
`;
export const WrapperGridInner = styled.View`
  width: 100%;
  height: 100%;
`;
export const WrapperInput = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
`;
export const WrapperInputInner = styled.View`
  width: 100%;
  flex: 5;
`;
export const WrapperButton = styled.View`
  width: 100%;
  flex: 1;
`;
