import styled, { css } from "styled-components/native";

export const Input = styled.TextInput<{
  background: string;
  color: string;
  radius: boolean;
}>`
  background: ${(props: { background: string }) => props.background};
  color: ${(props: { color: string }) => props.color};
  border: 1px solid ${(props: { background: string }) => props.background};
  border-top-left-radius: 10px;
  border-top-right-radius: ${(props: { radius: boolean }) =>
    props.radius ? "10px" : "0px"};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: ${(props: { radius: boolean }) =>
    props.radius ? "10px" : "0px"};
  padding: 10px 15px;
  font-size: 16px;
  width: 100%;
  height: 100%;
`;
