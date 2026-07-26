import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";
export const Input = styled.TextInput<{
  background: string;
  color: string;
  radius: boolean;
}>`
  background: ${(props: { background: string }) => props.background};
  border-width: 0;
  color: ${(props: { color: string }) => props.color};
  font-size: 20px;
  flex: 1;
  margin: 0;
  padding: 0;
  padding-vertical: 0;
  include-font-padding: false;
  border-radius: ${(props: { radius: boolean }) =>
    props.radius ? "10px" : "0px"};
  text-align: center;
`;
