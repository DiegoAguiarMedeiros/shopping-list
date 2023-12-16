import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  height: 90px;
`;

export const ButtonContainer = styled.TouchableOpacity`
    padding:0;
    margin: 5px 5px 5px 0;
`;

export const ButtonText = styled.Text`
  color: white;
`;