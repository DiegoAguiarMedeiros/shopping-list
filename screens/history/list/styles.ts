import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View<{
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
    width: ${Dimensions.get('window').width};
    height: ${Dimensions.get('window').height};
    padding:60px 0 60px 0;
    margin: 10px 0;
    `;

export const ContainerListInner = styled.View`
    flex: 1;
    flex-grow:1;
    justify-content: center;
    align-items: center;
    `;
export const ContainerListList = styled.View`
    padding:0 15px;
    flex: 8;
    flex-grow:1;
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
width: 200px;
height: 200px;
`;


export const ListTitle = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    font-size: 20;
    text-align: center;
`;
export const ListTextmessage = styled.Text<{
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
    height: 60%;
`;