import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    height: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
    `;


export const WrapperGrid = styled.View`
    flex: 15;
`;
export const WrapperGridInner = styled.View`
    width:100%;
    height:100%;
    padding:5px;
`;
export const WrapperInput = styled.View`
    display:flex;
    flex-direction: row;
    width: 100%;
    flex: 2;
    padding: 0 0 10px 0;
`;
export const WrapperInputInner = styled.View`
    width: 100%;
    flex: 5;
`;
export const WrapperButton = styled.View`
    width: 100%;
    flex: 1;
`;