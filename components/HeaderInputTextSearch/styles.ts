import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

export const Input = styled.TextInput<{
  background: string;
  color: string;
}>`
  background: ${(props: { background: string }) => props.background};
  color: ${(props: { color: string }) => props.color};
  border: 1px solid ${(props: { background: string }) => props.background};
  padding: 10px;font-size: 22px;
  width: ${Dimensions.get("window").width + "px"};
  height: 100%;
`;
