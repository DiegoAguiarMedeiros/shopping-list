import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";
export const Input = styled.TextInput<{
  background: string;
  color: string;
  radius: boolean;
}>`
  background: ${(props: { background: string }) => props.background};
  border: 1px solid ${(props: { background: any }) => props.background};
  color: ${(props: { color: string }) => props.color};
  font-size: 20px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-radius: ${(props: { radius: boolean }) =>
    props.radius ? "10px" : "0px"};
  text-align: center;
`;
