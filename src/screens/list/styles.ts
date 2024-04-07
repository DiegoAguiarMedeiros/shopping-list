import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
margin-top: -10px;
margin-right:22px;
`;
export const ContainerButtonAdd = styled.View`
  flex: 1;
`;
export const ContainerHeader = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 15px 0 3px 0;
`;
export const ContainerBody = styled.View`
  width: 100%;
  flex: 10;
`;
export const ContainerListInner = styled.View`
  flex: 10;
  justify-content: center;
  align-items: center;
`;

export const ContainerListInnerButton = styled.View<{
  background: string;
}>`
  background: ${(props: { background: any }) => props.background};
    flex: 1;
    align-items: center;
`;

export const ContainerHeaderInnerIconBack = styled.View`
  width: 15%;
  justify-content: center;
  align-items: center;
`;
export const ContainerHeaderInnerText = styled.View`
  width: 60%;
  justify-content: center;
  align-items: center;
`;
export const ContainerHeaderInnerProgress = styled.View`
  width: 25%;
  justify-content: center;
  align-items: center;
`;
export const ContainerHeaderInnerFilterButtons = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

