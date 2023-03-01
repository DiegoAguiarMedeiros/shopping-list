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

export const listItemIconText = styled.View`
    width: 70%;
    padding:10px;
`;

export const listItemIconOk = styled.View`
    width: 15%;
    padding:10px;
`;
export const listItemIconNotOk = styled.View`
    width: 15%;
    padding:10px;
`;

export const Text = styled.Text`
    margin-top: 20px;
    font-size: 20px;
`;

export const titleList = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text};
    margin-top: 20px;
    font-size: 20px;
`;