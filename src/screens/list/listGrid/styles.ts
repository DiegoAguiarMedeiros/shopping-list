import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  margin-top: -10px;
  margin-right: 22px;
`;

export const ContainerList = styled.View`
  height: 100%;
  overflow: hidden;
`;
export const ContainerListInner = styled.View`
  flex: 1;
`;

export const ContainerListTotal = styled.View`
  width: 100%;
  flex-direction: row;
  flex: 0.25;
  min-height: 25px;
  padding: 5px;
`;
export const ContainerListItemList = styled.View`
  width: 100%;
  flex: 12;
`;
export const ContainerButtonAdd = styled.View`
  flex: 1;
`;

export const ContainerItemTotalUnitText = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  font-size: 18px;
  flex: 1;
  text-align: left;
`;
export const ContainerItemTotalText = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  font-size: 18px;
  flex: 1;
  text-align: right;
`;
