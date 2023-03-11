import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View<{
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
    width: ${Dimensions.get('window').width};
    height: ${Dimensions.get('window').height};
`;

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ImageStyled = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

export const Button = styled.Button``;

export const TransitionEffect = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const SlideContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
`;