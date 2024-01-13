import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.TouchableHighlight`
    padding:0 5px;
    margin: 0 5px;
`;

export const ButtonText = styled.Text`
  color: white;
`;