import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";

export const Container = styled.View<{
  background: string;
}>`
  background: ${(props: { background: any }) => props.background};
  width: ${Dimensions.get("window").width + "px"};
`;
export const ContainerInner = styled.View`
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
`;
export const Item = styled.Pressable<{
  active: boolean;
  boder: string;
}>`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-top-color: ${(props: { boder: any }) => props.boder};
  border-top-style: solid;
  border-top-width: ${(props: { active: any }) => (props.active ? "2px" : "0")};
`;

export const Text = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  text-align: center;
`;
