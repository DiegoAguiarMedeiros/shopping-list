import { Dimensions } from "react-native";
import { Link } from "expo-router";
import styled, { css } from "styled-components/native";

export const ContainerListItem = styled.TouchableHighlight<{
  background: string;
  borderColor: string;
}>`
  background: ${(props: { background: string }) => props.background};
  width: 100%;
  height: 135px;
  border-radius: 15px;
  margin: 5px 0;
  border: 1px solid ${(props: { borderColor: string }) => props.borderColor};
`;


export const LinkStyled = styled(Link)`
  z-index: 99;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;
export const ContainerListItemHead = styled.View`
  width: 100%;
  flex: 5;
  flex-direction: column;
`;
export const ContainerListItemBody = styled.View`
  flex: 2;
  flex-direction: row;
  padding: 0px 10px;
  margin: 0 0 10px 0;
  justify-content: flex-start;
  align-items: center;
`;
export const ContainerListItemBodyAveragePrice = styled.View`
  flex: 2;
  flex-direction: row;
  padding: 0px 10px;
  margin: 0 0 10px 0;
  justify-content: center;
  align-items: center;
`;
export const ContainerListItemBottom = styled.View`
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #fff;
  display: flex;
  flex-direction: row;
  flex: 4;
  width: 100%;
`;
export const ContainerItemTitle = styled.View`
  flex: 3;
  padding: 2px 10px;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const ContainerItemCircleProgress = styled.View`
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
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
export const ContainerItemBottomButtonTouchableHighlight = styled.TouchableHighlight<{
  text: string;
}>`
  flex: 1;
  font-size: 12px;
  margin-bottom: 2px;
  justify-content: center;
  align-items: center;
`;
export const ContainerItemBottomButton = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  text-align: center;
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
export const ContainerItemTextPriceTotal = styled.Text<{
  text: string;
}>`
  color: ${(props: { text: any }) => props.text};
  flex: 2;
  font-size: 12px;
  padding: 0px 10px;
  margin-bottom: 2px;
`;

export const ButtonView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
export const ButtonInner = styled.TouchableHighlight`
  height: 100%;
  border-radius: 15px;
`;
export const ButtonTextIcon = styled.Text<{
  text: string;
}>`
  width: 100%;
  color: ${(props: { text: any }) => props.text};
  text-align: center;
`;
export const ButtonText = styled.Text<{
  text: string;
}>`

  width: 100%;
  color: ${(props: { text: any }) => props.text};
  flex: 10;
  font-size: 10px;
  padding: 0px 10px;
  text-align: center;
`;
