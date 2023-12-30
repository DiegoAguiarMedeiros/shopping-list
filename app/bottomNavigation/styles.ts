import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";

export const Container = styled.View<{
  background: string;
  border: string;
}>`
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: ${(props: { border: any }) => props.border};
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
width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-top-color: ${(props: { boder: string }) => props.boder};
  border-top-style: solid;
  border-top-width: ${(props: { active: boolean }) => (props.active ? "2px" : "0")};
`;
export const ItemAddButton = styled.Pressable<{
  background: string;
  boder: string;
}>`
  justify-content: center;
  align-items: center;
  background-color: ${(props: { background: string }) => props.background};
  margin-top: -10px;
  border-radius: 70px;
  width: 100%;
  height: 60px;
`;
export const ItemAdd = styled.Pressable`
  border-radius: 100px;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-top-style: solid;
`;

export const Text = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  text-align: center;
`;
