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
height: 100%;
padding:1px;
overflow:hidden;
`;
export const ContainerListInner = styled.View`

    flex: 1;
    justify-content: center;
    align-items: center;
        `;


export const ContainerListTotal = styled.View`
    width:100%;
    flex-direction: row;
    align-items: center;
    flex: 0.5;
    height: 50%;
    margin: 0 0 20px 0;
`;
export const ContainerListItemList = styled.View`
    width:100%;
    flex: 11;
    height: 50%;
    margin: 0 0 20px 0;
    padding: 0 0 15px 0;
`;
export const ContainerListItemListItem = styled.View`
    width:100%;
    flex: 1;
    height: 50%;
    padding: 0 0 15px 0;
`;
export const ContainerButtonAdd = styled.View`
    flex: 1;
`;

export const ContainerItemTotalUnitText = styled.Text<{
    text: string,
}>`
    
    color:${(props: { text: any; }) => props.text}; 
    fontSize: 18;
    flex:1;
    text-align: left;
    `;
export const ContainerItemTotalText = styled.Text<{
    text: string,
}>`
    
    color:${(props: { text: any; }) => props.text}; 
    fontSize: 18;
    flex:1;
    text-align: right;
    `;