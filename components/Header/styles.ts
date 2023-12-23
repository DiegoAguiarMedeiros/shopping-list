import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

export const ContainerHeader = styled.View<{
  background: string;
}>`
  background: ${(props: { background: string }) => props.background};
  width: 100%;
  height: 80px;
  flex-direction: row;
  padding: 15px 0 3px 0;
`;

export const ContainerHeaderLeft = styled.View`
  width: 15%;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  `;

export const ContainerHeaderTitle = styled.View`
  width: 60%;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  `;

export const ContainerHeaderRight = styled.View`
  width: 25%;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;