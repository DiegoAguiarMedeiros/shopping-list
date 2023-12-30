import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

export const ContainerHeader = styled.View<{
  background: string;
  bottom: boolean;
}>`
  background: ${(props: { background: string }) => props.background};
  width: 100%;
  height: ${(props: { bottom: boolean }) => props.bottom ? "130px" : "80px;"}; 
  flex-direction: column;
  `;

export const ContainerHeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  padding-top: 25px;
  flex:2;
  `;

export const ContainerHeaderLeft = styled.View`
  width: 15%;
  justify-content: center;
  align-items: center;
  `;

export const ContainerHeaderTitle = styled.View`
  width: 60%;
  justify-content: center;
  align-items: center;
  `;

export const ContainerHeaderRight = styled.View`
  width: 25%;
  justify-content: center;
  align-items: center;
`;
export const ContainerHeaderBottom = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  flex:2;
`;