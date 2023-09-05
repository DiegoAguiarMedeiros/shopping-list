import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

export const Tags = styled.View<{
  isVisible: boolean;
  background: string;
  marginTop: string;
}>`
  display: ${(props: { isVisible: any }) =>
    props.isVisible ? "block" : "none"};
  background: ${(props: { background: any }) => props.background};
  width: ${Dimensions.get("window").width + "px"};
  position: absolute;
  padding: 5px 15px;
  margin-top: ${(props: { marginTop: any }) => `${props.marginTop}px`};
  height: auto;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
export const TagsItem = styled.View<{
  background: string;
}>`
  flex: 1;
  justify-content: center;
  align-items: start;
  background: ${(props: { background: string }) => props.background};
  width: 100%;
  height: 45px;
  border-radius: 10px;
  padding: 5px 15px;
  margin: 5px 0;
`;
