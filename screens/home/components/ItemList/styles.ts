import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View<{
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
`;

export const listItem = styled.View<{
    border: string,
    background: string,
}>`
    background:${(props: { background: any; }) => props.background};
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 1px solid ${(props: { border: any; }) => props.border};
    
    border-radius:5px;
    padding:10px;
    margin: 10px 0 0 0;
`;

export const listItemIconView = styled.View`
width: 100%;
`;
export const listItemIconViewInner = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
width: 100%;
`;

export const listItemIconViewInnerItemFirst = styled.View`
    flex: 2;
    padding:10px;
`;
export const listItemIconViewInnerItemPriceInner = styled.View`
border:1px solid #f00;

`;
export const listItemIconViewInnerItem = styled.View`
    padding:10px;
`;

export const listItemIconViewOk = styled.View`
border:1px solid #f00;
    width: 15%;
    padding:10px;
`;
export const listItemIconNotOk = styled.View`
    width: 15%;
    padding:10px;
`;

export const Text = styled.Text<{
    text: string,
}>`
    width: 70%;
    margin-top: 20px;
    font-size: 20px;
`;

export const titleList = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text};
    font-size: 20px;

    `;

export const listItemIconViewInnerPrice = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 10px;

`;
export const TextQTD = styled.Text<{
    text: string,
}>`
width:33%;
    color:${(props: { text: any; }) => props.text};
    font-size: 15px;

    `;
export const TextValue = styled.Text<{
    text: string,
}>`
    width:33%;
    color:${(props: { text: any; }) => props.text};
    font-size: 15px;

    `;
export const TextValueTotal = styled.Text<{
    text: string,
}>`
width:33%;
    color:${(props: { text: any; }) => props.text};
    font-size: 15px;

    `;
export const titleListPrice = styled.Text<{
    text: string,
}>`
width:100%;
    color:${(props: { text: any; }) => props.text};
    margin-top: 20px;
    font-size: 20px;

    `;
export const price = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text};
    margin-top: 20px;
    font-size: 20px;
`;