import { Dimensions, Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View<{
  background: string;
  noPadding: boolean;
  height: string;
  elevation: number;
}>`
  background: ${(props: { background: string }) => props.background};
  width: 100%;
  height: ${(props: { height: string }) => props.height};
  padding: ${(props: { noPadding: boolean }) => props.noPadding ? "0px" : "10px"};
  ${Platform.OS === 'android' && ((props: { elevation: number }) => (props.elevation ? `elevation: ${props.elevation};` : "elevation:0"))}
`;
