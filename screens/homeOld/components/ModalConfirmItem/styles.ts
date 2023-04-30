import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';
export const ContainerOpacity = styled.View<{
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
    position:absolute;
    width: ${Dimensions.get('window').width};
    height: ${Dimensions.get('window').width};
    height: 100%;
    opacity: 0.8;
    z-index:888;
    
`;
export const Container = styled.View<{
    border: string,
    background: string,
}>`
    border: 1px solid ${(props: { border: any; }) => props.border};
    background:${(props: { background: any; }) => props.background};
    position:absolute;
    width: ${Dimensions.get('window').width};
    height: 40%;
    z-index:999;
    margin: 100px 0 0 0;

`;

export const ModalBody = styled.View<{
    border: string,
    background: string,
}>`
    border: 1px solid ${(props: { border: any; }) => props.border};
    background:${(props: { background: any; }) => props.background};
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const ModalHeader = styled.View<{
    border: string,
}>`
    border: 1px solid ${(props: { border: any; }) => props.border};
    width: 100%;
    height: 20%;
    padding:15px;
    `;
export const ModalBodyInner = styled.View<{
    border: string,
}>`
    border: 1px solid ${(props: { border: any; }) => props.border};
    width: 100%;
    height: 65%;
    padding:15px;
    `;
export const ModalTitle = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    font-size: 25;
    `;

export const Text = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text};
    width: 70%;
    padding:10px;
    `;

export const ContainerButtonAdd = styled.View<{
    border: string,
}>`
    padding:2px;
    display: flex;
    flex-direction: row;
    width: 100%;
    `;

export const ContainerButtonAddInner = styled.View`
    width: 50%;
`;

export const ContainerInputQauntity = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
`;
export const ContainerInputQauntityInner = styled.View`
    width: 50%;
`;