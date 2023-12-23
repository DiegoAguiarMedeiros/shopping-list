import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View<{
  background: string;
  noPadding: boolean;
}>`
  background: ${(props: { background: string }) => props.background};
  width: ${Dimensions.get("window").width + "px"};
  height: 100%;
  padding: ${(props: { noPadding: boolean }) => props.noPadding ? "0px" : "10px"};
`;
