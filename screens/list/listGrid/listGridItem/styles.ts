import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';
export const ContainerListItemListItem = styled.TouchableHighlight<{
    background: string,
}>`
    background:${(props: { background: string }) => props.background};
    width:100%;
    min-height: 100px;
    max-height: 410px;
    border-radius: 15px;
    margin: 5px 0;
`;
export const ContainerListItemListItemAMount = styled.View<{
    background: string,
    height: string,
}>`
    background:${(props: { background: string }) => props.background};
    height:${(props: { height: string }) => props.height + 'px'};
    min-height: 50px;
    max-height: 320px;
    border-radius: 15px;
    margin:5px;
`;
export const Container = styled.View``
    ;
export const ContainerListItemListItemInner = styled.View`   
    height:80px;
    width:100%;
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
export const ContainerItemTextTitle = styled.View`
    flex:10;
    margin: 5px 0px;
    padding: 5px 10px;
    `;
export const ContainerItemTextIcon = styled.View`
    justify-content: flex-end;
    height: 100%;
    flex:1;
    padding: 0;
`;
export const ContainerItemTextQtd = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    flex:1;
    font-size: 12px;
    padding: 0px 10px;
    margin-bottom:2px;

`;
export const ContainerItemTextPriceUnit = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    flex:2;
    font-size: 12px;
    padding: 0px 10px;
    margin-bottom:2px;

`;
export const ContainerItemTextPriceTotal = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    flex:2;
    font-size: 12px;
    padding: 0px 10px;
    margin-bottom:2px;

`;
export const ButtonView = styled.View`   
    display: flex;
    flex-direction: row;
    width:100%;
    height:100%;
    `;
export const ButtonInner = styled.TouchableHighlight`   
    border-radius: 15px;
    width:50%;
    height:100%;
    `;
export const ButtonTextIcon = styled.Text<{
    text: string,
}>`
        color:${(props: { text: any; }) => props.text}; 
        flex:10;
        margin: 5px 0;
        padding: 15px 10px 0 10px;
        text-align: center;
    `;
export const ButtonText = styled.Text<{
    text: string,
}>`
        color:${(props: { text: any; }) => props.text}; 
        flex:10;
        font-size: 10px;
        padding: 0px 10px;
        text-align: center;
    `;

export const ContainerListPriceItem = styled.View`
width:100%;
flex: 1;
height: 50%;
padding: 0;
`; 