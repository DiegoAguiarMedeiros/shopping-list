import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';
export const ContainerListItemListItem = styled.Pressable<{
    background: string
}>`
    background:${(props: { background: string }) => props.background};
    width:100%;
    height:80;
    border-radius: 15px;
    margin: 5px 0;
`;
export const ContainerListItemListItemHead = styled.View`   
    display: flex;
    flex:2;
    flex-direction: row;
    width:100%;
    height:50%;
    `;
export const ContainerListItemListItemBody = styled.View`   
    display: flex;
    flex:1;
    flex-direction: row;
    width:100%;
    height:50%;
    `;
export const ContainerItemTextTitle = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    flex:10;
    font-size: 22px;
    margin: 5px 0px;
    padding: 5px 10px;
    `;
export const ContainerItemTextIcon = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    flex:1;
    font-size: 22px;
    margin: 5px 0px;
    padding: 5px 10px;
`;
export const ContainerItemTextQtd = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    flex:1;
    font-size: 12px;
    padding: 0px 10px;
    marginBottom:2px;

`;
export const ContainerItemTextPriceUnit = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    flex:2;
    font-size: 12px;
    padding: 0px 10px;
    marginBottom:2px;

`;
export const ContainerItemTextPriceTotal = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    flex:2;
    font-size: 12px;
    padding: 0px 10px;
    marginBottom:2px;

`;