import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

import SectionedMultiSelect from "react-native-sectioned-multi-select";
export const Container = styled.View`
  flex: 1;
  border-radius: 10px;
`;


export const AbsoluteDropdown = styled.View`
  position: absolute;
  top: 50px; /* Adjust as needed */
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure it appears above other components */
  background-color: #fff;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 4px;
`;
