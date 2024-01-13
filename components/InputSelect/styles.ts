import { Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  overflow:hidden;
  border-radius: 10px;
`;


export const Select = styled(Picker) <{
  background: string;
  color: string;
}>`
  background: ${(props: { background: string }) => props.background};
  background: #0f0;
  
  color: ${(props: { color: string }) => props.color};
  border: 1px solid ${(props: { background: string }) => props.background};
  border-radius: 10px;
  font-size: 14px;
  width: 100%;
  height: 100%;
  margin-top: -5px;
`;