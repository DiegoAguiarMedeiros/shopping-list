import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View<{
    background: string,
}>`
    position:absolute;
    z-index:999;
    background:${(props: { background: any; }) => props.background};
    width: ${Dimensions.get('window').width};
    height: ${Dimensions.get('window').height};
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 15px;

    `;
export const Title = styled.Text<{
    text: string,
}>`
    color:${(props: { text: any; }) => props.text}; 
    padding: 15px;
    fontSize: 26;

    width:100%;
    `;

export const InputContainer = styled.View`
    padding: 15px;
    width:100%;
    flex-direction: row;

    `;
export const ButtonsContainer = styled.View`
    padding: 0 15px;
    width:100%;
    flex-direction: row;
    justify-content: space-between;

    `;

export const ButtonWrapper = styled.View`

    flex: 1;
`;



// export const Container = styled.View<{
//     background: string,
// }>`
//     position:absolute;
//     z-index:999;
//     background:${(props: { background: any; }) => props.background};
//     width: ${Dimensions.get('window').width};
//     height: ${Dimensions.get('window').height};
//     flex: 1;
//     justify-content: center;
//     align-items: center;
//     padding: 15px;

//     `;

// export const ModalBody = styled.View<{
//     border: string,
//     background: string,
// }>`
//     border: 1px solid ${(props: { border: any; }) => props.border};
//     background:${(props: { background: any; }) => props.background};
//     height: 100%;
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
// `;

// export const ModalHeader = styled.View<{
//     border: string,
// }>`
//     border: 1px solid ${(props: { border: any; }) => props.border};
//     width: 100%;
//     height: 20%;
//     padding:15px;
//     `;
// export const ModalBodyInner = styled.View<{
//     border: string,
// }>`
//     border: 1px solid ${(props: { border: any; }) => props.border};
//     width: 100%;
//     height: 65%;
//     padding:15px;
//     `;
// export const ModalTitle = styled.Text<{
//     text: string,
// }>`
//     color:${(props: { text: any; }) => props.text}; 
//     fontSize: 25;
//     `;

// export const Text = styled.Text<{
//     text: string,
// }>`
//     color:${(props: { text: any; }) => props.text};
//     width: 70%;
//     padding:10px;
//     `;

// export const ContainerButtonAdd = styled.View<{
//     border: string,
// }>`
//     padding:2px;
//     display: flex;
//     flex-direction: row;
//     width: 100%;
//     `;

// export const ContainerButtonAddInner = styled.View`
//     width: 50%;
// `;

// export const ContainerInputQauntity = styled.View`
//     display: flex;
//     flex-direction: row;
//     width: 100%;
// `;
// export const ContainerInputQauntityInner = styled.View`
//     width: 50%;
// `;