import { Dimensions } from 'react-native';
import { Link } from 'expo-router';
import styled, { css } from 'styled-components/native';
export const ContainerListItem = styled.TouchableOpacity<{
    background: string
    active: boolean
}>`
    background:${(props: { background: string }) => props.background};
    width:100%;
    height:${(props: { active: boolean }) => props.active ? '140px' : '100px'};
    border-radius: 15px;
    margin: 5px 0;
    position:relative;
    `;
export const LinkStyled = styled(Link)`  
    z-index:99;
    position:absolute;
    width:100%;
    height:100%;
    display: flex;
    flex-direction: row;
    margin:0;
    padding:0;
`;
export const ContainerListItemHead = styled.View`  
    display: flex;
    flex-direction: row;
    width:100%;
    flex:8;
    
`;
export const ContainerListItemBody = styled.View`   
    display: flex;
    flex:2;
    flex-direction: row;
    width:100%;
    
`;
export const ContainerListItemBottom = styled.View`   
    border-top-width: 1px;
    border-top-style : solid;
    border-top-color : #fff;
    display: flex;
    flex-direction: row;
    flex:4;
    width:100%;
`;
export const ContainerItemTextTitle = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    flex:6;
    font-size: 22px;
    margin: 5px 0px;
    padding: 5px 10px;
    `;
export const ContainerItemCircleProgress = styled.Text<{
    text: string,
}>`
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
export const ContainerItemBottomButtonTouchableOpacity = styled.TouchableOpacity<{
    text: string,
}>`
    flex:1;
    font-size: 12px;
    marginBottom:2px;
    justify-content: center;
    align-items: center;
`;
export const ContainerItemBottomButton = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    text-align: center;
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