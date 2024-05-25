import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";

import SectionedMultiSelect from "react-native-sectioned-multi-select";
export const Container = styled.View`
  flex: 1;
  border-radius: 10px;
`;

export const Select = styled(SectionedMultiSelect)<{
  background: string;
  color: string;
}>`
  background: ${(props: { background: string }) => props.background};
  color: ${(props: { color: string }) => props.color};
  border: 1px solid ${(props: { background: string }) => props.background};
  border-radius: 10px;
  font-size: 14px;
  width: 100%;
  height: 100%;
  margin-top: -5px;
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
