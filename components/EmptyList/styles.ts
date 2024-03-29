import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View<{
  background: string;
}>`
  background: ${(props: { background: any }) => props.background};
  width: ${Dimensions.get("window").width + "px"};
  height: 100%;
  padding: 10px;
`;
export const ContainerListEmpty = styled.View`
  height: 100%;
  padding: 1px;
  overflow: hidden;
`;
export const ContainerListEmptyInner = styled.View`
  flex: 6;
  justify-content: center;
  align-items: center;
`;
export const ContainerListEmptyInnerButton = styled.View`
  flex: 1;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export const SlideContainerInnerImage = styled.View`
  align-items: center;
  justify-content: center;
  height: 100px;
`;

export const SlideImage = styled.Image`
  width: 300px;
  height: 300px;
`;

export const ListEmptyTitle = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};

  font-size: 20px;
  text-align: center;
`;
export const ListEmptyTextmessage = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  font-size: 16px;
  text-align: center;
  margin-top: 20%;
`;

export const ContainerButtonAdd = styled.View`
  margin-top: 10%;
  height: 55px;
`;
