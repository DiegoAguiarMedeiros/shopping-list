import { FontAwesome } from '@expo/vector-icons';
import { Dispatch, SetStateAction, useState } from 'react';
import { GestureResponderEvent, Pressable, useColorScheme } from 'react-native';
import Button from '../../../../components/Button';
import InputText from '../../../../components/InputText';
import Colors from '../../../../constants/Colors';
import * as Styled from './styles';

import { itemInterface } from '../../../../types/types';

interface itemProps {
    itemsList: itemInterface[]
    setItems: (newItem: itemInterface) => void
    openClose: (event: GestureResponderEvent) => void,
}



export default function ModalAddItem({ itemsList, setItems, openClose }: itemProps) {
    const [newItem, setNewItem] = useState('');
    const colorScheme = useColorScheme();

    const addItem = () => {
        const item = {
            id: itemsList.length,
            item: newItem,
            active: false,
        }
        setItems(item);
    }

    return (
        <>
            <Styled.ContainerOpacity background={Colors[colorScheme ?? 'light'].background}>
            </Styled.ContainerOpacity>
            <Styled.Container background={Colors[colorScheme ?? 'light'].backgroundLighter} border={Colors[colorScheme ?? 'light'].border}>
                <Styled.ModalBody
                    border={Colors[colorScheme ?? 'light'].border}
                    background={Colors[colorScheme ?? 'light'].backgroundLighter}
                >
                    <Styled.ModalHeader border={Colors[colorScheme ?? 'light'].border}>
                        <Styled.ModalTitle text={Colors[colorScheme ?? 'light'].text}>
                            Adicionar item
                        </Styled.ModalTitle>
                    </Styled.ModalHeader>
                    <Styled.ModalBodyInner border={Colors[colorScheme ?? 'light'].border}>
                        <InputText placeholder='item...' onChangeText={(item) => { setNewItem(item); }} value={newItem} />
                    </Styled.ModalBodyInner>

                    <Styled.ContainerButtonAdd border={Colors[colorScheme ?? 'light'].border}>
                        <Styled.ContainerButtonAddInner>
                            <Button text='Cancelar' background={Colors[colorScheme ?? 'light'].cancelButtonBackground} onPress={openClose} />
                        </Styled.ContainerButtonAddInner>
                        <Styled.ContainerButtonAddInner>
                            <Button text='Adicionar' background={Colors[colorScheme ?? 'light'].buttonBackground} onPress={addItem} />
                        </Styled.ContainerButtonAddInner>
                    </Styled.ContainerButtonAdd>
                </Styled.ModalBody>
            </Styled.Container >
        </>
    );
}

