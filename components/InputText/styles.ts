import styled, { css } from "styled-components/native";

export const Input = styled.TextInput<{
  background: string;
  color: string;
}>`
  background: ${(props: { background: string }) => props.background};
  color: ${(props: { color: string }) => props.color};
  border: 1px solid ${(props: { background: string }) => props.background};
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  height: 100%;
`;
