import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View<{
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
    width: 100%;
    height: 100%;
    padding:10px;
`;

export const ContainerList = styled.View`
    height: 76%;
    overflow:hidden;
`;
export const ContainerListEmpty = styled.View`
    height: 100%;
    padding:1px;
    overflow:hidden;
        `;
export const ContainerListEmptyInner = styled.View`

    flex: 1;
    flex-gorw:1;
    justify-content: center;
    align-items: center;
        `;

export const SlideContainerInnerImage = styled.View`
      flex: 1;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

export const SlideImage = styled.Image`
width: 350px;
height: 350px;
`;


export const ListEmptyTitle = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    font-size: 20;
    text-align: center;
`;
export const ListEmptyTextmessage = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    font-size: 16;
    text-align: center;
    flex: 1;
    margin-top: 10%;
    `;
export const ContainerTotal = styled.View<{
    border: string,
}>`
    border:1px solid ${(props: { border: any; }) => props.border};
    height: 5%;
    `;
export const ContainerButtonAdd = styled.View`
    margin-top: 10%;
    height: 50%;
`;