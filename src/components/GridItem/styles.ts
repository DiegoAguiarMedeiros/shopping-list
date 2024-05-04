import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  width: ${Dimensions.get("window").width + "px"};
  height: 100%;
  padding: 10px;
`;
