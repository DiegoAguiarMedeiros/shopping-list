import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  width: ${Dimensions.get("window").width + "px"};
  flex: 1;
  padding: 15px 0;
  padding-bottom: 10px;
`;
export const InputContainer = styled.View`
  padding: 5px 15px;
  width: 100%;
  height: 60px;
  flex-direction: row;
`;
export const ButtonsContainer = styled.View`
  padding: 0 15px;
  width: 100%;
  height: 65px;
  flex-direction: row;
  align-items: center;
`;
export const ButtonWrapper = styled.View<{
  margin: string;
}>`
  margin: ${(props: { margin: string }) => props.margin};
  flex: 1;
`;