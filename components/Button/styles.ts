import styled, { css } from "styled-components/native";

export const Button = styled.TouchableHighlight<{
  border: string;
  background: string;
  height: string;
  radius: boolean;
}>`
  background: ${(props: { background: any }) => props.background};
  border: 1px solid ${(props: { border: any }) => props.border};
  border-top-right-radius: 10px;
  border-top-left-radius: ${(props: { radius: boolean }) =>
    props.radius ? "10px" : "0px"};
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: ${(props: { radius: boolean }) =>
    props.radius ? "10px" : "0px"};
  padding: 5px 10px;
  height: ${(props: { height: any }) => props.height};
  min-height: 35px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  font-size: 16px;
  margin: auto;
  padding: 5px 10px;
`;
