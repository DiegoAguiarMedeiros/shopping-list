import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View<{
  background: string;
}>`
  background: ${(props: { background: any }) => props.background};
  width: ${Dimensions.get("window").width + "px"};
  height: 100%;
  padding: 10px;
`;
