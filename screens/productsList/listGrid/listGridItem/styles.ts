import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";
export const ContainerListItemListItem = styled.TouchableHighlight<{
  height: string;
  background: string;
  borderColor: string;
}>`
  background: ${(props: { background: string }) => props.background};
  border: 1px solid ${(props: { borderColor: string }) => props.borderColor};
  width: 100%;
  height: ${(props: { height: string }) => props.height}px;
  min-height: 60px;
  max-height: 410px;
  border-radius: 15px;
  margin: 5px 0;
`;
export const ContainerListItemListItemAMount = styled.View<{
  background: string;
  height: string;
}>`
  background: ${(props: { background: string }) => props.background};
  height: ${(props: { height: string }) => props.height + "px"};
  min-height: 40px;
  max-height: 320px;
  border-radius: 15px;
  margin: 5px;
`;
export const Container = styled.View``;
export const ContainerListItemListItemInner = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
`;
export const ContainerListItemListItemHead = styled.View`
  display: flex;
  flex: 7;
  flex-direction: column;
  width: 100%;
`;
export const ContainerListItemListItemTitle = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
`;
export const ContainerListItemListItemBody = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
`;
export const ContainerItemTextTitle = styled.View`
  justify-content: center;
  flex: 2;
`;
export const ContainerItemTextIcon = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
  flex: 1;
`;
export const ContainerItemTextQtd = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  flex: 1;
  font-size: 12px;
  padding: 0px 10px;
  margin-bottom: 2px;
`;
export const ContainerItemTextPriceUnit = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  flex: 2;
  font-size: 12px;
  padding: 0px 10px;
  margin-bottom: 2px;
`;
export const ContainerItemTextPriceTotal = styled.Text`
  flex: 2;
  font-size: 12px;
`;
export const ButtonView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
export const ButtonInner = styled.TouchableHighlight`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;
export const ButtonTextIcon = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  flex: 10;
  padding: 5px 10px 0 10px;
  text-align: center;
  width: 100%;
`;
export const ButtonText = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  flex: 10;
  font-size: 10px;
  padding: 0px 10px;
  text-align: center;
`;

export const ContainerListPriceItem = styled.View`
  width: 100%;
  flex: 1;
  height: 50%;
  padding: 0;
`;
